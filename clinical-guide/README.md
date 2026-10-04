# MPS 진료가이드

EMR 사이드바의 `환자 안내 → 05 MPS 진료가이드`에서 새 탭으로 엽니다. 추가 로그인 없이 읽을 수 있는 정적 참고자료이며 환자 DB를 읽거나 쓰지 않습니다.

- `content.jsx`: `mps_basecamp/resources/rnd/index.html`의 M 4개, P 7개, S 3개 가이드와 공통 주의사항을 추출한 내용입니다. 2026-10-05 사용자 요청으로 극단적인 부상·치료 단정을 완화했으며 HRV 경계값은 유지했습니다.
- `view.jsx`, `app.jsx`, `desktop.css`: PC 중심 화면, 분야 선택, 본문 검색, 목차 및 이전/다음 항목 이동.
- `samples/standard`: 베이스캠프의 스탠다드 12페이지 이미지 샘플과 다운로드 파일.
- `samples/2026mental2`, `samples/2026physical`, `samples/2026growth`: 기존 심화 HTML 샘플과 필요한 정적 자료. 멘탈 샘플의 별도 분석자료 연결은 통합 가이드의 세부 심리지표 항목으로 연결합니다.
- `source-manifest.json`: 원본 파일과 보존한 콘텐츠의 SHA-256. 원본은 수정하지 않습니다.

`python3 tools/build.py`가 앱과 이 가이드의 index.html을 함께 생성합니다. 생성 파일 직접 편집 대신 소스를 수정합니다. `python3 tools/build.py --check` 및 `python3 -m unittest discover -s tools -p 'test_*.py'`로 생성 결과와 원문 보존, 로컬 링크를 검증합니다.

면책 안내는 `src/shared/guide-disclaimer.html`에서 관리합니다. 원문의 모든 수치가 검증된 기준임을 의미하지 않습니다. 원본 rnd는 변경하지 않았습니다. React·Babel·Tailwind·아이콘은 원본처럼 CDN을 사용합니다.
