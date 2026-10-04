# coding: utf-8
"""Package the static index and only the assets it references."""
from pathlib import Path
import json,shutil,zipfile
ROOT=Path(__file__).resolve().parents[1]
OUT=Path.home()/'Downloads/MPS_초음파_GitHub'
OUT.mkdir(exist_ok=True)
shutil.copy2(ROOT/'index.html',OUT/'index.html')
shutil.copytree(ROOT/'originals',OUT/'originals',dirs_exist_ok=True)
v=json.loads((ROOT/'research/v2/visual.json').read_text())
keys=set(v['media'])|{p['file'] for d in v['docs'] for p in d['pages']}|{'mps-logo.png','median-1.jpg','median-F5.jpg','median-F7.jpg','median-F8.jpg'}
for key in keys:
 src=ROOT/'assets'/key
 if not src.exists():src=ROOT/'assets/v2'/key
 dst=OUT/src.relative_to(ROOT);dst.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(src,dst)
(OUT/'.nojekyll').touch()
README='''# MPS 초음파 진료가이드 · 질환 설명 / RUF 촬영 추가판

만든이: MPS 스포츠 교육팀

## 실행·업로드

index.html을 브라우저에서 엽니다. assets와 originals 폴더를 같은 위치에 유지하세요.
이 폴더 안의 내용을 GitHub 저장소 루트에 함께 업로드하면 됩니다.
HTML에 스크립트·스타일·학습 데이터가 포함되어 있으므로 별도 빌드 서버가 필요하지 않습니다.

## 이번 추가

- 기존 30단계 각각 2개씩, 질환·관련 소견 설명 모달 60개
- 정의 / 대표 증상 / 초음파와 연결할 점 / 문헌 출처
- 부위 목차와 검색 결과에서도 모달 열기
- 성장판 RUF 촬영 개요와 척골·요골·대퇴골 원위부 촬영 화면
- 부위별 실제 탐촉자 사진 3개, 초음파 참고 그림 1개
- 각 부위 표준 단면 반복 촬영 3장씩, 총 9장 안내
- 성장판 페이지에서 가이드 인쇄 시 RUF 촬영 내용 인쇄
- https://growthai-two.vercel.app/ 새 탭 연결 (사진 자동 전송 없음)

성장판 경로: index.html#ruf, #ruf/1, #ruf/2, #ruf/3

기존 30단계·90개 확인 항목·첨부 PDF 89쪽과 원본 14개는 유지했습니다.
사진은 assets 폴더에서 불러옵니다. 외부 문헌·Growth AI·인터넷 검색에는 인터넷이 필요합니다.
학습 진행률·타이머는 제거된 상태를 유지합니다. 관찰 기록은 현재 창 안에서만 유지됩니다.

## RUF 촬영안

척골 → 요골 → 대퇴골 순서입니다. 각 3장은 같은 표준 단면을 다시 잡은 반복 영상입니다.
총 9장은 요청된 촬영 구성으로, 국제적으로 정해진 서로 다른 9개 단면을 뜻하지 않습니다.
이 포털은 촬영 교육용입니다. 골연령·최종키 계산이나 외부 앱으로의 파일 전송은 하지 않습니다.
Growth AI는 의료진 계정 로그인 후 자료를 직접 입력하는 판독보조 도구입니다.

## 출처

질환 모달과 사진 확대 창, RUF의 근거·사진 출처 항목에서 확인할 수 있습니다.
교육용 자료이며 개별 환자의 진단·치료와 의료인의 판단을 대체하지 않습니다.
'''
(OUT/'README.md').write_text(README)
(ROOT/'읽어주세요.txt').write_text(README)
for name in ['MPS_초음파_GitHub.zip','MPS_초음파_GitHub_질환_RUF.zip']:
 with zipfile.ZipFile(OUT.parent/name,'w',zipfile.ZIP_DEFLATED) as z:
  for p in OUT.rglob('*'):
   if p.is_file():z.write(p,p.relative_to(OUT))
print('Packaged',len(keys),'images;', (OUT/'index.html').stat().st_size,'index bytes')
