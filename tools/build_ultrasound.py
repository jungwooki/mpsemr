"""Rebuild the static ultrasound guide without bundlers or external assets."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
r = ROOT / 'ultrasound-guide'
for name, const in [('data', 'DATA'), ('teaching', 'TEACHING')]:
    value = json.loads((r / (name + '.json')).read_text())
    (r / (name + '.js')).write_text('const ' + const + '=' + json.dumps(value, ensure_ascii=False, separators=(',', ':')) + ';\n')
disclaimer = (ROOT / 'src/shared/guide-disclaimer.html').read_text()
(r / 'disclaimer.js').write_text('const GUIDE_DISCLAIMER=' + json.dumps(disclaimer, ensure_ascii=False) + ';\n')
html = (r / 'template.html').read_text()
html = html.replace('<style>/* INLINE_CSS */</style>', ''.join('<link rel="stylesheet" href="' + x + '.css">' for x in ['style','visual','clinical','emr']))
html = html.replace('<script>/* INLINE_DATA */\n/* INLINE_APP */</script>', ''.join('<script src="' + x + '.js"></script>' for x in ['data','app','visual','clinical','teaching','disclaimer','emr']))
html = html.replace('MPS 초음파 진료가이드 | MPS 스포츠 교육팀','MPS 초음파가이드 · MPS EMR').replace('초음파 진료가이드</b>','초음파가이드</b>').replace('SPORTS ULTRASOUND · EDUCATION','MPS EMR · CLINICAL REFERENCE 06')
html = html.replace('</head>', '<link rel="stylesheet" href="../assets/guide-report-theme.css"></head>')
html = html.replace('<div class="header-actions">','<div class="header-actions"><a class="back-emr" href="../emr.html">← MPS EMR</a>')
html = html.replace('<aside id="sidebar">','<aside id="sidebar"><div class="workspace-links"><a href="../emr.html"><span>01</span>MPS차트</a><a href="../guides/index.html"><span>04</span>한의원 가이드</a><a href="../clinical-guide/index.html"><span>05</span>MPS 진료가이드</a><a href="#home" class="active"><span>06</span>MPS 초음파가이드</a></div>')
(r / 'index.html').write_text(html)
print('Built ultrasound guide: local assets, bilingual image notes, original features.')
