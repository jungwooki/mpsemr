from pathlib import Path
import json,base64,sys,html
sys.path.insert(0,str(Path(__file__).parent))
from enrichment import DETAILS
from clinical import DISEASES, SOURCES
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'research/protocol-data.json').read_text())
for id,rows in DETAILS.items():
 for step,row in zip(data[id]['steps'],rows):step['education']=dict(zip(['name','intro','technique','normal','abnormal','pitfall','record','query'],row))
refs={
'general':('ESSR · 근골격 초음파 기술 가이드','https://www.essr.org/subcommittees/ultrasound/'),
'shoulder':('어깨 초음파: 현재 개념과 전망 (2021)','https://pmc.ncbi.nlm.nih.gov/articles/PMC8264812/'),
'elbow':('팔꿈치 검사법·정상·병리 영상 (2007)','https://pmc.ncbi.nlm.nih.gov/articles/PMC3478702/'),
'hand_wrist':('손·손목 질환의 초음파 (2024)','https://pmc.ncbi.nlm.nih.gov/articles/PMC11680561/'),
'knee':('무릎 관절 초음파 (2009)','https://pmc.ncbi.nlm.nih.gov/articles/PMC3553228/'),
'hip':('성인 고관절 고해상도 초음파 (2023)','https://pmc.ncbi.nlm.nih.gov/articles/PMC10668929/'),
'ankle':('발목 초음파 해부학 (2014)','https://pmc.ncbi.nlm.nih.gov/articles/PMC4033724/'),
'nerve':('정중신경의 정상·변이 해부학 (2021)','https://pmc.ncbi.nlm.nih.gov/articles/PMC8678701/'),
'cts':('손목터널 초음파 진단의 발전 (2020)','https://pmc.ncbi.nlm.nih.gov/articles/PMC7460039/'),
'cts2':('손목터널 및 다른 부위의 정중신경 (2018)','https://pmc.ncbi.nlm.nih.gov/articles/PMC6032467/'),
'kneeLimit':('무릎 초음파의 적응증과 한계 (2007)','https://pubmed.ncbi.nlm.nih.gov/18095246/'),
'pain':('IASP · 통증 용어','https://www.iasp-pain.org/resources/terminology/'),
'chronic':('IASP · 만성통증 분류','https://www.iasp-pain.org/advocacy/definitions-of-chronic-pain-syndromes/'),
'finger':('손가락 초음파 (2016)','https://www.e-ultrasonography.org/upload/usg-15051.pdf'),
'anklePath':('발목관절 초음파 (2017)','https://www.e-ultrasonography.org/upload/usg-17008.pdf')}
normal={'shoulder':('극상근 정상 섬유와 탐촉자 방향','https://www.essr.org/content-essr/uploads/2016/10/shoulder.pdf#page=5','건의 연속성·표면·점액낭 층을 먼저 찾으세요.'),'elbow':('정상 총신근건 · Fig. 5',refs['elbow'][1]+'#fig5','외측상과 부착부와 건의 섬유를 확인하세요.'),'hand_wrist':('정상 정중신경 · Fig. 1',refs['nerve'][1]+'#fig1','수근관 입구와 출구의 신경 형태를 비교하세요.'),'knee':('정상 슬개상·슬개건 검사','https://www.essr.org/content-essr/uploads/2016/10/knee.pdf#page=2','관절 오목·건·골피질을 구분하세요.'),'hip':('정상 전방 관절 오목 · Fig. 1',refs['hip'][1]+'#j_jou.2023.0031_fig_001','관절낭과 대퇴골 경부 사이를 보세요.'),'ankle':('정상 전거비인대 · Fig. 14',refs['ankle'][1]+'#Fig14','외과와 거골 사이 연속되는 인대를 찾으세요.')}
path={'shoulder':('극상근 전층 파열 · Fig. 4',refs['shoulder'][1]+'#fig4','섬유 결손과 후퇴를 확인하세요.'),'elbow':('외측상과 건병증 · Fig. 11',refs['elbow'][1]+'#fig11','국소 에코와 섬유 배열 변화를 살펴보세요.'),'hand_wrist':('손목터널증후군 · Fig. 8',refs['cts2'][1]+'#F8','국소 팽대와 원위 편평화를 함께 보세요.'),'knee':('슬개건병증 · Fig. 1',refs['knee'][1]+'#fig1','건의 저에코 영역과 섬유 배열을 확인하세요.'),'hip':('고관절 삼출 · Fig. 6',refs['hip'][1]+'#j_jou.2023.0031_fig_006','정상 오목과 액체로 팽창한 공간을 비교하세요.'),'ankle':('인대·건 병리 영상 · 논문 PDF',refs['anklePath'][1],'인대 결손·건초액·주변 조직 변화를 찾아보세요.')}
assets={}
for f in [ROOT/'assets/mps-logo.png',ROOT/'assets/median-1.jpg',ROOT/'assets/median-F5.jpg',ROOT/'assets/median-F7.jpg',ROOT/'assets/median-F8.jpg']:
 assets[f.name]='data:image/'+('png' if f.suffix=='.png' else 'jpeg')+';base64,'+base64.b64encode(f.read_bytes()).decode()
visual=json.loads((ROOT/'research/v2/visual.json').read_text())
for key in set(visual['media'])|{p['file'] for d in visual['docs'] for p in d['pages']}:
 f=ROOT/'assets/v2'/key
 assets[key]='data:image/jpeg;base64,'+base64.b64encode(f.read_bytes()).decode()
bundle={'conditions':DISEASES,'clinicalSources':SOURCES,'visual':visual,'protocol':data,'references':refs,'normal':normal,'pathology':path,'assets':assets,'dropbox':json.loads((ROOT/'research/dropbox-reviewed.json').read_text())}
(ROOT/'data.js').write_text('const DATA = '+json.dumps(bundle,ensure_ascii=False)+';')
css=((ROOT/'style.css').read_text()+'\n'+(ROOT/'visual.css').read_text()+'\n'+(ROOT/'clinical.css').read_text()).replace('__PRINT_LOGO__',assets['mps-logo.png']);js=(ROOT/'app.js').read_text()+'\n'+(ROOT/'visual.js').read_text()+'\n'+(ROOT/'clinical.js').read_text();template=(ROOT/'template.html').read_text()
result=template.replace('/* INLINE_CSS */',css).replace('/* INLINE_DATA */',(ROOT/'data.js').read_text().replace('</script','<\\/script')).replace('/* INLINE_APP */',js)
sitebundle=dict(bundle)
sitebundle['assets']={key:('assets/'+key if (ROOT/'assets'/key).exists() else 'assets/v2/'+key) for key in assets}
sitecss=((ROOT/'style.css').read_text()+'\n'+(ROOT/'visual.css').read_text()+'\n'+(ROOT/'clinical.css').read_text()).replace('__PRINT_LOGO__','assets/mps-logo.png')
sitedata='const DATA = '+json.dumps(sitebundle,ensure_ascii=False)+';'
site=template.replace('/* INLINE_CSS */',sitecss).replace('/* INLINE_DATA */',sitedata.replace('</script','<\\/script')).replace('/* INLINE_APP */',js)
(ROOT/'index.html').write_text(site)
(ROOT/'MPS_초음파_진료가이드.html').write_text(result)
print('Built',len(result),'characters;',sum(len(x['steps']) for x in data.values()),'steps')
