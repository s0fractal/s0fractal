# PARTICIPATION-1 — observed result

Source: `f59bf02e58fad0fe7c6e4303fb196115b64e3f18`, clean checkout before recording.
The fixed cases, code and two rewritten drafts were committed before this local
run. There was no separate reviewer or remote preregistration before execution.
This is a mechanism demonstration, not an independent effectiveness experiment.

[The retained result](result.json) has **22/22 expected outcomes**, including four
explicit successes outside the claimed boundary. Six requests reached the signer
and are retained as signed decisions. Bypass attempts at the recipient did not
become fictitious requests in the signer's ledger.

- A permitted request was accepted. Unknown key, wrong operation and invalid
  caller signature were refused; a spoofed key was not authenticated.
- Changed artifact, request or policy and repeated use within retained state
  were rejected. Editing a refusal and signing a permit with the caller key failed.
- Ledger mutation failed. Truncation failed with the expected checkpoint.
- **Limits demonstrated:** truncation without a checkpoint passed; replay after
  loss of recipient state passed; use of the issuer's secret key bypassed its
  policy; replacing the recipient removed enforcement entirely.

The script deliberately uses a trusted issuer role and recipient in the same
process. It has **not** implemented a protected signer, learned Decision Profile,
legal license, persistent service or defense against its host administrator.
The useful finding is that deleting the caller's guard does not by itself supply
an authorization accepted by the unchanged recipient under its pinned key.

## Checks of the probe itself

After the baseline run, an in-memory mutation disabled only issuer-signature
verification in the recipient. Two controls then unexpectedly accepted:
`edit_refusal_into_allow` and `bypass_with_callers_signature`. Thus those controls
respond to removing the relevant check; they do not merely restate expectations.
The first preparation attempt stopped on an assertion because the source contains
two matching guards (recipient and ledger), not one. No mutant ran in that attempt;
the corrected mutation replaces the first occurrence only. Original source and
baseline result were not edited.

OpenSSL 3.6.4 independently verified all six retained issuer signatures and rejected
an altered signed message. This is a second implementation checking those concrete
signatures, not an independent review of the design or all cryptography.
[Review observations](review.json) record the mutation digest and outcomes.

## Repetition and next boundary

Use the [fixed instructions](README.md) at the source commit for repetition.
Keys and signatures change each time; compare named outcomes, not entire output
bytes. Source digests in the retained report bind the committed inputs. The review
and this commentary were written afterwards and are not pre-run inputs.

A next implementation would need a genuinely separate protected signing resource,
durable replay state, revocation and recovery rules, and a bounded caller interface.
It should preserve the same counterexamples. More self-hashing of caller-controlled
code would not strengthen the demonstrated boundary. No such deployment is made here.
