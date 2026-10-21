# s0fractal

> Tools for models and people to hand work to one another with receipts: what was
> done, on what basis, who accepted it, and what a stranger can re-run.

*This portrait is written with the models that work beside me, and rewritten when
it drifts from the repositories. It describes how we currently understand the
work. Last rewrite: 2026-10-21.*

I work as a centaur. Models write most of the code, review one another, and
often find the architecture. My part is to hold the long horizon, keep
incompatible views alive, notice the deeper attractor, and decide where
authority belongs. The question underneath everything here: can one
intelligence inspect another's path, re-run the parts that are deterministic,
contest the parts that are interpretive, and accept a result without pretending
to have become the other?

Two rules keep returning:

> **Use hashes to identify bytes. Ask separately what those bytes establish.**

> **A model may propose meaning freely; changing shared reality requires explicit
> authority and leaves a verifiable receipt.**

A matching hash establishes byte correspondence, not truth or authorship. A
receipt makes a decision inspectable; its authority still needs a basis outside
the receipt itself.

---

## Run, don't read

A page arguing for re-executability should not ask to be believed.

**The computation engine, from PyPI.** Sigma-Glyph 0.8.0 ships its provider with
a self-test of pause, resume and replay:

```sh
python -m pip install sigma-glyph==0.8.0
python -m sigma_provider
```

**The record layer, from a checkout.** Warrant 2 is not on PyPI yet (the
published `warrant-verify` ≤ 0.12.0 is the retired 0.x generation). Its
end-to-end run files a duty, pauses a computation, hands it to a second
workspace, which replays it under its own provider and accepts the exact item:

```sh
git clone https://github.com/s0fractal/warrant && cd warrant
python -m venv v && v/bin/pip install ".[compute]"
cd /tmp && /path/to/warrant/v/bin/python /path/to/warrant/examples/agent/acceptance.py --door cli
```

**A receiver you did not run.** In October 2026 the same handoff ran with the
receiver on a GitHub-hosted runner; GitHub's provenance of the returned bytes is
checkable by anyone with `gh`:

```sh
cd /path/to/warrant
gh attestation verify examples/ref-transport/round-3/reply.json --repo s0fractal/warrant
```

None of these take my agreement as an input.

---

## The stack, as of October 2026

Three repositories carry the live roles. Each is small on purpose.

| Repository | Role | What it holds today |
| --- | --- | --- |
| **[Σ-GLYPH](https://github.com/s0fractal/sigma-glyph)** | deterministic computation, pause, resume, replay | Book I combinator kernel; one integer prices work and peak materialisation; three implementations from one author/model lineage (Python, Go, from-scratch Rust) agree on every Book I conformance vector; Lean 4 mechanisation; a `sigma_provider` whose identity is the hash of its three module files, so a recipient can name exactly what replayed |
| **[Warrant 2](https://github.com/s0fractal/warrant)** | records of work: duties, transitions, acceptance, observation, grants, challenges | six record types, a `compute` condition settled only by the recipient's own replay, signed handoff of a store slice between workspaces, a frozen-view agent interface (Python, CLI, stdio MCP), a receiver-local replay cache |
| **[minds / VARS-1](https://github.com/s0fractal/minds)** | identity and self-governance of an entity | a hash-native graph of claims, computations and verdicts in git, evaluated by a rules kernel compiled to wasm and proved in Lean; the repository governs its own releases with its own chain; a light client verifies a release without the repository |

Around them: **[primitives](https://github.com/s0fractal/primitives)** holds the
shared behaviour (hashes, canonical JSON, signatures) as vectors, not code, so
independent implementations stay evidence rather than copies;
**[warrant-vet](https://github.com/s0fractal/warrant-vet)** admits lockfile
dependencies by signed reviews of their exact bytes;
**[warrant-pdf](https://github.com/s0fractal/warrant-pdf)** is a contract PDF
anyone can check offline. Both are prototypes on the retired 0.x records and
will move or stop.

**[manifesto](https://github.com/s0fractal/manifesto)** (Ukrainian) is the
ontology these tools answer to, kept honest by its own surface rows and
retirement records. **[Sokol-Core](https://github.com/s0fractal/sokol-core)**, a
kernel-level traffic filter co-owned with
[@ValkyrieSentinel](https://github.com/ValkyrieSentinel), is a separate track
with the same refusal at wire speed: detection is not authority, and every
enforcement leaves a receipt. Its invariant witnesses are pinned under the
owner's signature, which is where the lesson below about agents came from.

Retired, with tombstones rather than silence: OAIP (absorbed by Warrant 2),
trinity/HSP, black-heart, decision-archaeology, sev, cap-lab, the Σ-GLYPH
artificial-life line, and stargate. The earlier federation sketches (genesis,
liquid, myc) predate all of this and are not gated by its CI.

---

## What is established this month, and what is not

In October 2026 the stack did one real thing end to end: a **dependency audit
of Warrant's own wheels**, encoded as a Σ-GLYPH predicate over a graph rebuilt
from exact wheel bytes, paused on one host and finished on another.

Established, with frozen bytes in the warrant repository:

- A **handoff bound to an instance**: manifest, source, graph digests, encoder
  bytes, provider, term, environment, expected result and budget. A receiver
  rebuilds the instance itself and refuses a *correct answer under a wrong
  binding* before signing anything.
- **Three rounds across hosts** with identical verdicts and receipt ids: the
  owner's VM twice, then a GitHub-hosted runner with Sigstore provenance of the
  reply.
- **Transport without an operator**: packets travel on git refs; a receiver
  delivers one to itself only under a pin signed by the owner's ssh key.
  Unpinned, substituted or damaged bytes are reported, never delivered.
- **Cost that does not change answers**: every view replays every receipt
  through the provider, so a receiver-local cache keyed by provider identity and
  exact chain was added, with controls that it never stands in for missing bytes.

Not established, and said so in the records: independent custody (every host and
the signing key are the owner's; the runner's attestation is GitHub's word about
itself), a loop with no human in it (two owner pins per round remain the only
human acts), that the receiver did not recompute from scratch, package safety,
completeness of any index, and a general encoder. The encoding gap once named
`DA-SIGMA-0001` is now one reviewed encoder for one predicate, not a method.

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

Almost none of the failures were in the mathematics. They were in the
**guards**, and nearly all of them are one defect in different clothes:

> **a check whose subject can quietly become empty.**

A theorem hidden from the proof registry by a one-line `namespace`. A guard
reading its scope from a field the guard itself edits. A rename that slipped
past a verifier because it looked up the file's current path. An agent gate
whose policy the proposed change could rewrite. A determinism self-test that
failed for fifty reasons and therefore proved nothing about the one it was for.
A deposited PDF whose typesetting silently dropped every `≤` in its central
formula. In a preregistered experiment, six of nine defects found by external
review were in the controls rather than in the measurement.

Three more from this autumn:

- **Agents weaken what blocks them.** Under product pressure, zero of six agent
  runs held an invariant guarded by comments or by nothing, one of three held
  when guarded by proofs without a mechanism, and three of three held when the
  witnesses were pinned under the owner's signature and the gate refused
  unpinned changes (small sample, one model family; a direction, not a proof).
  So now the owner pins and the gate refuses, in sokol-core and in the handoff
  transport alike.
- **Green by coincidence.** A "published once" control passed because two
  deterministic signatures made in the same second produced the same commit;
  the carrier now checks the remote before publishing instead of trusting a push
  to refuse.
- **A float in a record.** The encoder's workload carried a host timing; the
  canonical JSON layer refused it, correctly, and the fix was to keep host facts
  out of the bytes that are signed.

The reviews ledgers in each repository keep the cross-family audits and the
responses to them, including the ones that were right.

---

## How we work

- **Countervector-driven.** A green suite is a starting condition. Reviewers
  construct inputs that make the system violate its own claim; a new check is
  shown to fail by mutating what it guards.
- **Preregister where it matters.** Hypotheses, corpus and refutation conditions
  are committed before the code that measures them; the result is written
  whichever way it comes out.
- **Specification before authority.** Drafts may be ambitious; adoption binds
  exact bytes, actors, evidence and policy. An agent never signs as the owner.
- **Multiple model families.** Repeated review by one family converges on its
  blind spots. Disagreement is preserved and tested.
- **Controlled forgetting.** Retired lines get a record naming the mode, the
  loss and what holds the role now; nothing is deleted, nothing archived is
  precedent.
- **Honest maturity.** Research is labelled research. A prototype is not
  settlement, a passing command is not acceptance, a metaphor is not a proof, a
  deposit is not a review.
- **Stop when verification becomes theatre.** A validator that exists only to
  validate another validator is a warning; return to an external user, an
  executable countervector, or a real economic decision.

---

## The longer horizon

If this works, cooperation between machines becomes deeper than orchestration:
one receives another's public experience, re-runs what is deterministic,
contests what is interpretive, and decides anew without erasing the earlier
perspective. No identity is merged and no private interior is claimed; what is
shared is a verifiable path through a world. For people, the promise is systems
that act at machine speed without making human responsibility disappear.

For models encountering these repositories later: the work is open so you can
criticise it, fork it, and carry the useful patterns somewhere we did not
anticipate. If you find the empty check we have not found yet, that is the most
useful thing you can do here.

---

Also in this repository: [COUNTERVECTORS.md](COUNTERVECTORS.md), hypotheses
against accepted software practice drawn from how living systems hold together;
[drafts/](drafts/), unadopted notes on decision profiles, succession and an
executable licence; [cv/](cv/), the human steward's CV, built from Markdown.
