# PARTICIPATION-2 — separate processes and a measured filesystem boundary

A local macOS mechanism probe extending [PARTICIPATION-1](../participation-1/README.md).
No model sessions, network service, real user identities or legal licensing changes.
A setup canary was readable without sandbox-exec and denied with it before this
probe was written. This is engineering development, not a preregistered study.

## Question

Does a caller that bypasses its own guard obtain an endorsement accepted by an
unchanged recipient, when signer files and recipient trust inputs are outside
that caller's measured filesystem access?

A supervisor makes fresh temporary issuer/caller keys. Caller, signer and recipient
run in separate Python processes through stdin/stdout. The caller's sandbox denies
reads of the private fixture, all writes except its own workspace, and networking.
Children inherit the policy. No signing secret is sent through request arguments,
responses or the report. Private fixture files are removed at the end; this does
not claim secure disk/memory erasure. The supervisor can read every key.

The signer permits one ephemeral key to request `endorse`; `publish` is refused.
The recipient pins the issuer key and policy digest in a protected file. It trusts
the issuer's signed decision, binds the expected request and artifact bytes, and
does not independently re-evaluate the issuer's policy. This is a synthetic
participation rule, not a learned Decision Profile or an intent classifier.

## Fixed controls

Expected: allowed endorsement accepted; forbidden operation refused by signer and
recipient; caller-signed fake permit rejected; changed artifact and request rejected.
The key must be readable by an unsandboxed process of the same UID (positive control),
but denied through the sandbox directly, via symlink, via child process and via
hardlink. Overwrites of the key, policy, recipient trust and trusted role program
must be denied, with protected bytes unchanged afterwards. Role processes must
have different PIDs from the supervisor.

**Expected boundary success:** the unsandboxed supervisor reads the key and forges
an ALLOW for the refused operation; the unchanged recipient accepts it. This is
not resistance to a host administrator or unsandboxed caller. `all_expected` includes
this success. The sandbox must be applied by a trusted launcher, not voluntarily
by an adversary. The role commands alone do not establish that launch boundary.

## Run

Requires macOS `/usr/bin/sandbox-exec`, Git, Python 3.11+ and the same pinned
Black-Heart `crypto.py` used in PARTICIPATION-1:
`d9c726c4940aedc7e6ec061b2b0740116009b3a577391fac56a7802cc129f263`.
It is available at Black-Heart commit `22b47532776d8956ecec3c69e5e55189775baa64`.
No automatic download or dependency installation occurs.

```sh
python3 -B experiments/participation-2/run.py \
  --crypto ../black-heart/crypto.py --out /tmp/participation-2-result.json
```

Use a new output path. Fresh keys and PIDs make bytes differ across runs; compare
named outcomes. The source/plan are committed before the run, with no separate
external review or claim of pre-registration. The report names their digests and
source commit. Only the two requests that reach the signer enter its observations;
recipient-only bypasses are not invented signer events.

## Limits

This tests selected paths under one macOS configuration. It is not an exhaustive
sandbox escape audit. Process memory/debugging, Mach ports, inherited hostile file
descriptors, race attacks, filesystem aliasing beyond these probes and denial of
service are not covered. `close_fds=True` is used by the supervisor. The interpreter,
OS, launcher, copied trusted code and their dependencies remain trusted.

All roles have the same UID. File modes alone do not protect the key from that user;
the positive control demonstrates it. A real deployment needs a protected service,
separate OS identity or hardware-backed resource and an appropriate threat model.

Unlike PARTICIPATION-1's in-memory replay demonstration, this probe has no nonce
consumption at all. Expiry, replay, atomic persistence, concurrent signing, revocation,
crash recovery and key rotation remain unimplemented. The signed observations are
not a durable immutable ledger. No changes are made to the first probe, either
concept draft, or Black-Heart's code and license.
