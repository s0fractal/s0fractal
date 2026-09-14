# DOC-F1: reuse the existing recorder, defer the catalog

The [retained observation and Warrant store export](doc-f1.json) connect a real
Black-Heart regression run to the existing Warrant approval recorder. This is
an operator-recorded execution, not another preregistered study or a new receipt
protocol. No catalog or publishing gate was built: no independent recipient has
yet shown a need for one.

## Existing responsibilities

Black-Heart `experience.py` at `22b47532776d8956ecec3c69e5e55189775baa64`
explicitly reports byte verification separately from authentication, replay and
advice acceptance. Warrant's `integrations/approval/warrant_approval.py` at
`2b1c534d79fd975cd2102ee312ec68ed7c99cb07` already records a signed request and
accept/reject under a policy. Its recorder does not execute or enforce a decision.
Reimplementing either contract would add machinery without a new consumer.

## Observed run and filing

Four files were read from Black-Heart commit
`befcb4adfd1af26c18237a933e1817f9899142a2`: `test_empirical_settlement.py`,
`warrant_kernel.py`, `glyph.py`, `crypto.py`. Each digest was checked against the
existing DOC-F1 experience packet. They were copied into a fresh temporary source
directory. An isolated Python interpreter explicitly added that directory and
ran the fixed `test_empirical_settlement` unittest module: **10 tests, exit 0**.
No command was taken from record-supplied argv. This executes reviewed Python
with operator privileges; isolated Python is not an OS sandbox.

The observation includes all four digests, Python version and stdout/stderr.
Warrant stored its exact JSON bytes as an evidence blob on the request. The
accept references that request and names the observation digest in its reason.
Acceptance records the observation, not general correctness. A future failed
run could likewise be recorded without pretending it passed.

Both records use **one ephemeral key and one operator**:
`sanction_independent: false`. Base verification reports 2 records, 0 errors and
2 identity-binding warnings (no keyring). No executable Warrant check or
settlement-grade claim was added. The key was not exported. No stable issuer,
Black-Heart institutional endorsement or external custody is established.

## Verify the exported store

From the profile repository root, restore the five store files into a fresh
operator-chosen directory and use the existing Warrant verifier:

```sh
python3 - <<'PY'
import base64, json, pathlib, tempfile
r = json.loads(pathlib.Path('experiments/endorsement-1/doc-f1.json').read_text())
root = pathlib.Path(tempfile.mkdtemp(prefix='doc-f1-store-', dir=pathlib.Path.home()))
for name, data in r['store_files_base64'].items():
    rel = pathlib.PurePosixPath(name)
    if rel.is_absolute() or '..' in rel.parts or len(rel.parts) != 2 or rel.parts[0] not in ('blobs', 'records'):
        raise ValueError('unexpected export path')
    target = root / rel
    target.parent.mkdir(exist_ok=True)
    with target.open('xb') as f:
        f.write(base64.b64decode(data, validate=True))
print(root)
PY
# Substitute the printed directory; use Warrant at the commit named above.
python3 ../warrant/impl/warrant.py --store RESTORED_DIRECTORY verify --store-mode --json
```

Operator readback restored the export and obtained the exact saved verify report.
Appending bytes to the observation evidence blob made verification fail with one
error. This is a check of evidence integrity. The verifier does not replay Python
or establish that the claimed execution happened. The earlier replay command is
also documented in Black-Heart's original DOC-F1 README; compare test names and
outcomes, not timing bytes. Original DOC-F1 and prior experiment files are intact.

## Decision

Reuse Warrant for signed recording and Black-Heart for the fixed regression.
Do not add a separate approval format or catalog. A real consumer must first name
what decision a trusted receipt would change. This record demonstrates composition,
not external demand or a reason to deploy a signing service.
