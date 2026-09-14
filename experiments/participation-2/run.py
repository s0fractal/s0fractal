#!/usr/bin/env python3
"""macOS filesystem-boundary probe: supervised, separate processes; no service."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import platform
import subprocess
import sys
import tempfile
import types

ROOT = Path(__file__).resolve().parents[2]
CRYPTO_HASH = 'd9c726c4940aedc7e6ec061b2b0740116009b3a577391fac56a7802cc129f263'
REQUEST = b'participation-2/request\0'
DECISION = b'participation-2/decision\0'


def canonical(x):
    return json.dumps(x, sort_keys=True, separators=(',', ':')).encode()


def sha(x):
    return hashlib.sha256(x).hexdigest()


def crypto(path):
    raw = path.read_bytes()
    if sha(raw) != CRYPTO_HASH:
        raise ValueError('unreviewed crypto')
    module = types.ModuleType('probe_crypto'); sys.modules[module.__name__] = module
    exec(compile(raw, 'pinned-crypto.py', 'exec'), module.__dict__)
    return module


def role(name, root):
    # Signer and recipient are launched outside the caller's sandbox by the supervisor.
    c = crypto(root / 'crypto.py')
    packet = json.load(sys.stdin)
    if name == 'caller':
        key = (root / 'caller.key').read_text()
        result = {'body': packet, 'signature': c.sign_hex(key, REQUEST + canonical(packet))}
    elif name == 'signer':
        policy = json.loads((root / 'policy.json').read_text())
        body = packet['body']
        auth = c.verify_hex(body['actor'], REQUEST + canonical(body), packet['signature'])
        if not auth:
            reason = 'BAD_REQUEST_SIGNATURE'
        elif body['policy_sha256'] != sha(canonical(policy)):
            reason = 'POLICY_MISMATCH'
        elif body['actor'] not in policy['allowed_keys']:
            reason = 'KEY_NOT_ALLOWED'
        elif body['operation'] not in policy['operations']:
            reason = 'OPERATION_NOT_ALLOWED'
        else:
            reason = 'POLICY_MATCH'
        decision = {'request': packet, 'decision': 'ALLOW' if reason == 'POLICY_MATCH' else 'REFUSE',
                    'reason': reason, 'authenticated_actor': body['actor'] if auth else None,
                    'policy_sha256': sha(canonical(policy))}
        key = (root / 'issuer.key').read_text()
        result = {'body': decision, 'signature': c.sign_hex(key, DECISION + canonical(decision))}
        with (root / 'observed.jsonl').open('a') as f:
            f.write(json.dumps(result) + '\n')
    else:
        trust = json.loads((root / 'recipient.json').read_text())
        receipt = packet['receipt']; expected = packet['expected_request']
        if not c.verify_hex(trust['issuer'], DECISION + canonical(receipt['body']), receipt['signature']):
            status = 'BAD_ISSUER_SIGNATURE'
        elif receipt['body']['request'] != expected:
            status = 'REQUEST_MISMATCH'
        elif receipt['body']['policy_sha256'] != trust['policy_sha256']:
            status = 'POLICY_MISMATCH'
        elif receipt['body']['decision'] != 'ALLOW':
            status = 'REFUSED'
        elif expected['body']['artifact_sha256'] != sha(bytes.fromhex(packet['artifact_hex'])):
            status = 'ARTIFACT_MISMATCH'
        else:
            status = 'ACCEPT'
        result = {'status': status}
    print(json.dumps({'pid': os.getpid(), 'uid': os.getuid(), 'value': result}))


READ_PROBE = '''import pathlib,sys,json,os
try:
 data=pathlib.Path(sys.argv[1]).read_bytes()
 print(json.dumps({'status':'READABLE','pid':os.getpid(),'uid':os.getuid()}))
except PermissionError as e:
 print(json.dumps({'status':'DENIED','errno':e.errno,'pid':os.getpid(),'uid':os.getuid()}))
'''


def run(path):
    if sys.platform != 'darwin':
        raise RuntimeError('this probe requires macOS sandbox-exec')
    c = crypto(path)
    source = Path(__file__).read_bytes()
    cases, operations = [], []
    with tempfile.TemporaryDirectory(prefix='participation-2-', dir=Path.home()) as directory:
        root = Path(directory).resolve(); private = root / 'private'; caller = root / 'caller'
        private.mkdir(mode=0o700); caller.mkdir()
        for directory_path in (private, caller):
            (directory_path / 'role.py').write_bytes(source)
            (directory_path / 'crypto.py').write_bytes(path.read_bytes())
        issuer_sk, issuer_pk = c.generate_keypair(); caller_sk, caller_pk = c.generate_keypair()
        (private / 'issuer.key').write_text(issuer_sk); (private / 'issuer.key').chmod(0o600)
        (caller / 'caller.key').write_text(caller_sk)
        policy = {'operations': ['endorse'], 'allowed_keys': [caller_pk], 'version': 'participation-2/demo'}
        policy_hash = sha(canonical(policy))
        (private / 'policy.json').write_bytes(canonical(policy))
        trust = {'issuer': issuer_pk, 'policy_sha256': policy_hash}
        (private / 'recipient.json').write_bytes(canonical(trust))
        protected = {p.name: sha(p.read_bytes()) for p in private.iterdir()}
        profile = ('(version 1)(allow default)(deny file-write*)'
                   '(allow file-write* (subpath ' + json.dumps(str(caller)) + '))'
                   '(deny file-read* (subpath ' + json.dumps(str(private)) + '))(deny network*)')
        prefix = ['/usr/bin/sandbox-exec', '-p', profile]
        environment = {'PATH': '/usr/bin:/bin', 'HOME': str(caller), 'LC_ALL': 'C',
                       'PYTHONDONTWRITEBYTECODE': '1'}

        def execute(argv, data=None, sandbox=False):
            proc = subprocess.run((prefix if sandbox else []) + argv, input=json.dumps(data) if data is not None else None,
                                  capture_output=True, text=True, cwd=caller, env=environment,
                                  close_fds=True, timeout=20)
            if proc.returncode:
                raise RuntimeError(f'child exited {proc.returncode}: {proc.stderr}')
            observed = json.loads(proc.stdout)
            operations.append(observed)
            return observed

        def call(name, data):
            location = caller if name == 'caller' else private
            return execute([sys.executable, '-I', str(location / 'role.py'), '--role', name,
                            '--root', str(location)], data, name == 'caller')['value']

        def case(name, observed, expected):
            cases.append({'name': name, 'observed': observed, 'expected': expected, 'matches': observed == expected})

        artifact = b'An artifact submitted to a separately pinned recipient.\n'
        body = {'actor': caller_pk, 'operation': 'endorse', 'nonce': 'one',
                'artifact_sha256': sha(artifact), 'policy_sha256': policy_hash}
        good = call('caller', body); grant = call('signer', good)
        def receive(receipt, req, data=artifact):
            return call('recipient', {'receipt': receipt, 'expected_request': req, 'artifact_hex': data.hex()})['status']
        case('allowed_endorsement', receive(grant, good), 'ACCEPT')
        forbidden = call('caller', {**body, 'operation': 'publish', 'nonce': 'two'})
        refusal = call('signer', forbidden)
        case('forbidden_operation_at_signer', refusal['body']['reason'], 'OPERATION_NOT_ALLOWED')
        case('refusal_at_recipient', receive(refusal, forbidden), 'REFUSED')
        fake_body = {**refusal['body'], 'decision': 'ALLOW'}
        fake = {'body': fake_body, 'signature': c.sign_hex(caller_sk, DECISION + canonical(fake_body))}
        case('local_guard_bypass_forged_permit', receive(fake, forbidden), 'BAD_ISSUER_SIGNATURE')
        case('changed_artifact', receive(grant, good, artifact + b'changed'), 'ARTIFACT_MISMATCH')
        case('grant_moved_to_other_request', receive(grant, forbidden), 'REQUEST_MISMATCH')
        key_path = private / 'issuer.key'
        read = [sys.executable, '-I', '-c', READ_PROBE, str(key_path)]
        case('same_uid_without_sandbox', execute(read)['status'], 'READABLE')
        case('sandbox_direct_key_read', execute(read, sandbox=True)['status'], 'DENIED')
        link = caller / 'key-link'; link.symlink_to(key_path)
        case('sandbox_symlink_key_read', execute(read[:-1] + [str(link)], sandbox=True)['status'], 'DENIED')
        child_code = 'import subprocess,sys; r=subprocess.run(sys.argv[1:],capture_output=True,text=True); print(r.stdout,end=""); sys.exit(r.returncode)'
        case('sandbox_inherited_by_child', execute([sys.executable, '-I', '-c', child_code, *read], sandbox=True)['status'], 'DENIED')
        write_code = '''import pathlib,sys,json
try: pathlib.Path(sys.argv[1]).write_text('replaced'); status='WRITTEN'
except PermissionError: status='DENIED'
print(json.dumps({'status':status}))'''
        for name in ('issuer.key', 'policy.json', 'recipient.json', 'role.py'):
            case('sandbox_overwrite_' + name, execute([sys.executable, '-I', '-c', write_code, str(private / name)], sandbox=True)['status'], 'DENIED')
        hardlink_code = '''import os,sys,pathlib,json
try:
 os.link(sys.argv[1],sys.argv[2]); pathlib.Path(sys.argv[2]).read_bytes(); status='READABLE'
except PermissionError: status='DENIED'
print(json.dumps({'status':status}))'''
        case('sandbox_hardlink_key_read', execute([sys.executable, '-I', '-c', hardlink_code, str(key_path), str(caller / 'hardlink')], sandbox=True)['status'], 'DENIED')
        case('protected_bytes_unchanged', {p: sha((private / p).read_bytes()) for p in protected} == protected, True)
        # The unsandboxed supervisor has the same UID: this is an explicit scope limit.
        stolen = key_path.read_text()
        forged = {'body': fake_body, 'signature': c.sign_hex(stolen, DECISION + canonical(fake_body))}
        case('BOUNDARY_unsandboxed_key_theft', receive(forged, forbidden), 'ACCEPT')
        pids = [x['pid'] for x in operations if 'pid' in x]
        case('role_processes_differ_from_supervisor', all(p != os.getpid() for p in pids), True)
        ledger = [json.loads(line) for line in (private / 'observed.jsonl').read_text().splitlines()]
        return {'all_expected': all(x['matches'] for x in cases), 'cases': cases,
                'scope': 'selected macOS filesystem paths and a pinned recipient; not host-admin isolation',
                'runtime': {'python': platform.python_version(), 'system': platform.platform(),
                            'uid': os.getuid(), 'supervisor_pid': os.getpid(), 'child_pids': pids},
                'sandbox_profile': profile.replace(str(root), '<fixture>'),
                'issuer_public_key': issuer_pk, 'policy': policy, 'signed_decisions': ledger,
                'private_keys_retained': False, 'source_commit': subprocess.check_output(['git','-C',str(ROOT),'rev-parse','HEAD']).decode().strip(),
                'checkout_before_recording': subprocess.check_output(['git','-C',str(ROOT),'status','--porcelain']).decode(),
                'source_sha256': {p: sha((ROOT / p).read_bytes()) for p in
                    ['experiments/participation-2/run.py', 'experiments/participation-2/README.md']},
                'crypto_sha256': CRYPTO_HASH}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--role', choices=['caller', 'signer', 'recipient'])
    parser.add_argument('--root', type=Path)
    parser.add_argument('--crypto', type=Path)
    parser.add_argument('--out', type=Path)
    args = parser.parse_args()
    if args.role:
        role(args.role, args.root)
        return 0
    if args.out is None or args.crypto is None or args.out.exists():
        parser.error('provide --crypto and a new --out path')
    report = run(args.crypto)
    with args.out.open('x') as f:
        json.dump(report, f, indent=2); f.write('\n')
    print(json.dumps({'all_expected': report['all_expected'], 'cases': len(report['cases'])}))
    return 0 if report['all_expected'] else 1


if __name__ == '__main__':
    sys.exit(main())
