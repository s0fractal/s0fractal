# PARTICIPATION-2 — result and interpretation

The [retained run](result.json) from source commit
`d9928bfab5c1ea99b4d7e9744b923f5a079663d1` matched all **18 fixed expected
outcomes** on macOS 26.6.2, arm64, Python 3.14.7. The checkout was clean before
recording. These are engineering controls, not independent trials or a security
success rate. Source and plan digests match the named commit.

## What happened

- A permitted endorsement was accepted. A forbidden operation received a signed
  refusal, which the separate recipient rejected.
- A fake ALLOW signed with the caller's key was rejected by the recipient. Changed
  artifact bytes and moving a grant to another request were rejected separately.
- The sandbox denied direct, symlink, child-process and hardlink attempts to read
  the signing key. Attempts to overwrite the key, policy, recipient trust and
  trusted role program were denied. Protected file bytes remained unchanged.
- An unsandboxed process with the same UID could read the key. The supervisor then
  used that key to forge an ALLOW for the forbidden operation. The unchanged
  recipient **accepted** it. Both are expected boundary controls included in 18/18.

The caller, signer and recipient operations ran in separate processes. The fake
permit was constructed by the supervisor using the caller-owned key and submitted
to the recipient; this was a fixed injected control, not an autonomous hostile
agent discovering an attack. The supervisor also constructed the key-theft control.
Only two requests reached the signer, and only those two signed decisions were
retained as signer observations. Recipient-only attempts are not signer events.

## Readback checks

After the run, the two issuer signatures and two nested requester signatures were
verified with OpenSSL, independently of the Black-Heart verification function.
Appending bytes to each of their four messages made verification fail. This checks
signature interoperability and message binding; it does not independently attest
the filesystem observations. The report retains outcomes and process IDs, not full
raw subprocess transcripts. These readback checks are operator-reported here.

## Consequence for the executable-license draft

The measured mechanism is refusal of an endorsement by a controlled signing
resource, with enforcement at a recipient that pins its issuer key. Removing a
caller's guard does not supply that key. Possession of the key defeats this boundary,
as the positive compromise control demonstrates.

The probe does not prevent copying or running the artifact, identify a human,
classify intentions, enforce legal terms, or prove a novel licensing mechanism.
It does not establish an immutable ledger. All roles share one UID; trusted launch
and the tested sandbox file rules provide the measured restriction. Host compromise,
process-memory attacks and other untested escape paths remain outside the result.
Replay consumption and durable transactional state are absent from this probe.

This closes the separate-process/file-access question at the stated scope. Further
machinery should wait for a concrete recipient and resource to protect. A deployment
would need its own boundary review; this local probe is not a deployable service.
Neither the original probe nor the concept drafts or Black-Heart core were changed.
