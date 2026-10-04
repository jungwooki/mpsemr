"""Checks that the imported guide retains source assets and accurate figure links."""
import hashlib
import json
import unittest
from pathlib import Path
R = Path(__file__).resolve().parents[1] / 'ultrasound-guide'

class UltrasoundGuideTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads((R / 'data.json').read_text())
        cls.teaching = json.loads((R / 'teaching.json').read_text())

    def test_original_media_preserved(self):
        for path, digest in json.loads((R / 'source-manifest.json').read_text()).items():
            self.assertEqual(hashlib.sha256((R / path).read_bytes()).hexdigest(), digest, path)

    def test_all_runtime_assets_local_and_present(self):
        for key, value in self.data['assets'].items():
            self.assertFalse(value.startswith(('http:', 'https:', 'data:')), key)
            self.assertTrue((R / value).is_file(), value)
        for doc in self.data['visual']['docs']:
            self.assertTrue((R / 'originals' / doc['file']).is_file())
        self.assertEqual(sum(len(doc['pages']) for doc in self.data['visual']['docs']), 89)

    def test_each_step_has_explanations_and_laterality(self):
        count = 0
        for steps in self.data['visual']['steps'].values():
            self.assertEqual(len(steps), 5)
            for step in steps:
                images = [step['normal'], step['pathology']] + step.get('pathologyExtra', [])
                self.assertEqual(len(set(images)), len(images))
                for key in images:
                    note = self.teaching['images'][key]
                    self.assertTrue(note['why'])
                    self.assertTrue(note['laterality'])
                    self.assertIn(note['region'], self.teaching['glossary'])
                count += bool(step.get('pathologyExtra'))
        self.assertEqual(count, 25)

    def test_figure_identity_and_modality(self):
        steps = self.data['visual']['steps']
        key = steps['shoulder'][1]['pathology']
        self.assertIn('subscapularis', self.data['visual']['media'][key]['caption'])
        self.assertTrue(self.data['visual']['media'][key]['url'].endswith('#F13'))
        # The second knee figure is MRI-only and must not masquerade as ultrasound.
        self.assertNotIn('PMC10668946-verified-13.jpg', steps['knee'][3]['pathologyExtra'])
        self.assertIn('A·B: 왼쪽 정상', self.teaching['images']['PMC5621804-6.jpg']['laterality'])

    def test_build_and_navigation(self):
        html = (R / 'index.html').read_text()
        for name in ('data','app','visual','clinical','teaching','disclaimer','emr'):
            self.assertIn('src="'+name+'.js"', html)
        for name in ('data','teaching'):
            content=(R/(name+'.js')).read_text().split('=',1)[1].rstrip(';\n')
            self.assertEqual(json.loads(content),json.loads((R/(name+'.json')).read_text()))
        self.assertIn('ultrasound-guide/index.html', (R.parent/'index.html').read_text())
        self.assertIn('ultrasound-guide/index.html', (R.parent/'clinical-guide/index.html').read_text())

if __name__ == '__main__':
    unittest.main()
