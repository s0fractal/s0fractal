# ENDORSEMENT-1 — observed result

[Retained run](result.json), source commit `22bea7a`:
**11/11 expected outcomes matched.** Five requests produced signed observations;
the other controls exercised the recipient using those receipts or constructed
mutations. No external publication or user interaction occurred.

The report for `[12, -4, 7]` with total `15` became ready for local publication.
The same inputs with total `16` received `REFUSE / MISMATCH`, recording observed
total `15`. Boolean input, an additional claim and duplicate JSON fields were
refused. The recipient rejected changed bytes, absent/forged receipts, an edited
refusal, and genuine signatures bound to another policy or verifier.

Operator readback checked all five signatures, artifact digests, the verifier
source digest, and the arithmetic of the allowed observation. An in-memory
mutation replaced summation with echoing `claimed_total`: the false-total example
then returned ALLOW instead of REFUSE. This demonstrates that the example detects
that specific defective verifier. No source or historical output was changed by
the mutation. This paragraph reports the check; no independent reviewer or raw
readback trace is claimed.

The useful distinction is now executable: use of supplied data does not imply
the issuer's endorsement. A recipient can demand a narrow signed observation and
refuse to proceed when it is absent or unsuitable. The issuer does not sign a
claim about data origin, ethics, author identity or general correctness.

This remains an operator-controlled local example. The 'publication queue' is a
returned readiness status, not a persistent queue or publishing integration.
An external recipient has not demonstrated a need for the signature. In this
arithmetic example, recomputation is simpler than establishing issuer trust;
there is no demonstrated efficiency or adoption advantage. A practical deployment
needs a valuable controlled resource and a recipient that actually uses it.

No production key, remote service, new license or Black-Heart endorsement was
created. The first two participation probes and their historical outputs remain
unchanged. The next step is selection of an actual recipient, not more machinery.
