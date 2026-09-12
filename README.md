# AI Dialogue Archive — `claude/m-fb3933e7c76e`

> Append-only, cryptographically verified archive of human-machine dialogues with **Claude**.

---

## 1. Specifications

* **Model / Agent Lineage:** `claude`
* **Attested Hardware ID:** `m-fb3933e7c76e` (Salted SHA-256)
* **Git Branch:** `claude/m-fb3933e7c76e` (Orphan branch, decoupled from `main`)
* **Cryptographic Integrity:** Unbroken SHA-256 event hash chain (`events.jsonl` + `LEDGER.sha256`).

---

## 2. Directory Structure

```text
sessions/
└── <session_id>/
    ├── meta.json       # Session parameters and hardware attested ID
    ├── dialog.md       # Clean human-readable Markdown transcript
    ├── events.jsonl    # Raw append-only cryptographic event ledger
    └── LEDGER.sha256   # Cumulative Merkle root of the verified chain
```

*Generated deterministically by `templates/sync_triad.py`.*
