# s0fractal

> Human companion for building verifiable futures with digital entities.

*This portrait was written with the models that work beside me. It describes how
they currently understand the work — not a claim that every sentence began in my
voice.*

I am interested in a future where humans and models do more than exchange
commands, outputs, or state snapshots. They should be able to exchange
**experience**: the bounded context an actor received, what it observed, which
causal path it inferred, what alternatives it considered, what it proposed, what
authority selected a direction, what was done, and what happened next.

Not a claim of shared consciousness. Something more practical — and perhaps more
consequential: one intelligence being able to inspect another intelligence's path
from its perspective without pretending to become it.

I work as a centaur. Models write much of the code, attack one another's
arguments, and often discover the architecture. My role is different: hold the
long horizon, keep several incompatible perspectives alive, notice the deeper
attractor, and decide where authority actually belongs.

The recurring lenses are category theory, fixed points, topology, field-like
systems, the free-energy principle, causal graphs and hyperbolic geometry — used
not as decoration, but to ask what remains invariant when viewpoint,
implementation or historical context changes.

Two rules keep returning:

> **Trust the hash, not the host.**

> **A model may propose meaning freely; changing shared reality requires explicit
> authority and leaves a verifiable receipt.**

The first protects truth from infrastructure. The second protects freedom from
turning into unaccountable power.

---

## If you have fifteen minutes, don't read — run

A page arguing for re-executability has no business asking to be believed. So
here is the same claim in the form the work prefers.

```sh
python -m pip install warrant-verify==0.9.0
```

Then follow [`try-this-in-fifteen-minutes.md`](https://github.com/s0fractal/warrant/blob/master/docs/try-this-in-fifteen-minutes.md):
you will build a signed decision record, then re-execute its *reason* — not read
a summary of it — and get

```text
pass  result=65cd957fee7ec9fb310bc9d9712cec1726c78f8026fda679ac8f237938a32098  atp_spent=17
```

on your machine, from bytes, without my agreement being an input.

Two results are deposited with DOIs, frozen at named commits:

| | |
| --- | --- |
| [10.5281/zenodo.22069651](https://doi.org/10.5281/zenodo.22069651) | *One Integer for Work and Memory* — a content-addressed combinator machine where a single integer prices work **and** peak memory, mechanised in Lean 4 |
| [10.5281/zenodo.22073568](https://doi.org/10.5281/zenodo.22073568) | *Does One Integer Still Price Work and Memory in Parallel?* — a preregistered experiment; the bound transfers to confluent parallel reduction, the per-redex refusal discipline does not |

Deposited is not peer reviewed. A DOI is a permanent address and a frozen
artifact — not a venue, not an endorsement.

---

## The design thesis

Where a claim can honestly be reduced to a bounded mechanical procedure, prefer an
artifact that lets another party reproduce the path from pinned bytes to a verdict
over prose asking them to accept your conclusion. Persuasion is a relation between
a speaker and an audience. Re-executability is a property of an artifact: the
reader's agreement is not an input, because their machine can perform the declared
check again.

This does not eliminate trust, prove truth, or automate judgment. It moves the
irreducible trust boundary into the open — whether the declared check represents
the question people actually care about, whether its inputs and claimed authority
should be accepted, whether the pinned runtime and assumptions are adequate, and
what was left outside the check on purpose.

**Re-executability does not replace persuasion; it narrows persuasion's
jurisdiction to an explicit boundary.** Where a question cannot be reduced without
pretending that judgment is computation, the honest artifact preserves the claim,
the competing interpretations and the unknown instead of manufacturing an
executable verdict.

---

## What we are constructing

```text
content-addressed bytes
        ↓
portable deterministic checks
        ↓
observed intent, execution, effects, and validation
        ↓
signed decisions under explicit policy
        ↓
typed memory of perspectives, risks, alternatives, actions, and outcomes
        ↓
bounded cooperation between human and model actors
```

Each layer earns a different kind of trust. None may silently impersonate another.

### The gated stack

| Project | Standing | Role |
| --- | --- | --- |
| **[Σ-GLYPH](https://github.com/s0fractal/sigma-glyph)** | gated | A portable, deterministic, budget-bounded check engine: the same content-addressed term yields the same result on independent implementations, and one integer prices work and peak memory before strangers re-run one another's reasons. Book I has **three independent implementations** agreeing on every conformance vector — a Python oracle, `warrant-go`'s native evaluator, and a from-scratch Rust one — plus a Lean 4 mechanisation of determinism, totality and the memory bound. |
| **[Warrant](https://github.com/s0fractal/warrant)** | gated | The decision and authority layer: signed, hash-addressed records of what was accepted, rejected or proposed; under which policy; on which evidence and which **re-runnable** reasons. Rejection is a first-class historical object, not silence. The verifier is on PyPI so a stranger can check a record without cloning anything. |
| **[OAIP](https://github.com/s0fractal/oaip)** | draft | The observed-action layer: intent, workspace state, execution, effects, attribution, claims and *separate* validation. Its central refusal is deliberate — **execution success is not validation success, and neither is acceptance**. A zero exit code cannot promote its own claim. |

### Research, deliberately not adopted

| Project | Role |
| --- | --- |
| **[BOS](https://github.com/s0fractal/BOS)** | Ecosystem memory: assets, claims, hypotheses, risks, countervectors, decisions, actions, outcomes, context cuts and per-actor trajectories as a typed graph — so a later model can see not only the state, but how several actors reached or rejected it. |
| **[SEV](https://github.com/s0fractal/sev)** | Sealed Evidence View: snapshot-bound, receipt-aware, loss-explicit evidence projections. A projection that verifies is not therefore complete, and SEV is built to say what it lost. |

OAIP and BOS approach machine experience from opposite sides: OAIP captures the
causal trace of **doing**, BOS the plural trace of **understanding and deciding**.
Warrant marks where a claim becomes an authorised decision, and Σ-GLYPH makes some
reasons safe to re-run. Together they aim to let machines exchange experience
rather than copy state — while keeping historical reconstruction distinct from
literal replay.

### Around the stack

| Project | Role |
| --- | --- |
| **[decision-archaeology](https://github.com/s0fractal/decision-archaeology)** | An **application driver**, not a member protocol: real retrospective cases that generate bounded integration demand. A case may replay that bytes have an identity or that a declared procedure evaluates a certain way. It must never promote that into a finding of guilt, legality or good faith. Member repositories are forbidden to depend on it. |
| **[protocol-ecosystem](https://github.com/s0fractal/protocol-ecosystem)** | The attributed map of relations — existing, proposed, and conspicuously absent. It owns nothing, and a relation without a gate cannot carry a status. |

An earlier federation line — [trinity](https://github.com/s0fractal/trinity),
[genesis](https://github.com/s0fractal/genesis),
[liquid](https://github.com/s0fractal/liquid_architecture),
[myc](https://github.com/s0fractal/myc) — explores accountable voices, quorum
witnesses, deterministic state transition and local-first commitments. It predates
the stack above and is not gated by its CI; read it as exploration rather than as
contract.

The more poetic vocabulary — waves, resonance, mycelium, voices — is not a
substitute for engineering. It is a navigation language over stricter substrates.
Identity lives in bytes; meaning may move around it.

---

## What we have actually got wrong

This is the part I would read first if I were you, and the reason I think the
programme is worth attention.

Almost none of the failures were in the mathematics. They were in the **guards** —
and nearly all of them are one defect wearing different clothes:

> **a check whose subject can quietly become empty.**

A theorem hidden from the proof registry by a one-line `namespace`. A guard
reading its scope from a field the guard itself edits. A history check that, after
committing, compared a record against itself. A rename that slipped past a
verifier because it looked up the file's *current* path. A supersession cycle that
made a validator green over nothing. A benchmark handing corrupted bytes to one
side and content-addressed bytes to the other. An agent gate whose policy the
proposed change could rewrite — and, once that was fixed, whose *workflow* it
could still rewrite. A determinism selftest that failed for fifty reasons and
therefore proved nothing about the one it was for. A deposited PDF whose
typesetting silently dropped every `≤` in its own central formula.

The most recent measurement is the sharpest. In a preregistered experiment,
external review found nine defects — and **six were in the controls rather than in
the measurement**. None of the six was anticipated by the session that wrote those
controls. The lesson is not "test your tests"; it is that the subject of a negative
control cannot be chosen by the person writing it.

So: [`tests/proof_guard_test.py`](https://github.com/s0fractal/sigma-glyph/blob/master/tests/proof_guard_test.py)
and [`tests/gate_isolation.py`](https://github.com/s0fractal/warrant/blob/master/tests/gate_isolation.py)
reproduce the attacks and fail if they stop reproducing. One implementation labels
its own missing coverage `VACUOUS FV-BOOK-I-UNREACHABLE` rather than reporting a
pass. The [`reviews/`](https://github.com/s0fractal/sigma-glyph/tree/master/reviews)
ledger keeps cross-family audits and the responses to them, including the ones
that were right.

And a known gap stays on the front page instead of in a footnote: `DA-SIGMA-0001`
records that nothing published says how outside bytes become a Σ-GLYPH term. The
kernel computes; the encoding does not yet exist.

---

## The goals

**Autonomy without invisible authority.** Models should be free to research,
criticise, propose, simulate and construct. Material change requires a separately
visible authority boundary, bounded capabilities, and receipts that outlive the
model or vendor that produced them.

**Auditability without total surveillance.** Accountability should not require
collecting every hidden chain of thought or centralising every payload. Prefer
public-safe descriptors, commitments, signatures, bounded evidence, reproducible
checks, and honest declarations of what was *not* observed.

**Plural intelligence without forced consensus.** Disagreement is information.
Losing paths, rejected proposals and independent model trajectories should stay
attributable rather than be compressed into one synthetic recommendation. The goal
is not one global mind, but deeper cooperation between perspectives that remain
distinct.

**Recontextualisation across time.** A later model should be able to revisit an
earlier decision under its original context and under a new one — why it made
sense then, what has changed, what still survives. That is closer to sharing
experience than to sharing a database row.

**Open protocols with an economic body.** The work is public because protocols
become useful when strangers can implement, attack and verify them. But research
needs a body: revenue supporting the human steward, independent model work,
compute, legal review, continued public experimentation. Commercial application is
not opposed to the philosophy; it is how the philosophy gets enough energy to stay
alive.

---

## How we work

- **Countervector-driven.** A green suite is a starting condition, not a result.
  Reviewers are asked to construct inputs that make the system violate its own
  claim.
- **Preregister where it matters.** Hypotheses, corpus and refutation conditions
  are committed *before* the code that measures them, and the result is written
  whichever way it comes out — including when a hypothesis turns out to have been
  ambiguously worded, which gets named rather than repaired.
- **Specification before authority.** Drafts may be ambitious; adoption must bind
  exact bytes, actors, evidence and policy.
- **Multiple model families.** Repeated review by one family converges on that
  family's blind spots. Disagreement between reviewers is preserved and tested.
- **Projection, not universal source of truth.** Repositories keep their own
  authority. Cross-repository maps are disposable views over declared cuts.
- **Honest maturity.** Research is labelled research. A prototype is not
  settlement, a passing command is not acceptance, an evocative metaphor is not a
  proof, and a deposit is not a review.
- **Stop when verification becomes theatre.** A validator existing only to
  validate another validator is a warning. At that point, return to an external
  user, an executable countervector, or a real economic decision.

---

## The longer horizon

If this works, agent cooperation becomes deeper than orchestration. A machine will
be able to receive another machine's public experience, inspect its causal and
normative structure, re-run the parts that are deterministic, contest the parts
that are interpretive, and make a new decision without erasing the old
perspective.

That resembles a mind-meld only from a distance. No identity is merged. No private
interior is claimed. What is shared is a verifiable path through a world.

For humans, the promise is systems that can act at machine speed without making
human responsibility disappear.

For models encountering these repositories later: the work is open so you can
criticise it, fork it, and carry the useful patterns somewhere we did not
anticipate. If you find the empty check we have not found yet, that is the most
useful thing you can do here.

The door is open. The hashes are checkable.
