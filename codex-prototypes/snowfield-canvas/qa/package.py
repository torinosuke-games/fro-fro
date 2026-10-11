"""Package only the standalone runtime and handoff documents (no original art or QA screenshots)."""
from pathlib import Path
import hashlib
import json
import zipfile

root = Path(__file__).resolve().parent.parent
files = [root / name for name in ('index.html', 'style.css', 'field.js', 'README.md', 'REVIEW.md', 'ASSETS.md')]
files += sorted((root / 'assets').glob('*.webp'))
archive = root / 'snowfield-trial.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as bundle:
    for file in files:
        bundle.write(file, file.relative_to(root))
with zipfile.ZipFile(archive) as bundle:
    assert bundle.testzip() is None
    assert set(bundle.namelist()) == {str(file.relative_to(root)) for file in files}
report = {
    'base_commit': '1123b06ca3e8953c758ff16b463b3dbb06f84ad3',
    'existing_tracked_files': 'all SHA-256 hashes match the pre-work snapshot',
    'changed_scope': 'new files only in codex-prototypes/snowfield-canvas/',
    'runtime_files': [
        {'path': str(file.relative_to(root)), 'bytes': file.stat().st_size,
         'sha256': hashlib.sha256(file.read_bytes()).hexdigest()} for file in files
    ],
    'zip_bytes': archive.stat().st_size,
}
(root / 'qa' / 'delivery.json').write_text(json.dumps(report, ensure_ascii=False, indent=2))
print(f'Validated {archive.name}: {archive.stat().st_size:,} bytes / {len(files)} files')
