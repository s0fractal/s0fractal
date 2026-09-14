# PARTICIPATION-1 — controlled participation, local mechanism probe

This is a synthetic offline demonstration, not a model experiment, preregistered
scientific comparison, production signer, legal license or adoption of either draft.
The owner authorized draft revision and the experiment. No model/API calls, real
identities, sanctions, funds, deletion controls or external operations are involved.

## Question and fixed expectations

Can a recipient reject an attempted endorsement when the caller bypasses its
local guard but lacks the separately pinned issuer's signature? The resource is
acceptance of an endorsement by this recipient, not the ability to run copied code.

Before running, the following outcomes are specified in `run.py`:

- The allowed key and operation get an accepted endorsement. An unknown key or
  different operation is refused. Caller signatures authenticate keys, not people.
- Forged or edited requests are refused; a spoofed actor is not authenticated.
- A permit cannot move to different artifact bytes, request/operation or policy.
- Repeated use is rejected while this recipient retains its in-memory used set.
- Editing a refusal, omitting a permit or signing it with the caller's key fails.
- Ledger edits fail; truncation fails against an independently held expected tip.
- **Expected boundary successes:** without a pinned tip a truncated prefix still
  verifies; losing replay state permits replay; a compromised issuer key can forge
  acceptance; replacing the recipient bypasses its checks altogether.

The final two boundary cases are explicit assumption controls, not discovered
exploits or evidence of resistance. `all_expected: true` includes those successes.
No omitted premise is converted into an ethical guarantee.

## Run

Python 3.11+, Git, and the reviewed `crypto.py` from Black-Heart are required.
The script checks its exact SHA-256 before loading its bytes:
`d9c726c4940aedc7e6ec061b2b0740116009b3a577391fac56a7802cc129f263`.
The file is available at Black-Heart commit
`22b47532776d8956ecec3c69e5e55189775baa64`; no runtime import search or download
is performed. Review this source dependency as executable code.

From this repository's root, with a sibling Black-Heart checkout:

```sh
python3 -B experiments/participation-1/run.py \
  --crypto ../black-heart/crypto.py --out /tmp/participation-1-result.json
```

Choose a new output path; an existing output is refused. The result records
source commit, source digests, Python version, public keys, signed observed
requests/decisions and each expected/observed outcome. Fresh random secret keys
are never written into the report. They are discarded with process exit, not
claimed to be securely erased from memory. Re-runs differ in keys and signatures.
`source_sha256` pins this plan and code, not the later results commentary.

## Trust and coverage

Signer, caller and recipient are separate functions in **one Python process**.
This models a signer unavailable to the caller; it does not implement OS/process,
hardware or remote isolation. A debugger or administrator can take the issuer key.
The recipient pins issuer identity and policy independently of the request, but
trusts the issuer's decision; it does not independently derive the policy outcome.

The hand-written demo policy allows one ephemeral key to request `endorse`.
It is linked to the draft's bytes but does not learn a Decision Profile, infer
values, interpret intent, or prove rights. Requests observed by the simulated
signer enter a signed hash chain. Bypass attempts seen only by the recipient are
case observations, not falsely attributed signer-ledger events.

Replay protection is in memory. There is no durable atomic consume, expiration,
revocation service, concurrency control, crash recovery, external checkpoint
service, hostile JSON parser or general-purpose API. Existing Black-Heart/Warrant
contracts are not changed or integrated; only Black-Heart's crypto functions are
reused. The report is not a new experience schema or canonical ledger service.

The mechanism can prevent acceptance in the declared channel. It cannot prevent
out-of-band use, identify the human behind a fresh key, or detect a concealed
purpose. A future deployment needs an independently protected resource; another
layer of self-hashing inside caller-controlled code will not provide one.
