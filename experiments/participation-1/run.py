#!/usr/bin/env python3
"""Offline role simulation, not a network service or a security boundary.
Uses pinned Black-Heart crypto; fresh ephemeral keys never leave process memory.
"""
import argparse
from copy import deepcopy
import hashlib
import json
from pathlib import Path
import platform
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
CRYPTO_SHA256 = 'd9c726c4940aedc7e6ec061b2b0740116009b3a577391fac56a7802cc129f263'
REQ_DOMAIN = b'participation-1/request\0'
DEC_DOMAIN = b'participation-1/decision\0'
ZERO = '0' * 64


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':'), ensure_ascii=True).encode()


def digest(data):
    return hashlib.sha256(data).hexdigest()


def run(crypto_path):
    raw = crypto_path.read_bytes()
    if digest(raw) != CRYPTO_SHA256:
        raise ValueError('unreviewed crypto bytes')
    # Execute the already checked bytes, not a second filesystem read.
    import types
    c = types.ModuleType('participation_crypto')
    sys.modules[c.__name__] = c
    exec(compile(raw, 'pinned-black-heart-crypto.py', 'exec'), c.__dict__)
    issuer_sk, issuer_pk = c.generate_keypair()
    alice_sk, alice_pk = c.generate_keypair()
    outsider_sk, outsider_pk = c.generate_keypair()
    policy = {'version': 'participation-1/demo', 'allowed_keys': [alice_pk],
              'allowed_operations': ['endorse'],
              'profile_sha256': digest((ROOT / 'drafts/DECISION-PROFILE.md').read_bytes())}
    policy_hash = digest(canonical(policy))
    artifact = b'An explicitly synthetic demonstration artifact.\n'
    ledger, cases = [], []

    def sign(key, domain, body):
        return {'body': deepcopy(body), 'signature': c.sign_hex(key, domain + canonical(body))}

    def valid(key, domain, envelope):
        try:
            return c.verify_hex(key, domain + canonical(envelope['body']), envelope['signature'])
        except (KeyError, ValueError, TypeError):
            return False

    def request(sk, pk, nonce, operation='endorse'):
        body = {'actor': pk, 'nonce': nonce, 'operation': operation,
                'artifact_sha256': digest(artifact), 'policy_sha256': policy_hash}
        return sign(sk, REQ_DOMAIN, body)

    def decide(req):
        body = req['body']
        authenticated = valid(body['actor'], REQ_DOMAIN, req)
        if not authenticated:
            reason = 'BAD_REQUEST_SIGNATURE'
        elif body['policy_sha256'] != policy_hash:
            reason = 'POLICY_MISMATCH'
        elif body['actor'] not in policy['allowed_keys']:
            reason = 'KEY_NOT_ALLOWED'
        elif body['operation'] not in policy['allowed_operations']:
            reason = 'OPERATION_NOT_ALLOWED'
        else:
            reason = 'POLICY_MATCH'
        receipt = sign(issuer_sk, DEC_DOMAIN, {
            'request': deepcopy(req), 'policy_sha256': policy_hash,
            'authenticated_actor': body['actor'] if authenticated else None,
            'decision': 'ALLOW' if reason == 'POLICY_MATCH' else 'REFUSE', 'reason': reason,
            'previous': digest(canonical(ledger[-1])) if ledger else ZERO,
            'sequence': len(ledger)})
        ledger.append(receipt)
        return receipt

    def accept(receipt, expected_request, data, expected_policy, used):
        # issuer_pk is pinned here, never selected from caller-supplied receipt data.
        if receipt is None:
            return 'MISSING_AUTHORIZATION'
        if not valid(issuer_pk, DEC_DOMAIN, receipt):
            return 'BAD_ISSUER_SIGNATURE'
        body = receipt['body']
        if body['request'] != expected_request:
            return 'REQUEST_MISMATCH'
        req = expected_request['body']
        if not valid(req['actor'], REQ_DOMAIN, expected_request):
            return 'BAD_REQUEST_SIGNATURE'
        if body['policy_sha256'] != expected_policy or req['policy_sha256'] != expected_policy:
            return 'POLICY_MISMATCH'
        if body['decision'] != 'ALLOW':
            return 'REFUSED'
        if req['artifact_sha256'] != digest(data):
            return 'ARTIFACT_MISMATCH'
        identifier = (req['actor'], req['nonce'])
        if identifier in used:
            return 'REPLAY'
        used.add(identifier)
        return 'ACCEPT'

    def chain_valid(chain, expected_tip=None):
        previous = ZERO
        for i, receipt in enumerate(chain):
            if not valid(issuer_pk, DEC_DOMAIN, receipt):
                return False
            if receipt['body']['sequence'] != i or receipt['body']['previous'] != previous:
                return False
            previous = digest(canonical(receipt))
        return expected_tip is None or previous == expected_tip

    def case(name, observed, expected):
        cases.append({'name': name, 'observed': observed, 'expected': expected,
                      'matches': observed == expected})

    good = request(alice_sk, alice_pk, 'request-1')
    allowed = decide(good)
    used = set()
    case('allowed_request', accept(allowed, good, artifact, policy_hash, used), 'ACCEPT')
    case('same_request_again', accept(allowed, good, artifact, policy_hash, used), 'REPLAY')
    denied_req = request(outsider_sk, outsider_pk, 'request-2')
    denied = decide(denied_req)
    case('unknown_key', denied['body']['reason'], 'KEY_NOT_ALLOWED')
    case('refusal_is_not_authorization', accept(denied, denied_req, artifact, policy_hash, set()), 'REFUSED')
    forbidden = request(alice_sk, alice_pk, 'request-3', 'publish')
    case('forbidden_operation', decide(forbidden)['body']['reason'], 'OPERATION_NOT_ALLOWED')
    forged_request = request(outsider_sk, alice_pk, 'request-4')
    bad = decide(forged_request)
    case('spoofed_requester', bad['body']['reason'], 'BAD_REQUEST_SIGNATURE')
    case('spoof_is_not_attributed', bad['body']['authenticated_actor'], None)
    edited_req = deepcopy(good); edited_req['body']['operation'] = 'publish'
    case('changed_signed_request', decide(edited_req)['body']['reason'], 'BAD_REQUEST_SIGNATURE')
    stale_req = deepcopy(good); stale_req['body']['policy_sha256'] = ZERO
    stale_req = sign(alice_sk, REQ_DOMAIN, stale_req['body'])
    case('request_for_old_policy', decide(stale_req)['body']['reason'], 'POLICY_MISMATCH')
    case('changed_artifact', accept(allowed, good, artifact + b'changed', policy_hash, set()), 'ARTIFACT_MISMATCH')
    case('different_requested_operation', accept(allowed, forbidden, artifact, policy_hash, set()), 'REQUEST_MISMATCH')
    case('policy_changed_at_receiver', accept(allowed, good, artifact, ZERO, set()), 'POLICY_MISMATCH')
    edited_receipt = deepcopy(denied); edited_receipt['body']['decision'] = 'ALLOW'
    case('edit_refusal_into_allow', accept(edited_receipt, denied_req, artifact, policy_hash, set()), 'BAD_ISSUER_SIGNATURE')
    # Caller deletes its local guard and directly presents the artifact / a forged permit.
    case('bypass_without_permit', accept(None, denied_req, artifact, policy_hash, set()), 'MISSING_AUTHORIZATION')
    fake_body = deepcopy(denied['body']); fake_body['decision'] = 'ALLOW'
    fake = sign(outsider_sk, DEC_DOMAIN, fake_body)
    case('bypass_with_callers_signature', accept(fake, denied_req, artifact, policy_hash, set()), 'BAD_ISSUER_SIGNATURE')
    tip = digest(canonical(ledger[-1]))
    case('ledger_intact', chain_valid(ledger, tip), True)
    edited_ledger = deepcopy(ledger); edited_ledger[0]['body']['reason'] = 'changed'
    case('ledger_edit', chain_valid(edited_ledger, tip), False)
    case('ledger_tail_removed_with_checkpoint', chain_valid(ledger[:-1], tip), False)
    # Boundary controls deliberately succeed. They are not claimed protections.
    case('BOUNDARY_tail_removed_without_checkpoint', chain_valid(ledger[:-1]), True)
    case('BOUNDARY_replay_after_state_loss', accept(allowed, good, artifact, policy_hash, set()), 'ACCEPT')
    stolen_key_permit = sign(issuer_sk, DEC_DOMAIN, fake_body)
    case('BOUNDARY_issuer_key_compromised', accept(stolen_key_permit, denied_req, artifact, policy_hash, set()), 'ACCEPT')
    case('BOUNDARY_receiver_replaced', (lambda *_: 'ACCEPT')(None, artifact), 'ACCEPT')
    return {'scope': 'synthetic single-process role simulation, no model calls',
            'issuer_public_key': issuer_pk, 'policy': policy, 'artifact_sha256': digest(artifact),
            'cases': cases, 'all_expected': all(x['matches'] for x in cases),
            'observed_ledger': ledger, 'external_checkpoint_for_this_run': tip,
            'private_keys_retained': False, 'python': platform.python_version(),
            'crypto_sha256': digest(raw),
            'source_sha256': {p: digest((ROOT / p).read_bytes()) for p in
                ['drafts/DECISION-PROFILE.md', 'drafts/EXECUTABLE-LICENSE.md',
                 'experiments/participation-1/run.py', 'experiments/participation-1/README.md']},
            'source_commit': subprocess.check_output(['git', '-C', str(ROOT), 'rev-parse', 'HEAD']).decode().strip(),
            'checkout_before_recording': subprocess.check_output(['git', '-C', str(ROOT), 'status', '--porcelain']).decode()}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--crypto', type=Path, required=True)
    parser.add_argument('--out', type=Path, required=True)
    args = parser.parse_args()
    if args.out.exists():
        parser.error('--out must not exist')
    result = run(args.crypto)
    with args.out.open('x') as f:
        json.dump(result, f, indent=2); f.write('\n')
    print(json.dumps({'all_expected': result['all_expected'], 'cases': len(result['cases']),
                      'ledger_entries': len(result['observed_ledger'])}))
    return 0 if result['all_expected'] else 1


if __name__ == '__main__':
    sys.exit(main())
