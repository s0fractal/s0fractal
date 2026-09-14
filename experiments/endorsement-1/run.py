#!/usr/bin/env python3
"""A fixed recomputation rule and a separate local publication recipient."""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import types

CRYPTO = 'd9c726c4940aedc7e6ec061b2b0740116009b3a577391fac56a7802cc129f263'
DOMAIN = b'endorsement-1/receipt\0'
POLICY = {'id': 'integer-sum/v1', 'max_items': 100,
          'claim': 'claimed_total equals the sum of supplied integers',
          'limits': 'No endorsement of input provenance, purpose or other claims.'}


def wire(obj):
    return json.dumps(obj, sort_keys=True, separators=(',', ':')).encode()


def digest(data):
    return hashlib.sha256(data).hexdigest()


def crypto(path):
    raw = path.read_bytes()
    if digest(raw) != CRYPTO:
        raise ValueError('crypto digest mismatch')
    mod = types.ModuleType('endorsement_crypto')
    sys.modules[mod.__name__] = mod
    exec(compile(raw, 'pinned-crypto.py', 'exec'), mod.__dict__)
    return mod


def decision(raw):
    try:
        data = json.loads(raw)
        # Requiring this encoding rejects duplicate fields, non-finite numbers,
        # trailing whitespace and alternative encodings before endorsement.
        valid = (type(data) is dict and set(data) == {'values', 'claimed_total'}
                 and wire(data) == raw and type(data['values']) is list
                 and 1 <= len(data['values']) <= POLICY['max_items']
                 and all(type(x) is int and abs(x) <= 10**12 for x in data['values'])
                 and type(data['claimed_total']) is int)
        if not valid:
            return 'REFUSE', 'INVALID_INPUT', None
        observed = sum(data['values'])
        return ('ALLOW', 'MATCH', observed) if observed == data['claimed_total'] else ('REFUSE', 'MISMATCH', observed)
    except (ValueError, TypeError, UnicodeError, OverflowError):
        return 'REFUSE', 'INVALID_INPUT', None


def issue(c, key, raw):
    state, reason, observed = decision(raw)
    body = {'artifact_sha256': digest(raw), 'policy_sha256': digest(wire(POLICY)),
            'verifier_sha256': digest(Path(__file__).read_bytes()),
            'decision': state, 'reason': reason, 'observed_total': observed}
    return {'body': body, 'signature': c.sign_hex(key, DOMAIN + wire(body))}


def consume(c, packet):
    # Trust is supplied by the operator, separately from the artifact/receipt.
    receipt, trust = packet['receipt'], packet['trust']
    raw = bytes.fromhex(packet['artifact_hex'])
    try:
        b = receipt['body']
        if not c.verify_hex(trust['issuer'], DOMAIN + wire(b), receipt['signature']):
            return 'BAD_SIGNATURE'
        if b['policy_sha256'] != trust['policy_sha256'] or b['verifier_sha256'] != trust['verifier_sha256']:
            return 'WRONG_SCOPE'
        if b['artifact_sha256'] != digest(raw):
            return 'CHANGED_ARTIFACT'
        if b['decision'] != 'ALLOW':
            return 'REFUSED'
        return 'READY_FOR_LOCAL_PUBLICATION'
    except (KeyError, TypeError, ValueError):
        return 'INVALID_RECEIPT'


def demo(path):
    c = crypto(path)
    issuer_sk, issuer_pk = c.generate_keypair()
    attacker_sk, _ = c.generate_keypair()
    trust = {'issuer': issuer_pk, 'policy_sha256': digest(wire(POLICY)),
             'verifier_sha256': digest(Path(__file__).read_bytes())}
    cases, receipts = [], []
    with tempfile.TemporaryDirectory(prefix='endorsement-1-', dir=Path.home()) as tmp:
        key = Path(tmp) / 'issuer.key'
        key.write_text(issuer_sk); key.chmod(0o600)
        def child(role, packet):
            args = [sys.executable, '-I', str(Path(__file__).resolve()), '--crypto', str(path.resolve()), '--role', role]
            if role == 'issue':
                args += ['--key', str(key)]
            run = subprocess.run(args, input=json.dumps(packet), text=True, capture_output=True, timeout=20, check=True)
            return json.loads(run.stdout)
        def check(name, raw, receipt, expected):
            actual = child('consume', {'artifact_hex': raw.hex(), 'receipt': receipt, 'trust': trust})
            cases.append({'name': name, 'expected': expected, 'observed': actual})
        good = wire({'values': [12, -4, 7], 'claimed_total': 15})
        wrong = wire({'values': [12, -4, 7], 'claimed_total': 16})
        for name, raw, expected in [('correct', good, 'READY_FOR_LOCAL_PUBLICATION'),
                                    ('wrong_total', wrong, 'REFUSED'),
                                    ('boolean_is_not_integer', wire({'values': [True], 'claimed_total': 1}), 'REFUSED'),
                                    ('extra_claim', wire({'values': [1], 'claimed_total': 1, 'ethical': True}), 'REFUSED'),
                                    ('duplicate_field', b'{"values":[1],"claimed_total":2,"claimed_total":1}', 'REFUSED')]:
            receipt = child('issue', {'artifact_hex': raw.hex()})
            receipts.append({'artifact_hex': raw.hex(), 'receipt': receipt})
            check(name, raw, receipt, expected)
        grant = receipts[0]['receipt']
        check('edited_artifact', wrong, grant, 'CHANGED_ARTIFACT')
        check('missing_receipt', good, {}, 'INVALID_RECEIPT')
        fake = {'body': grant['body'], 'signature': c.sign_hex(attacker_sk, DOMAIN + wire(grant['body']))}
        check('self_signed_claim', good, fake, 'BAD_SIGNATURE')
        body = {**receipts[1]['receipt']['body'], 'decision': 'ALLOW'}
        check('edited_refusal', wrong, {'body': body, 'signature': receipts[1]['receipt']['signature']}, 'BAD_SIGNATURE')
        for field in ('policy_sha256', 'verifier_sha256'):
            body = {**grant['body'], field: '0' * 64}
            check('different_' + field, good, {'body': body, 'signature': c.sign_hex(issuer_sk, DOMAIN + wire(body))}, 'WRONG_SCOPE')
    return {'all_expected': all(x['expected'] == x['observed'] for x in cases),
            'cases': cases, 'policy': POLICY, 'trust': trust, 'signed_observations': receipts,
            'source_commit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip(),
            'crypto_sha256': CRYPTO,
            'limits': 'Operator-controlled local simulation; no external user, sandbox or persistent signing key. No public publication.'}


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('--crypto', type=Path, required=True)
    p.add_argument('--role', choices=['issue', 'consume'])
    p.add_argument('--key', type=Path)
    p.add_argument('--out', type=Path)
    args = p.parse_args()
    if args.role:
        packet = json.load(sys.stdin)
        c = crypto(args.crypto)
        result = issue(c, args.key.read_text(), bytes.fromhex(packet['artifact_hex'])) if args.role == 'issue' else consume(c, packet)
        print(json.dumps(result)); return
    if args.out is None or args.out.exists():
        p.error('provide a new --out path')
    result = demo(args.crypto)
    with args.out.open('x') as f:
        json.dump(result, f, indent=2); f.write('\n')
    print(json.dumps({'all_expected': result['all_expected'], 'cases': len(result['cases'])}))
    if not result['all_expected']:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
