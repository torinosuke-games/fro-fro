"""Package only the independent battle prototype and selected review screenshots."""
from pathlib import Path
import hashlib, json, subprocess, zipfile
root = Path(__file__).resolve().parents[1]
files = [root / p for p in ('index.html','style.css','data.js','battle.js','review.html','README.md','REVIEW.md','RESEARCH.md','ASSETS.md')]
files += sorted((root / 'assets').glob('*.webp'))
files += [root / 'qa' / f for f in ('phone-commands.png','phone-quiz.png','phone-review.png','landscape-quiz.png')]
results = json.loads((root / 'qa/results.json').read_text())
report = {'scope':'codex-prototypes/snow-battle/ only', 'baseCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip(), 'runtimeImageBytes':sum(p.stat().st_size for p in (root/'assets').glob('*.webp')), 'runtimeCodeBytes':sum((root/p).stat().st_size for p in ('index.html','style.css','data.js','battle.js')), 'automatedChecksPassed':len(results['checks']), 'layoutChecksPassed':len(json.loads((root/'qa/layout-results.json').read_text())['checks']), 'hardwareTested':False, 'files':{str(p.relative_to(root)):{'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in files}}
(root/'qa/delivery.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
archive = root/'snow-battle-trial.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
    for p in files: z.write(p,'snow-battle/'+str(p.relative_to(root)))
    z.write(root/'qa/results.json','snow-battle/qa/results.json')
    z.write(root/'qa/layout-results.json','snow-battle/qa/layout-results.json')
    z.write(root/'qa/delivery.json','snow-battle/qa/delivery.json')
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    assert all(p.startswith('snow-battle/') and '..' not in p for p in z.namelist())
print(json.dumps({'archive':str(archive),'bytes':archive.stat().st_size,'checksPassed':len(results['checks']),'runtimeImageBytes':report['runtimeImageBytes']},ensure_ascii=False))
