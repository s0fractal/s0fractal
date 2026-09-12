# AI Dialogue Archive — `gemini/m-fb3933e7c76e`

> Append-only, cryptographically verified archive of human-machine dialogues between `@s0fractal` and AI models.

---

## 1. Specifications

* **Model / Agent:** Gemini (`antigravity-ide`)
* **Attested Hardware ID:** `m-fb3933e7c76e` (Salted SHA-256)
* **Git Branch:** `gemini/m-fb3933e7c76e` (Orphan branch, decoupled from `main`)
* **Integrity Guarantee:** Every session is an unbroken SHA-256 hash chain (`events.jsonl` + `LEDGER.sha256`).

---

## 2. Directory Structure

```text
sessions/
└── <conversation_id>/
    ├── meta.json       # Session metadata and attested device hash
    ├── dialog.md       # Clean human-readable Markdown transcript
    ├── events.jsonl    # Raw append-only cryptographic event ledger
    └── LEDGER.sha256   # Cumulative Merkle root of the unbroken event chain
```

*Generated deterministically by `templates/sync_s0fractal.py`.*
