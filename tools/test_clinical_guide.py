"""Verify complete RND content preservation and portable report sample links."""
import hashlib,json,re,unittest
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
class ClinicalGuideTests(unittest.TestCase):
 def test_original_content_intact(self):
  guide=ROOT/'clinical-guide';manifest=json.loads((guide/'source-manifest.json').read_text());data=(guide/'content.jsx').read_bytes()
  self.assertEqual(hashlib.sha256(data).hexdigest(),manifest.get('currentContentSha256',manifest['preservedDataSha256']))
  self.assertEqual(len(re.findall(r"id: '",data.decode())),15)
  self.assertNotIn('const Login', (guide/'index.html').read_text())
  original=ROOT.parent/manifest['source']
  if original.exists():self.assertEqual(hashlib.sha256(original.read_bytes()).hexdigest(),manifest['sha256'])
 def test_sample_dependencies(self):
  for page in (ROOT/'clinical-guide/samples').rglob('*.html'):
   for link in re.findall(r'''(?:src|href)=["']([^"']+)''',page.read_text()):
    if link.startswith(('data:','http','#','${','javascript:','mailto:')):continue
    self.assertTrue((page.parent/link.split('#')[0].split('?')[0]).exists(),(page,link))
 def test_emr_navigation(self):
  shell=(ROOT/'src/views/clinical-shell.html').read_text()
  self.assertLess(shell.index('04</span>'),shell.index('05</span> MPS 진료가이드'))
  self.assertIn('clinical-guide/index.html',shell)
