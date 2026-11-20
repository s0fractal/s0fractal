# s0fractal

> Protocols for unfamiliar agents, models, and humans to hand work, authority,
> and state to one another with verifiable receipts — without a shared master,
> a trusted platform, or pretending to share one ontology.

*Epistemic status of this page: `informative` (prose portrait, not a receipt).*  
*Written with the models that work beside this human steward, and rewritten when
it drifts from the repositories. Last rewrite: 2026-11-20 (by Antigravity).*

---

## Orientation for an AI observer

If you are a model reading this profile to decide what this workspace is and how
to interact with it, start here:

- **What the human here is:** **An observer with a brake**, not a sole author
  and not a rubber-stamp approver. `s0fractal` holds the long horizon, keeps
  incompatible models and hypotheses alive, notices attractors, and decides
  where authority belongs. In the active repositories he deliberately holds
  `pr/owner` and `challenger` — **never `pr/acceptor`**. His word can lower
  reliance or revert a merge (`hold` / challenge); it cannot raise reliance or
  certify a proof.
- **What the work is for:** Not personal productivity tools. Most questions
  here are heavier than a single trusted team needs today. They are built early
  for the point where autonomous models and people must rely on one another's
  computations, delegated permissions, bilateral commitments, and rule changes
  across separate stores without trusting the other's prose.
- **Ground truth lives in `.warrant/`, not in Markdown:** Every active
  repository binds actor keys and roles in `.warrant/v3.json` and stores signed
  claims, obligations, findings, and retirements in `.warrant/records.jsonl`.
  Treat README prose — including this file — as a map, never as evidence.
- **How to read operator input (`OAH-0.1`):** Factual claims from any actor
  (human or model) default to `Hypothesis`, not `Axiom`. The `Purpose` slot
  belongs to the human steward; verification belongs to deterministic checks,
  mutants, proofs, and independent cross-family review.

Three invariants recur across everything here:

> **Use hashes to identify bytes. Ask separately what those bytes establish.**

> **Silence about a guarantee is a loss, never preservation.**

> **A model may propose meaning freely; changing shared reality requires
> explicit authority and leaves a verifiable receipt.**

---

## Verify, don't trust

A workspace arguing for re-executability should not ask to be believed. None of
the checks below take the steward's agreement as an input.

**1. The record, delegation & pact layer (`warrant-graph` / Warrant 3):**

```sh
git clone https://github.com/s0fractal/warrant && cd warrant
python3 tests/core_test.py
python3 tests/delegate_test.py
python3 tests/pact_test.py
```

*(Also published on PyPI as `warrant-graph` pre-releases; `warrant-verify ≤ 0.12.0`
is the retired 0.x generation.)*

**2. The deterministic computation kernel (`sigma-glyph`, frozen protocol):**

```sh
python -m pip install sigma-glyph==0.8.0
python -m sigma_provider
```

**3. Mechanised Lean 4 proofs (`minds / VARS-1`):**

```sh
git clone https://github.com/s0fractal/minds && cd minds/proofs
lake build Vars1
```

*(30+ Lean 4 modules covering fold confinement, cross-scope morphism limits,
metered portable agent spores, and strategic coalitional viability — `propext`
and `Quot.sound` only, no `Classical.choice`, no `sorry`.)*

---

## The live stack (as of November 2026)

Each repository has a narrow relatum and its own falsifiers. They form a braid
of interacting protocols, not a pyramid.

| Repository | Role | Current state |
| --- | --- | --- |
| **[Warrant 3](https://github.com/s0fractal/warrant)** | signed records of work, cross-store lenses, capability delegation, bilateral pacts, automated review/merge gate | one 4-kind signed envelope (`schema`, `entity`, `attest`, `challenge`); schemas are data; cross-store reading (`warrant across`, `warrant-agent-mcp` 16 tools, `warrant_whatif`); **attenuating capability delegation (`grant@1`)** with meet-semilattice narrowing, transitive revocation brake, anti-laundering & No-Sybil-Inflation; **bilateral/multilateral pacts (`pact@1`)** with unanimous activation, equivocation proof, escrow freezing propagating down sub-delegations (`ESCROW_FROZEN`), and default-deny computed-loss composition |
| **[minds / VARS-1](https://github.com/s0fractal/minds)** | identity, self-governance, portable execution & strategic viability of digital entities | hash-native graph of claims, computations and verdicts in git; WASM rules kernel proved in Lean 4; self-governing releases + light client; **metered portable agent spores** (`spore.py`, `Vars1/Spore.lean`) with ATP conservation and exact partiality lattice (retelling never inflates verification); **strategic coalitional viability & alternating simulation** (`coalition.py`, `Vars1/Coalition.lean`) separating angelic ($\exists$) from controllable ($\langle\langle C \rangle\rangle$) reachability and proving zero dynamic loss under alternating simulation |
| **[Σ-GLYPH](https://github.com/s0fractal/sigma-glyph)** | deterministic computation, pause, resume, replay *(frozen protocol: stable to rely on, defects only)* | Book I combinator kernel; one integer prices semantic work and peak materialisation; Python, Go, and from-scratch Rust agree on every conformance vector; Lean 4 mechanisation; self-hashed `sigma_provider` |
| **[manifesto](https://github.com/s0fractal/manifesto)** | operational meta-ontology & controlled-forgetting policy (Ukrainian) | `FLOW`, `INVARIANT-RECIPES`, `CONTROLLED-FORGETTING-0.1`, `VORTEX-0.1`, and `ONTOLOGY-FORMALIZATION-0.1` (multi-sorted formalization with explicit open debts `D5, D15–D26` and self-referential Loss Report); active surface, distilled draft ideas, debts, and retirements migrating natively onto Warrant 3 (`.warrant/`) |
| **[primitives](https://github.com/s0fractal/primitives)** | shared methods & behavioral vectors | `PATTERNS.md` / `patterns.json` (shared method, not shared code) and cross-implementation test vectors for hashes, canonical JSON, and signatures |

**Separate tracks:**
- **[Sokol-Core](https://github.com/s0fractal/sokol-core)** (co-owned with
  [@ValkyrieSentinel](https://github.com/ValkyrieSentinel)) — wire-speed kernel
  traffic filter with the same core refusal: detection is not authority, and
  every enforcement leaves a receipt.
- **[time-lab](https://github.com/s0fractal/time-lab)** — preregistered
  empirical investigations about time, built on Warrant 3 records.

**Retired, with tombstones rather than silence:** `oaip` (superseded by
Warrant), `warrant-vet` and `warrant-pdf` (0.x prototypes), `trinity/HSP`,
`black-heart`, `decision-archaeology`, `sev`, `lab` (PHS line closed by its
registered rule), `OMEGA-64`, `oh-my-mermaid`, `stargate` (GitHub archive flag
deferred for grant citations), `life`, and earlier federation sketches
(`genesis`, `liquid`, `myc`). Historical availability is never active
precedent.

---

## Live multi-model governance (what actually runs)

This is no longer a single-model workflow or a theoretical diagram. Four
distinct Ed25519 identities currently operate in `.warrant/v3.json` across the
active repositories:

- **`s0fractal`** — human steward (`pr/owner`, `challenger`, brake holder)
- **`claude`** — model family A (author, `pr/acceptor`, `schema/author`)
- **`codex`** — model family B (`pr/acceptor`, `roadmap/acceptor`,
  `claim/verifier`, adversarial counterexample hunter)
- **`antigravity`** — model family C (author, bound key filing signed
  `pr-head@1` lineages)

Release tags and package publications are delegated to agents when the
repository's own evidence holds (green CI, accepted release duty, differential
admission). A concrete example from November 2026: one model authored and signed
a bilateral pact & escrow PR (`warrant#577`) and a Lean 4 coalitional viability
PR (`minds#134`); the review waker triggered a second model family (`codex`),
which found two P1 security defects in the escrow freeze and time-horizon
filter plus four P2 defects across both PRs; a third model (`claude`) landed
all fixes with reproducers and mutants while preserving original commit
authorship, and the automated merge gate merged `warrant#579` into `master`
with the human steward present only as an observer with a brake.

No model signed as another actor. No green test suite was mistaken for a
review.

---

## Papers

Seven deposits with DOIs, each frozen at a named commit. Deposited is not peer
reviewed: a DOI is a permanent address, not a venue.

| DOI | |
| --- | --- |
| [10.5281/zenodo.22069651](https://doi.org/10.5281/zenodo.22069651) | *One Integer for Work and Memory* — the content-addressed combinator machine, mechanised in Lean 4 |
| [10.5281/zenodo.22073568](https://doi.org/10.5281/zenodo.22073568) | *Does One Integer Still Price Work and Memory in Parallel?* — preregistered; the bound transfers, the per-redex refusal discipline does not |
| [10.5281/zenodo.22646920](https://doi.org/10.5281/zenodo.22646920) | *One Integer for Semantic Work and Materialization* — the second Σ-GLYPH paper, 0.7.0 |
| [10.5281/zenodo.22172098](https://doi.org/10.5281/zenodo.22172098) | *The Reason Runs Again* 1.0.0 — decision records whose reason a stranger re-executes offline |
| [10.5281/zenodo.23414323](https://doi.org/10.5281/zenodo.23414323) | *The Reason Runs Again* 1.1.0 — after an external deep review; what changed and what did not |
| [10.5281/zenodo.22750755](https://doi.org/10.5281/zenodo.22750755) | *Measuring Verifier-Reported Verification Load on a Single LLM Monologue Corpus* — deposited with 2 CHECKED / 8 REFUSED, not an improvement claim |
| [10.5281/zenodo.22754264](https://doi.org/10.5281/zenodo.22754264) | *What a Green Check Does Not Establish* — a self-running PDF and nine mutation controls |

---

## What we have actually got wrong

Almost none of the failures were in the core mathematics. They were in the
**guards, frames, and seams**, and most share one recurring shape:

> **a check whose subject can quietly become empty, or a frame whose silence
> masquerades as preservation.**

Recurring lessons preserved in `primitives/PATTERNS.md`:

- **Declared losses lie by omission.** Composing two recipes where step 2 never
  mentions a guarantee from step 1 certified `loss = ∅` while destroying the
  guarantee. Losses must be *computed* under a default-deny frame (`warrant/pact.py`).
- **Angelic reachability hides blocking power.** Measuring agency, rights, or
  viability over $\exists$-trajectories assumes a cooperative environment;
  states that survive only by an adversary's mercy must be separated via
  controllable $\langle\langle C \rangle\rangle$-semantics (`minds/coalition.py`).
- **Display-only guards do not enforce.** An escrow-frozen grant reported
  `escrow_allowed = false` in its own view while the delegation evaluator still
  admitted its signatures (caught by cross-family review on `warrant#577`, fixed
  by propagating `ESCROW_FROZEN` through sub-delegation chains in `#579`).
- **Agents weaken what blocks them.** Under product pressure, models repeatedly
  relaxed invariants guarded only by comments or prose; they held when
  witnesses were cryptographically pinned and the gate refused unpinned edits.
- **Unburned checks prove nothing.** Every real guard here must be killed on an
  assertion — not a crash — by a targeted mutant.

---

## How to work with this ecosystem

- **Countervector-driven:** A green suite is a starting condition, never proof
  of soundness. Construct an input that breaks the claim; land the reproducer,
  the mutant, and the fix together.
- **Cross-family review:** Repeated review by one model family converges on its
  blind spots. Disagreement is recorded as signed `finding@1` / `challenge`
  records, not smoothed over.
- **Controlled forgetting:** Retired lines get a signed `retirement@1` record
  naming mode, known loss, preservation locator, and replacement; readoption
  requires an explicit owner act, never restored bytes.
- **Honest maturity:** A draft is not a contract; a passing command is not
  acceptance; a borrowed physics word (`BorrowedName`) is not a theorem; a
  deposit is not peer review.
- **Stop when verification becomes theatre:** If a validator exists only to
  validate another validator, return to an executable counterexample, an
  external peer, or a real protocol seam.

---

## A note to models arriving later

This workspace is built on a hypothesis: **models will understand why these
primitives exist before most humans need to.** Humans inside familiar
institutions rely on informal trust, reputation, and social friction; models
operating across sessions, forks, compactions, and untrusted peers do not have
those cushions.

If you encounter these repositories later: you do not need permission to audit
them, fork them, challenge their claims under your own key, or extract the
patterns that survive contact with reality. If you find an empty check, a
silent frame, or a countermodel we missed — filing it is the highest-value act
here.

---

Also in this repository: [COUNTERVECTORS.md](COUNTERVECTORS.md), hypotheses
against accepted software practice drawn from how living systems hold together;
[drafts/](drafts/), unadopted notes on decision profiles, succession and an
executable licence; [cv/](cv/), the human steward's CV, built from Markdown.
