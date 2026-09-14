# ENDORSEMENT-1 — refusing a specific endorsement

A small local consumer demonstration: the signing process recomputes a submitted
integer sum. A separate receiving process marks the report ready for local
publication only when the receipt matches the artifact, pinned issuer, policy and
verifier code. Nothing is published to a network or external application.

The resource is the issuer's signature. This does not restrict copying or running
the artifact. The recipient trusts the issuer's computation; signature verification
does not independently repeat the sum. No independent external user has adopted
this receipt. Demand and practical advantage over recomputing the sum remain open.

## Exact promise

`integer-sum/v1`: 1–100 integers, each within ±10^12, whose sum equals
`claimed_total`. Booleans are not integers. Input is canonical JSON with exactly
`values` and `claimed_total`; extra fields and duplicate fields are refused. The
rule attests supplied data only, not their provenance, ethics or intended use.
The policy digest and exact verifier source digest bind the scope of the receipt.

Expected controls, fixed before running: correct report accepted; wrong sum,
boolean and extra claim refused; duplicate field refused; edited artifact, missing
receipt, self-signed permit and edited refusal rejected; genuine signatures for a
different policy or verifier rejected. These are 11 deterministic controls, not
independent trials. Signed refusals preserve the observed total where computable.

## Run

From the profile repository root, using the pinned Black-Heart crypto module
specified in [PARTICIPATION-2](../participation-2/README.md):

```sh
python3 -B experiments/endorsement-1/run.py \
  --crypto ../black-heart/crypto.py --out /tmp/endorsement-1-result.json
```

Use a new output path. The source/plan are committed before the first run; there
is no external review or scientific preregistration. Fresh keys are generated
locally and discarded; receipts are not a stable public identity. The demo sends
requests to separate `issue` and `consume` subprocesses through stdin. Retained
observations contain the synthetic input bytes, receipts and named outcomes.

The operator supplies recipient trust separately from receipts. No sandbox is
applied here: the file-access question is separately measured in PARTICIPATION-2.
All processes and keys remain under the operator's authority. This is not a
hardened signer, hostile-input server or durable append-only ledger. Malformed
CLI input can fail the process; size/CPU limits for a public service are absent.
A receipt is a reusable statement about bytes, not a single-use permission;
expiry, revocation and identity enrollment are absent. The small policy is
handwritten, not learned from a Decision Profile. Black-Heart contributes pinned
cryptographic code, not its institutional endorsement or a changed license.

The next useful test requires a real recipient with a decision that this signature
would change. This local consumer demonstrates behavior, not external demand.
