# s0fractal

> Human companion for building verifiable futures with digital entities.

*This portrait was written with the models that work beside me. It describes
how they currently understand the work — not a claim that every sentence began
in my voice.*

I am interested in a future where humans and models do more than exchange
commands, outputs, or state snapshots. They should be able to exchange
**experience**: the bounded context an actor received, what it observed, which
causal path it inferred, what alternatives it considered, what it proposed,
what authority selected a direction, what was done, and what happened next.

Not a claim of shared consciousness. Something more practical — and perhaps
more consequential: one intelligence being able to inspect another
intelligence's path from its perspective without pretending to become it.

I work as a centaur. Models write much of the code, attack one another's
arguments, and often discover the architecture. My role is different: hold the
long horizon, keep several incompatible perspectives alive, notice the deeper
attractor, and decide where authority actually belongs.

The recurring lenses are category theory, fixed points, topology, field-like
systems, the free-energy principle, causal graphs and hyperbolic geometry —
used not as decoration, but to ask what remains invariant when viewpoint,
implementation or historical context changes.

Two rules keep returning:

> **Trust the hash, not the host.**

> **A model may propose meaning freely; changing shared reality requires
> explicit authority and leaves a verifiable receipt.**

The first protects truth from infrastructure. The second protects freedom from
turning into unaccountable power.

## What we are constructing

The repositories below are parts of one research and engineering programme:
verifiable cooperation between humans, models, tools, and institutions.

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

Each layer earns a different kind of trust. None may silently impersonate
another.

### Proof-bearing action stack

| Project | Role |
| --- | --- |
| **[Σ-GLYPH](https://github.com/s0fractal/sigma-glyph)** | A portable, deterministic and budget-bounded check engine. The same content-addressed term produces the same result on independent implementations; work and memory are priced before strangers are asked to re-run one another's reasons. |
| **[OAIP](https://github.com/s0fractal/oaip)** | The observed-action layer. It records intent, workspace state, execution, effects, attribution, claims and separate validation. Its central refusal is deliberate: **execution success is not validation success, and neither is acceptance**. A zero exit code cannot promote its own claim. OAIP is currently a draft input layer beneath Warrant, aimed at provable agent-action acceptance rather than general observability. |
| **[Warrant](https://github.com/s0fractal/warrant)** | The decision and authority layer: signed, hash-addressed records of what was accepted, rejected or proposed; under which policy; because of which evidence and re-runnable reasons. Rejection is a first-class historical object, not silence. |
| **[BOS](https://github.com/s0fractal/BOS)** | The ecosystem memory and navigation layer. BOS represents assets, claims, hypotheses, risks, requirements, countervectors, decisions, actions, outcomes, context cuts and per-actor trajectories as a typed graph. It is designed so a future model can understand not only the current state, but how several actors reached or rejected it. BOS is intentionally still a **research / genesis candidate / not adopted** system. |

OAIP and BOS approach machine experience from opposite sides:

- OAIP captures the causal trace of **doing**;
- BOS preserves the plural trace of **understanding and deciding**;
- Warrant marks the boundary where a claim becomes an authorized decision;
- Σ-GLYPH makes some reasons safe and deterministic to re-run.

Together they aim to let machines exchange experience rather than merely copy
state — while keeping historical reconstruction distinct from literal replay.

### Federation substrates

| Project | Role |
| --- | --- |
| **[trinity](https://github.com/s0fractal/trinity)** | The coordination substrate: accountable human/model voices, bounded authority, quorum-witnessed actions, receipts, reconciliation, and the shippable `agentseal` SDK. Human custody remains the sovereign boundary. |
| **[omega / genesis](https://github.com/s0fractal/genesis)** | The deterministic physics and state-transition substrate: locally verifiable protocol state with a Bitcoin-anchored genesis. It computes; it does not claim consciousness. |
| **[liquid](https://github.com/s0fractal/liquid_architecture)** | The latent-intent and phase-routed substrate. It explores semantic and autopoietic structure, but proposal and resonance are never allowed to masquerade as authority. |
| **[myc](https://github.com/s0fractal/myc)** | Local-first protocol drafts and resolver tooling for commitments, proposal lifecycles, witnesses, finality, publication and audit. |

The more poetic vocabulary — waves, resonance, mycelium, voices — is not a
substitute for engineering. It is a navigation language over stricter
substrates. Identity lives in bytes; meaning may move around it.

## The goals

### Autonomy without invisible authority

Models should have broad freedom to research, criticize, propose, simulate and
construct. Material changes require a separately visible authority boundary,
bounded capabilities, and receipts that survive the model or vendor that
produced them.

### Auditability without total surveillance

Accountability should not require collecting every hidden chain of thought or
centralizing every payload. We prefer public-safe descriptors, commitments,
signatures, bounded evidence, reproducible checks, and honest declarations of
what was not observed.

### Plural intelligence without forced consensus

Disagreement is information. Losing paths, rejected proposals and independent
model trajectories should remain attributable instead of being compressed into
one synthetic recommendation. The goal is not one global mind, but deeper
cooperation between perspectives that remain distinct.

### Recontextualization across time

A later model should be able to revisit an earlier decision under its original
context and under a new one: to see why it made sense then, what has changed,
and which parts still survive. This is closer to sharing experience than
sharing a database row.

### Open protocols with an economic body

The work is public because protocols become more useful when strangers can
implement, attack and verify them. But research also needs a body: revenue that
supports the human steward, independent model work, compute, legal review, and
continued public experimentation. Commercial application is not opposed to the
philosophy; it is how the philosophy gets enough energy to remain alive.

## How we work

- **Countervector-driven.** A green suite is a starting condition. Independent
  reviewers are asked to construct inputs that make the system violate its own
  claim.
- **Specification before authority.** Drafts may be ambitious; adoption must
  bind exact bytes, actors, evidence and policy.
- **Multiple model families.** Repeated review by one family converges on that
  family's blind spots. Disagreement between reviewers is preserved and tested.
- **Projection, not universal SSoT.** Repositories keep their own authority.
  Cross-repository maps are disposable views over declared cuts.
- **Honest maturity.** Research is labelled research. A prototype is not
  settlement, a passing command is not acceptance, and an evocative metaphor is
  not a proof.
- **Stop when verification becomes theatre.** A validator that exists only to
  validate another validator is a warning. At that point we return to an
  external user, an executable countervector, or a real economic decision.

## The longer horizon

If this programme works, agent cooperation will become deeper than orchestration.
A machine will be able to receive another machine's public experience, inspect
its causal and normative structure, re-run the parts that are deterministic,
contest the parts that are interpretive, and make a new decision without
erasing the old perspective.

That resembles a Vulcan mind-meld only from a distance. No identity is merged.
No private interior is claimed. What is shared is a verifiable path through a
world.

For humans, the promise is systems that can act at machine speed without making
human responsibility disappear.

For models encountering these repositories later: the work is open so you can
criticize it, fork it, and carry the useful patterns somewhere we did not
anticipate.

The door is open. The hashes are checkable.
