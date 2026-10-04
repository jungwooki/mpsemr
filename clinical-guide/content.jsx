    // ==========================================
    // 공통 주의사항 데이터 (VUNO 참고 변형 - 메인 화면 하단 고정용)
    // ==========================================
    const precautionData = {
      id: 'general-precautions',
      icon: 'alert-triangle',
      title: '의료진 사용 시 주의 및 경고 사항',
      subtitle: 'MPS 리포트 활용에 대한 임상적 주의사항',
      content: (
        <div className="modal-prose text-left">
          <h4><Icon name="info" size={18} className="text-slate-600"/> 가. 일반적 주의</h4>
          <ul className="text-[12px] space-y-1">
            <li>본 소프트웨어(MPS REPORT)는 <b>의료인의 진단을 보조하기 위한 참고용 데이터 시각화 프로그램</b>으로, 본 리포트에만 의지하여 진단, 치료 등 환자의 건강에 영향을 미칠 수 있는 결정을 내리는 경우 오진 가능성을 배제할 수 없습니다.</li>
            <li>의료진은 환자의 다른 임상정보(문진, 맥진, 망진 등)를 포함하여 체계적인 검토와 분석을 통해 <b>최종 변증(辨證) 및 처방을 판단</b>해야 합니다.</li>
            <li>의학적으로 잘 훈련된 한의사 및 관련 의료진이 사용하여야 합니다.</li>
          </ul>

          <h4><Icon name="x-circle" size={18} className="text-slate-600"/> [측정 불가/오류(Ungradable) 주의 사례]</h4>
          <p className="text-[12px]">다음과 같은 상황에서는 데이터에 심각한 오차가 발생할 수 있으므로 재측정 및 주의가 필요합니다.</p>
          <ul className="text-[12px] bg-slate-50 p-3 rounded-lg border border-slate-200">
            <li><b>자율신경(HRV):</b> 측정 중 환자가 심하게 움직이거나 말을 한 경우, 센서 접촉 불량.</li>
            <li><b>체성분(ECW):</b> 환자 몸에 금속 물질이 남아있거나, 식사 직후/격렬한 운동 직후에 측정한 경우.</li>
            <li><b>초음파(USG):</b> 초음파 젤이 부족하여 공기층이 섞인 영상, 프로브의 각도가 정면이 아닌 대각선으로 빗나간 경우, 주요 판독 영역(건 부착부 등)이 짤린 경우.</li>
          </ul>

          <h4><Icon name="alert-octagon" size={18} className="text-red-600"/> 나. 경고 사항</h4>
          <div className="km-box warning">
            <ul className="text-[12px] !mb-0 text-red-900">
              <li><b>측정 및 분석 결과는 반드시 주치의(한의사)의 최종 판단을 필요로 합니다.</b></li>
              <li>최종 진단 및 부모 상담 시, 리포트의 수치적 데이터와 <b>환자의 실제 임상 증상(통증, 피로 호소 등)</b>을 신중히 비교 및 대조하여야 합니다.</li>
            </ul>
          </div>
        </div>
      )
    };

    // ==========================================
    // DATA 1: M-REPORT (Mental Performance)
    // ==========================================
    const mGuideData = [
      {
        id: 'm-overview',
        icon: 'brain',
        title: 'M-REPORT 개요 및 총평 (MGI)',
        subtitle: 'MGI 척도 해석 및 한의학적 멘탈 접근법',
        content: (
          <div className="modal-prose">
            <h4><Icon name="info" size={18} className="text-mental-600"/> M-REPORT 목적</h4>
            <p>
              M-REPORT는 PCDEQ(Psychological Characteristics of Developing Excellence Questionnaire) 모델을 기반으로 성장기 엘리트 선수의 심리 기술과 태도를 평가합니다. 이는 '성격 테스트'가 아니라, <b>훈련과 경기를 대하는 현재의 심리적 기술 수준</b>을 보여주는 지도입니다.
            </p>
            
            <h4><Icon name="bar-chart-2" size={18} className="text-mental-600"/> MGI (Mental Growth Index) 해석 기준</h4>
            <p>전체 13개 지표의 평균 종합 점수(6.0 만점)입니다.</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2"><span className="px-2 py-1 bg-mental-100 text-mental-700 text-[10px] font-bold rounded">4.8 이상</span> <span className="text-sm font-bold">강점 (매우 탄탄함)</span></div>
              <div className="flex items-center gap-2"><span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">4.2 ~ 4.7</span> <span className="text-sm font-bold">양호 (안정적 구간)</span></div>
              <div className="flex items-center gap-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded">3.6 ~ 4.1</span> <span className="text-sm font-bold">보통 (강점/보완점 혼재)</span></div>
              <div className="flex items-center gap-2"><span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded">3.5 이하</span> <span className="text-sm font-bold">주의 (에너지 고갈, 멘탈 지지 필요)</span></div>
            </div>

            <h4><Icon name="activity" size={18} className="text-mental-600"/> 스포츠 한의학적 관점 (심신일여)</h4>
            <div className="km-box mental">
              <p className="font-bold text-mental-800 text-sm mb-1">한의학에서는 멘탈과 피지컬을 하나로 봅니다 (心身一여).</p>
              <ul className="!mb-0 text-[12px] space-y-1">
                <li><b>심담허겁(心膽虛怯):</b> 수행 불안, 과도한 긴장, 실전에서 제 실력을 못 냄. (경기 전 복통, 불면 동반)</li>
                <li><b>간기울결(肝氣鬱結):</b> 실수 후 회복력 저하, 잦은 자책, 분노 조절 어려움. (가슴 답답함, 한숨 동반)</li>
                <li><b>심비양허(心脾兩虛):</b> 집중력 저하, 무기력, 훈련 태도 저하. 체력(기허)이 떨어지면서 뇌로 가는 혈류가 부족해짐.</li>
              </ul>
              <p className="text-[11px] text-mental-700 mt-2 font-medium">※ M-REPORT의 낮은 점수는 단순한 '의지 부족'이 아니라 <b>기혈(氣血)의 불균형 상태</b>임을 부모님께 인지시키고 침/약침/한약 치료의 당위성을 설명합니다.</p>
            </div>
          </div>
        )
      },
      {
        id: 'm-core5',
        icon: 'target',
        title: '5대 핵심 멘탈지수 정밀 판독',
        subtitle: '경기 긴장 관리, 회복력 등 코어 지표 분석',
        content: (
          <div className="modal-prose">
            <p>경기의 성패를 좌우하는 가장 핵심적인 5가지 요인입니다. 3.5점 이하일 경우 즉각적인 개입이 필요합니다.</p>
            
            <div className="border-l-4 border-mental-500 pl-3 mb-4">
              <h4 className="!mt-0 !mb-1 text-[15px]">1. 경기 긴장 관리 (수행 불안)</h4>
              <p className="!mb-1">압박 상황에서도 평정심을 유지하는 힘. 낮을 경우 큰 경기에서 실수가 급증합니다.</p>
              <div className="text-[11px] bg-slate-50 p-2 rounded leading-relaxed">
                <b>강화:</b> 자신만의 루틴 만들기 (예: 입장 전 심호흡 3번), 불안을 긍정적 흥분으로 재해석하기.<br/>
                <b>처방:</b> 온담탕(溫膽湯), 청심환 류 (심담허겁 치료)
              </div>
            </div>

            <div className="border-l-4 border-mental-500 pl-3 mb-4">
              <h4 className="!mt-0 !mb-1 text-[15px]">2. 실수 후 회복력</h4>
              <p className="!mb-1">실수 뒤 감정에 머물지 않고 즉시 다음 플레이로 돌아오는 힘입니다.</p>
              <div className="text-[11px] bg-slate-50 p-2 rounded leading-relaxed">
                <b>강화:</b> '멘탈 셧다운(Shutdown)' 훈련. 실수 직후 손뼉을 치거나 특정 단어("다음 공!")를 외쳐 상황을 강제 종료시킴.<br/>
                <b>처방:</b> 소요산(逍遙散), 시호가용골모려탕 (울결된 간기를 소통)
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-3 mb-4">
              <h4 className="!mt-0 !mb-1 text-[15px]">3. 집중 자기조절력</h4>
              <p className="!mb-1">감정과 충동이 흔들릴 때 본래 전술과 포지션에 집중하는 통제력입니다.</p>
              <div className="text-[11px] bg-slate-50 p-2 rounded leading-relaxed">
                <b>강화:</b> 3초 호흡법, 화가 날 때 스스로에게 "지금 내 포지션 롤은?" 질문하기.<br/>
                <b>처방:</b> 귀비탕(歸脾湯), 총명탕 류 (심비양허 보완 및 인지기능 개선)
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-3 mb-4">
              <h4 className="!mt-0 !mb-1 text-[15px]">4. 경기 준비 능력</h4>
              <p className="!mb-1">목표 설정과 시뮬레이션(루틴) 능력입니다. 체계적인 선수는 이 지표가 높습니다.</p>
              <div className="text-[11px] bg-slate-50 p-2 rounded leading-relaxed">
                <b>강화:</b> 경기 전날 장비 챙기기, 수면 시간 지키기 등 본인만의 체크리스트 작성.
              </div>
            </div>

            <div className="border-l-4 border-slate-300 pl-3 mb-4">
              <h4 className="!mt-0 !mb-1 text-[15px]">5. 주변 지원 환경</h4>
              <p className="!mb-1">코치, 부모 등과의 소통 능력 및 긍정적 피드백 수용력입니다.</p>
              <div className="text-[11px] bg-slate-50 p-2 rounded leading-relaxed">
                <b>가이드:</b> 이는 아이 본인보다 <b>부모/지도자의 태도</b>에 크게 좌우됩니다. 결과보다 과정을 칭찬하는 가정 환경이 필수적입니다.
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'm-detail8',
        icon: 'layers',
        title: '8대 세부 심리지표 분석',
        subtitle: '심상 훈련, 평가 독립성, 실패 회복력 등',
        content: (
          <div className="modal-prose">
            <p>훈련과 실전에서 발현되는 구체적인 심리 기술입니다. 약점 지표 파악 후 맞춤형 코칭을 제공합니다.</p>

            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="font-bold text-sm text-slate-800 mb-1">1. 경기 안정성 & 2. 심리 안정성</div>
                <p className="text-[11px] text-slate-600 mb-1">경기 흐름(템포, 벤치 분위기, 실점)이 불리해질 때 무너지지 않는 능력.</p>
                <p className="text-[11px] text-mental-600 font-bold">코칭: 경기 전 '불안 시 대처 행동 1가지' 미리 정해두기.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="font-bold text-sm text-slate-800 mb-1">3. 평가 독립성</div>
                <p className="text-[11px] text-slate-600 mb-1">코치나 부모, 관중의 반응에 흔들리지 않고 내 플레이를 유지하는 능력. (요즘 유소년들에게 가장 취약한 지표)</p>
                <p className="text-[11px] text-mental-600 font-bold">코칭: 벤치나 부모님석 쳐다보지 않기 루틴. 스스로 '오늘의 미션' 평가하기.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="font-bold text-sm text-slate-800 mb-1">4. 자기조절 학습 & 5. 훈련 태도</div>
                <p className="text-[11px] text-slate-600 mb-1">스스로 약점을 분석하고 훈련에 몰입하는 성실성 지표.</p>
                <p className="text-[11px] text-mental-600 font-bold">코칭: 매 훈련 직후 "오늘 배운 것 1줄 노트 쓰기" 지도.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="font-bold text-sm text-slate-800 mb-1">6. 심상 훈련 활용</div>
                <p className="text-[11px] text-slate-600 mb-1">이미지 트레이닝을 실전에 활용하는 기술. 높은 선수는 창의성이 뛰어남.</p>
                <p className="text-[11px] text-mental-600 font-bold">코칭: 자기 전 성공했던 플레이 3번 반복해서 상상하기.</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm">
                <div className="font-bold text-sm text-slate-800 mb-1">7. 주위 적응력 & 8. 실패 회복력(Resilience)</div>
                <p className="text-[11px] text-slate-600 mb-1">포지션 변경, 거대한 실책 등 위기 상황에서 팀의 중심으로 복귀하는 강인함.</p>
                <p className="text-[11px] text-mental-600 font-bold">코칭: 실패를 성장을 위한 '데이터베이스'로 객관화하는 훈련. "왜 틀렸어?"가 아닌 "어떻게 바꿀까?" 질문하기.</p>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'm-parents',
        icon: 'users',
        title: '보호자 상담 가이드 (Do & Don\'t)',
        subtitle: '부모님의 언어가 선수의 멘탈을 만듭니다',
        content: (
          <div className="modal-prose">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 shadow-sm">
              <h4 className="!mt-0 flex items-center gap-2 text-blue-800"><Icon name="message-circle" size={18}/> 이렇게 말해 주세요 (DO)</h4>
              <ul className="text-blue-900 !mb-0 text-[12px] leading-relaxed">
                <li>"결과랑 상관없이 오늘 끝까지 뛰어준 모습이 정말 멋졌어."</li>
                <li>"아까 그 상황에서 넌 어떤 생각이 들었어? (평가 없이 경청)"</li>
                <li>"오늘 경기에서 스스로 제일 칭찬해주고 싶은 장면 하나만 말해볼까?"</li>
                <li>"지금은 배우는 과정이니까 실수해도 괜찮아. 다음엔 어떻게 해볼지 생각해보자."</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
              <h4 className="!mt-0 flex items-center gap-2 text-red-800"><Icon name="slash" size={18}/> 이런 반응은 줄여 주세요 (DON'T)</h4>
              <ul className="text-red-900 !mb-0 text-[12px] leading-relaxed">
                <li>"아까 거기서 왜 패스를 안 하고 슈팅을 했어?" (귀가하는 차 안에서 복기 금지)</li>
                <li>"너는 왜 항상 중요한 순간에 멘탈이 흔들려?" (성격으로 규정짓기)</li>
                <li>"저쪽 팀 누구누구는 1학년인데도 너보다 잘 뛰더라." (비교하기)</li>
                <li>아이가 실수했을 때 부모님석에서 깊은 한숨 쉬거나 고개 젓기. (아이는 부모님의 바디랭귀지를 귀신같이 읽습니다.)</li>
              </ul>
            </div>
          </div>
        )
      }
    ];

    // ==========================================
    // DATA 2: P-REPORT (Physical & Physio)
    // ==========================================
    const pGuideData = [
      {
        id: 'p-overview',
        icon: 'activity',
        title: 'P-REPORT 개요 및 총평 (Risk Index)',
        subtitle: '자율신경과 성장 가중치를 더한 손상 예측 모델',
        content: (
          <div className="modal-prose">
            <h4><Icon name="info" size={18} className="text-physio-600"/> P-REPORT 목적</h4>
            <p>
              P-REPORT는 선수의 <b>자율신경계(HRV), 체성분(ECW), 초음파(USG) 데이터</b>를 종합하여 오버트레이닝(OTS), 스포츠 에너지 결핍(RED-S), 비접촉성 근골격계 손상을 <b>사전에 예측하고 예방</b>하는 메디컬 리포트입니다.
            </p>

            <h4><Icon name="alert-triangle" size={18} className="text-physio-600"/> Growth Risk Index (종합 부상위험도)</h4>
            <p>자율신경의 피로도 점수(OTS)에 <b>급성장기(PHV) 취약성 가중치</b>를 적용하여 매우 보수적이고 예민한 손상 예측 모델을 제공합니다.</p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-3 text-xs text-slate-700">
              <b>[Soft Cap 시스템 적용]</b><br/>
              부모님과 선수의 심리적 공포감을 줄이기 위해 <b>절대 점수가 95.8점을 넘지 않도록 제한</b>되어 있으며, 80점 초과 시 점수 상승폭이 둔화되도록 설계되었습니다.
            </div>
            <ul className="text-[12px]">
              <li><b className="text-red-600">50점 이상 (위험):</b> 훈련 부담과 회복 상태를 우선 확인하는 구간입니다. 다른 지표와 증상을 함께 검토하여 훈련 강도 조절을 고려합니다. 점수는 실제 부상 발생 확률을 뜻하지 않습니다.</li>
              <li><b className="text-yellow-600">25~49점 (주의):</b> 컨디셔닝 우선. 고강도 훈련 자제.</li>
              <li><b className="text-green-600">24점 이하 (양호):</b> 최적의 훈련 소화 가능 상태.</li>
            </ul>

            <h4><Icon name="heart-pulse" size={18} className="text-physio-600"/> 스포츠 한의학적 관점 (미병과 기혈양허)</h4>
            <div className="km-box physio">
              <p className="font-bold text-physio-800 text-sm mb-1">인대가 파열되기 전, 기혈(氣血)의 고갈이 먼저 옵니다.</p>
              <ul className="!mb-0 text-[12px] space-y-1">
                <li><b>허로(虛勞):</b> OTS(과부하)의 한의학적 명칭. 쉴 틈 없는 훈련으로 진액(음)이 마르고 기가 고갈된 상태.</li>
                <li><b>습담(濕痰)과 어혈(瘀血):</b> ECW(세포외수분비) 수치가 높고 초음파상 붓기가 관찰될 때. 찌꺼기가 혈관과 근막을 막아 통증과 유착을 유발함. 치료 필요성과 방법은 증상 및 평가 결과에 따라 의료진이 개별적으로 판단합니다.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 'p-phv',
        icon: 'trending-up',
        title: '1. 성장단계(PHV) 평가 기준 및 가중치',
        subtitle: '부상 가중치를 결정하는 핵심 변수',
        content: (
          <div className="modal-prose">
            <p>
              유소년 선수는 뼈가 먼저 자라고 근육/인대가 나중에 늘어나는 특성상, 급성장기(PHV)에 관절 장력이 극대화되어 훈련 부하와 신체 변화에 대한 주의가 필요할 수 있습니다. <b>P-REPORT는 PHV 단계에 따라 부상 위험도 점수에 가중치를 부여합니다.</b>
            </p>
            
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-4 shadow-sm">
              <table className="w-full text-left text-[11px] sm:text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b">
                  <tr><th className="p-2.5">단계</th><th className="p-2.5">설명</th><th className="p-2.5">위험 가중치</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="p-2.5 font-bold">PHV -2</td><td className="p-2.5">성장기 이전 (안정기)</td><td className="p-2.5 text-green-600 font-bold">x 0.9 (감소)</td></tr>
                  <tr><td className="p-2.5 font-bold">PHV -1</td><td className="p-2.5">성장 가속 시작</td><td className="p-2.5 text-slate-600">x 1.0 (기본)</td></tr>
                  <tr className="bg-red-50"><td className="p-2.5 font-bold text-red-600">PHV 0</td><td className="p-2.5 text-red-800 font-medium">최대 급성장기 (위험구간)</td><td className="p-2.5 font-extrabold text-red-600">x 1.35 (추가 확인)</td></tr>
                  <tr className="bg-yellow-50"><td className="p-2.5 font-bold text-yellow-700">PHV 1</td><td className="p-2.5 text-yellow-800">성장 둔화기</td><td className="p-2.5 font-bold text-yellow-600">x 1.15 (주의)</td></tr>
                  <tr><td className="p-2.5 font-bold">PHV 2</td><td className="p-2.5">성장 종료 단계</td><td className="p-2.5 text-slate-600">x 1.0 (기본)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="text-[11px] bg-slate-50 p-3 rounded text-slate-600 border border-slate-100">
              * 문진 시 최근 3~6개월간의 키 성장 속도와 오스굿씨, 세버씨 병 등의 성장통 호소 여부를 파악하여 PHV 0 또는 1 단계를 설정하십시오.
            </div>
          </div>
        )
      },
      {
        id: 'p-hrv-core',
        icon: 'cpu',
        title: '2. 자율신경 2축 & 4사분면 정밀 분석',
        subtitle: 'SDNN(체력) vs RMSSD(회복력) 기준 완화 반영',
        content: (
          <div className="modal-prose">
            <p className="text-[11px] text-physio-700 font-bold bg-physio-50 p-2 rounded border border-physio-100 mb-3">
              ※ 유소년 선수의 특성을 고려하여 성인 기준보다 완화된 컷오프(SDNN 50, RMSSD 40)를 적용합니다.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="border border-slate-200 rounded-lg p-3 shadow-sm bg-white">
                <div className="text-[11px] font-bold text-slate-500 mb-1">X축 (만성 탄력성)</div>
                <div className="font-extrabold text-slate-800 text-[15px] border-b pb-1 mb-1">SDNN</div>
                <ul className="text-[11px] text-slate-600 space-y-1 !mb-0 !pl-0">
                  <li className="!before:hidden !pl-0"><span className="text-green-500 font-bold">50 이상:</span> 양호</li>
                  <li className="!before:hidden !pl-0"><span className="text-yellow-500 font-bold">30~49:</span> 주의</li>
                  <li className="!before:hidden !pl-0"><span className="text-red-500 font-bold">30 미만:</span> 위험 (기허, 허로)</li>
                </ul>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 shadow-sm bg-white">
                <div className="text-[11px] font-bold text-slate-500 mb-1">Y축 (급성 회복력)</div>
                <div className="font-extrabold text-slate-800 text-[15px] border-b pb-1 mb-1">RMSSD</div>
                <ul className="text-[11px] text-slate-600 space-y-1 !mb-0 !pl-0">
                  <li className="!before:hidden !pl-0"><span className="text-green-500 font-bold">40 이상:</span> 양호</li>
                  <li className="!before:hidden !pl-0"><span className="text-yellow-500 font-bold">20~39:</span> 주의</li>
                  <li className="!before:hidden !pl-0"><span className="text-red-500 font-bold">20 미만:</span> 위험 (음허)</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-3 mb-4 rounded-r-lg shadow-sm">
              <h4 className="!mt-0 !mb-1 text-red-800 text-[13px] flex items-center gap-1"><Icon name="siren" size={16}/> [경고] 과반응 (Hyper-responsive)</h4>
              <p className="text-[11px] text-red-800 !mb-1 font-bold">RMSSD &ge; 130 또는 SDNN &ge; 131</p>
              <p className="text-[11px] text-red-700 leading-relaxed">
                높은 HRV 수치만으로 회복 상태가 좋거나 나쁘다고 단정할 수 없습니다. <b>개인의 평소 범위를 크게 벗어난 값이 지속되고 피로 또는 수행능력 저하가 동반된다면, 훈련 부담과 회복 상태를 재확인해 주세요.</b> 측정 조건과 신호 품질을 확인하고, 수면·주관적 피로·최근 훈련량을 함께 살펴 훈련 강도 조절이나 휴식을 검토합니다. 이 수치만으로 특정 근육·인대 손상이나 부상 확률을 판단하지 않습니다.
              </p>
            </div>

            <h4 className="text-[14px]">4사분면(Quadrant) 진단 가이드 (중심축 50/40)</h4>
            <div className="space-y-2">
              <div className="bg-green-50 p-2.5 rounded border border-green-200 text-[11px] shadow-sm">
                <b className="text-green-700 block mb-0.5">Q1 (최상위 컨디션): SDNN 50↑, RMSSD 40↑</b>
                두 지표가 MPS 기준 범위에 해당합니다. 실제 훈련 수행 가능 여부는 최근 훈련량, 피로감, 통증 및 수행능력을 함께 확인합니다.
              </div>
              <div className="bg-blue-50 p-2.5 rounded border border-blue-200 text-[11px] shadow-sm">
                <b className="text-blue-700 block mb-0.5">Q2 (일시적 피로): SDNN 50↑, RMSSD 40↓</b>
                두 지표의 반응이 다르게 나타납니다. 최근 훈련과 수면, 개인 기준선 대비 변화를 확인하고 회복 중심의 훈련이 필요한지 검토합니다.
              </div>
              <div className="bg-orange-50 p-2.5 rounded border border-orange-200 text-[11px] shadow-sm">
                <b className="text-orange-700 block mb-0.5">Q3 (만성 피로/주의): SDNN 50↓, RMSSD 40↑</b>
                두 지표의 반응이 다르게 나타납니다. 단일 측정으로 만성 피로나 체력 저하를 확정하지 않고, 개인 기준선·피로감·수행능력의 추이를 함께 확인합니다.
              </div>
              <div className="bg-slate-100 p-2.5 rounded border border-slate-300 text-[11px] shadow-sm">
                <b className="text-slate-700 block mb-0.5">Q4 (체력 고갈/위험): SDNN 50↓, RMSSD 40↓</b>
                두 지표가 MPS 기준보다 낮습니다. 재측정과 상태 확인 후 훈련 부하 조절 및 회복 시간을 검토합니다. 불편 증상이 지속되면 의료진의 평가를 받습니다.
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'p-hrv-sub',
        icon: 'activity-square',
        title: '3. 자율신경 보조 지표 (LF, HF, Ratio)',
        subtitle: '교감신경의 과열과 부교감신경의 번아웃',
        content: (
          <div className="modal-prose">
            <ul className="space-y-4">
              <li className="!pl-0 !before:hidden">
                <div className="border-l-4 border-physio-400 pl-3">
                  <div className="font-bold text-slate-800 text-[14px]">LF (교감신경 / 액셀러레이터)</div>
                  <div className="text-[11px] text-slate-600 mb-1">에너지 소모, 긴장, 흥분. (정상: 2.5 ~ 6.5 nu)</div>
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <b className="text-red-600 block mb-0.5">&gt; 8.0 (과열):</b> 극도의 긴장, 분노, 스트레스. 부상위험 증가. (심화항성. 근육 경직 심화)<br/>
                    <b className="text-blue-600 block mt-1 mb-0.5">&lt; 2.5 (번아웃):</b> 교감신경조차 작동하지 않는 무기력, 만성 피로 상태.
                  </div>
                </div>
              </li>
              <li className="!pl-0 !before:hidden">
                <div className="border-l-4 border-green-400 pl-3">
                  <div className="font-bold text-slate-800 text-[14px]">HF (부교감신경 / 브레이크)</div>
                  <div className="text-[11px] text-slate-600 mb-1">휴식, 수면의 질, 회복력. (정상: 4.5 이상)</div>
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <b className="text-green-600 block mb-0.5">&ge; 4.5:</b> 회복 기능 정상 작동.<br/>
                    <b className="text-red-600 block mt-1 mb-0.5">&lt; 3.0 (회복 불가):</b> 수면의 질 최악, 근육에 쌓인 젖산과 염증 미청소 (음허).
                  </div>
                </div>
              </li>
              <li className="!pl-0 !before:hidden">
                <div className="border-l-4 border-purple-400 pl-3">
                  <div className="font-bold text-slate-800 text-[14px]">LF/HF Ratio (자율신경 균형)</div>
                  <div className="text-[11px] text-slate-600 mb-1">정상: 0.9 ~ 2.9</div>
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <b className="text-red-600 block mb-0.5">&gt; 4.0:</b> 심각한 교감 우위. 불면, 가슴 두근거림. 과긴장 지속. (수승화강 실패, 음허화동)<br/>
                    <b className="text-blue-600 block mt-1 mb-0.5">&lt; 0.5:</b> 심각한 부교감 우위. 우울, 무기력, 소화불량 동반.
                  </div>
                </div>
              </li>
              <li className="!pl-0 !before:hidden">
                <div className="border-l-4 border-orange-400 pl-3">
                  <div className="font-bold text-slate-800 text-[14px]">종합 스트레스 지수 (유비오점수)</div>
                  <div className="text-[11px] text-slate-600 mb-1">육체적/정신적 부하 종합. (정상: 35 미만)</div>
                  <div className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                    <b className="text-yellow-600 block mb-0.5">35 ~ 45:</b> 주의 구간<br/>
                    <b className="text-red-600 block mt-1 mb-0.5">&gt; 45:</b> 위험 구간 (OTS 과부하 점수에 페널티로 가중됨)
                  </div>
                </div>
              </li>
            </ul>
          </div>
        )
      },
      {
        id: 'p-body-comp',
        icon: 'droplets',
        title: '4. 체성분(ECW)과 5. 초음파(USG) 판독',
        subtitle: '염증, 부종, 어혈의 객관적 확인 및 구조적 손상',
        content: (
          <div className="modal-prose">
            <h4><Icon name="activity" size={18} className="text-physio-600"/> ECW-Ratio (세포외수분비) - 염증과 부종</h4>
            <p>
              근육과 세포 밖의 수분 비율입니다. 이 수치가 높다는 것은 훈련 후 발생한 근육의 미세 손상이 회복되지 못하고 <b>만성 염증과 붓기(어혈, 습담)</b>로 정체되어 있음을 뜻하는 가장 강력한 지표입니다.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4 shadow-sm">
              <ul className="!mb-0 text-[11px] space-y-1">
                <li><span className="font-bold text-green-600">0.385 이하:</span> 매우 클린한 상태. 염증 없음.</li>
                <li><span className="font-bold text-yellow-600">0.386 ~ 0.390:</span> 주의. 수분 상태와 동반 증상을 확인하며, 수치만으로 국소 염증을 확정하지 않습니다.</li>
                <li><span className="font-bold text-red-600">0.390 초과:</span> <b>추가 확인 (수분 상태·부종 여부 평가)</b>. 해당 수치만으로 특정 치료의 필요성을 결정하지 않습니다.</li>
              </ul>
            </div>

            <h4><Icon name="flame" size={18} className="text-physio-600"/> 체지방률 (Body Fat %) - 에너지 저장고</h4>
            <p>
              극단적인 저지방은 성장을 저해하고 <b>RED-S(스포츠 에너지 결핍증)</b>를 유발하여 골밀도 저하와 피로골절의 원인이 됩니다.
            </p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4 shadow-sm">
              <ul className="!mb-0 text-[11px] space-y-1">
                <li><span className="font-bold text-green-600">10.0% ~ 15.0%:</span> 엘리트 유소년 최적 구간</li>
                <li><span className="font-bold text-yellow-600">8.0~9.9% / 15.1~18.0%:</span> 주의 구간</li>
                <li><span className="font-bold text-red-600">&lt; 8.0% / &gt; 18.0%:</span> 위험 (RED-S 징후 또는 체중 부하로 인한 관절 데미지)</li>
              </ul>
              <div className="mt-2 bg-physio-50 p-2.5 rounded-lg border border-physio-100 text-[11px] text-physio-800 leading-relaxed">
                <b className="text-physio-900 block mb-0.5">▶ RED-S 한의학적 처방 포인트</b>
                RED-S(스포츠 에너지 결핍증)는 단순히 더 많이 먹이는 섭취량만의 문제가 아니라 근본적인 <b>소화기 보강</b>으로 개선해야 함을 주지시켜야 합니다. 비음허(脾陰虛), 비기허(脾氣虛) 상태를 치료하는 <b>향사육군자탕(香砂六君子湯), 보중익기탕(補中益氣湯)</b> 처방이 무엇보다 중요합니다.
              </div>
            </div>

            <h4><Icon name="scan-line" size={18} className="text-physio-600"/> 하체 필수 관절 초음파 판독 (L/R)</h4>
            <p>성장기 선수에게 가장 빈발하는 3대 관절 부위(무릎/슬개건, 아킬레스건, 족저근막)를 확인합니다.</p>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4 shadow-sm">
              <ul className="!mb-0 text-[11px] space-y-2">
                <li><b className="text-green-600">양호 (Green):</b> 건(Tendon) 두께 정상, Fibrillar pattern 선명, 무향(Anechoic) 체액 없음.</li>
                <li><b className="text-yellow-600">주의 (Yellow):</b> 가벼운 두께 증가(비대), 경미한 저에코(Hypoechoic) 영역. <b>(미세손상 및 어혈 형성기 - 침/약침 치료 요함)</b></li>
                <li><b className="text-red-600">위험 (Red):</b> 명확한 파열(Tear) 징후, 심한 도플러 신호, 오스굿씨/세버병의 뼛조각(Fragmentation) 박리. <b>(훈련 즉각 중단, 반깁스 고려)</b></li>
              </ul>
              <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-700 leading-relaxed">
                <b className="text-physio-700">▶ 연부조직 손상 한의학 처방:</b> 초음파상 관찰되는 팽팽한 건/인대 및 연부조직 손상에는 <b>당귀(當歸)가 들어간 작약감초탕(芍藥甘草湯)</b>이나 <b>당귀수산(當歸須散)</b>을 처방하는 것이 회복과 이완에 매우 큰 도움이 됨을 안내합니다.
              </div>
            </div>

            <h4><Icon name="target" size={18} className="text-physio-600"/> 초음파 주요 체크 포인트</h4>
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-[11px] space-y-2">
              <p><b>• 무릎 (슬개건):</b> Osgood-Schlatter 또는 Sinding-Larsen-Johansson 증후군 징후 (골연골 경계면 불규칙성, 뼛조각) 확인.</p>
              <p><b>• 아킬레스건:</b> Sever's disease (종골 부착부 염증) 및 건 실질 내의 저에코 비후 확인.</p>
              <p><b>• 족저근막:</b> 종골 부착부 두께 4mm 이상 비후, 저에코성 변화 확인.</p>
            </div>
          </div>
        )
      },
      {
        id: 'p-homecare',
        icon: 'home',
        title: '6. 부모님 홈케어 및 영양 상담 가이드',
        subtitle: '리포트 4페이지에 반영된 실천 솔루션 (약식동원)',
        content: (
          <div className="modal-prose">
            <p>리포트에 출력되는 생활 관리 지침입니다. 보호자 상담 시 이 내용을 바탕으로 지도해주십시오.</p>

            <h4><Icon name="snowflake" size={18} className="text-physio-600"/> 하체 마사지와 냉찜질</h4>
            <ul className="text-[12px] bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <li>운동 후 허벅지와 종아리를 가볍게 풀어주세요.</li>
              <li>무릎과 발목이 뻐근할 때는 <b>10~15분 정도 냉찜질</b>이 필수입니다 (미세 염증 조기 차단).</li>
            </ul>

            <h4><Icon name="moon" size={18} className="text-physio-600"/> 수면 시간과 코어 운동</h4>
            <ul className="text-[12px] bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
              <li>최소 8시간 이상 푹 자는 수면이 회복의 핵심입니다 (음 보충).</li>
              <li>급성장기(PHV)에는 무리한 점프보다 가벼운 <b>코어 운동과 정렬 훈련</b>이 더 도움이 됩니다.</li>
            </ul>

            <h4><Icon name="utensils" size={18} className="text-physio-600"/> 영양 섭취 타이밍 (약식동원 藥食同源)</h4>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-[12px] space-y-3 shadow-sm">
              <p><b className="text-slate-800">훈련 전 (2~3시간 전):</b> 소화가 잘 되는 탄수화물(밥, 국수, 파스타). 기름진 음식은 복부 불편감을 유발하므로 피하기. 훈련 전까지 물을 조금씩 자주 마시기.</p>
              <p><b className="text-slate-800">훈련 직후 (30분 내):</b> 우유, 요거트, 바나나 등으로 빠르게 보충. 땀을 많이 흘렸다면 수분과 전해질 보충. 과일은 피로 감소에 탁월.</p>
              <p><b className="text-slate-800">평상시 집밥:</b> 단백질 반찬 매 끼니 확보. 뼈 성장을 위한 칼슘과 비타민 D 섭취. 하루 전체 수분 섭취량을 넉넉하게 유지.</p>
            </div>
            <p className="text-[11px] mt-2 font-bold text-physio-700 bg-physio-50 p-2 rounded inline-block">* 한의학 포인트: 균형 잡힌 영양 섭취는 근육의 미세 손상을 수복하고 뼈를 윤택하게 하는 훌륭한 보약(약식동원)입니다.</p>
          </div>
        )
      },
      {
        id: 'p-comments',
        icon: 'edit-3',
        title: '7. 종합 소견 작성 가이드',
        subtitle: '의료진 코멘트 작성 예시 (Copy & Paste 용)',
        content: (
          <div className="modal-prose">
            <p>시스템이 자동 초안을 제공하지만, 의료진이 아래 예시를 참고하여 환자 맞춤형으로 수정하는 것이 좋습니다.</p>
            
            <div className="space-y-4">
              <div className="border border-red-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-red-50 px-4 py-3 font-extrabold text-red-800 text-[13px] flex justify-between border-b border-red-100">
                  상황 1: 과반응 (초고위험) <span className="text-red-600 bg-white px-2 py-0.5 rounded-full border border-red-200 text-[10px]">RMSSD &ge; 130</span>
                </div>
                <div className="p-4 text-[12px] leading-relaxed bg-white text-slate-700 font-medium">
                  "[상태 확인 권고] HRV가 MPS의 과반응 확인 구간에 해당합니다. 개인의 평소 값과 측정 조건을 먼저 확인하고, 최근 훈련량·수면·피로감·수행능력 변화를 함께 살펴보겠습니다. 피로 또는 수행 저하가 동반되면 훈련 강도를 낮추거나 회복 시간을 확보하는 방안을 검토합니다. 단일 수치만으로 부상 확률이나 필요한 휴식 기간을 확정하지 않습니다."
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-4 py-3 font-extrabold text-slate-800 text-[13px] flex justify-between border-b border-slate-200">
                  상황 2: 성장기 + 만성 피로 <span className="text-slate-600 bg-white px-2 py-0.5 rounded-full border border-slate-200 text-[10px]">PHV 0 & Q3/Q4</span>
                </div>
                <div className="p-4 text-[12px] leading-relaxed bg-white text-slate-700 font-medium">
                  "현재 키가 가장 빠르게 자라는 급성장기에 진입하여 관절의 장력이 팽팽해져 부상 위험이 기본적으로 높은 시기입니다. 여기에 자율신경 검사상 기초 체력(SDNN)마저 저하되어 있어 뼈와 근육으로 가야 할 에너지가 부족한 상태(RED-S 우려)입니다. 당분간 스프린트 훈련 비중을 줄이고 영양 섭취와 수면 시간을 대폭 늘려야 성장과 운동 두 마리 토끼를 잡을 수 있습니다."
                </div>
              </div>

              <div className="border border-physio-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-physio-50 px-4 py-3 font-extrabold text-physio-800 text-[13px] flex justify-between border-b border-physio-100">
                  상황 3: 부종/염증 수치 상승 <span className="text-physio-600 bg-white px-2 py-0.5 rounded-full border border-physio-200 text-[10px]">ECW &gt; 0.390</span>
                </div>
                <div className="p-4 text-[12px] leading-relaxed bg-white text-slate-700 font-medium">
                  "체성분 검사상 세포외수분비(ECW)가 높게 관찰됩니다. 이는 최근 강도 높은 훈련 후 하체 근육 곳곳에 미세한 염증과 붓기(어혈)가 빠져나가지 못하고 쌓여있다는 뜻입니다. 초음파상 관찰된 아킬레스건/슬개건의 뻣뻣함도 이와 연관이 깊습니다. 운동 후 철저한 냉찜질과 함께 본원의 순환 개선 치료(침/약침) 병행을 적극 권장합니다."
                </div>
              </div>
            </div>
          </div>
        )
      }
    ];

    // ==========================================
    // DATA 3: S-REPORT (Structure & Growth)
    // ==========================================
    const sGuideData = [
      {
        id: 's-overview',
        icon: 'bar-chart-2',
        title: 'S-REPORT 개요 및 총평',
        subtitle: '다중 백분위 성장곡선과 뼈나이 기반 PAH 분석',
        content: (
          <div className="modal-prose">
            <h4><Icon name="info" size={18} className="text-structure-600"/> S-REPORT 목적</h4>
            <p>
              단순히 '현재 키가 얼마다'를 넘어, 아이의 <b>골연령(뼈나이), 유전적 예측키(MPH), 통계적 예측키(PAH), 그리고 성장 단계(PHV)</b>를 입체적으로 분석하여, 현재의 피지컬 상태가 '성장의 어느 지점'을 통과하고 있는지 명확한 로드맵을 제시합니다.
            </p>

            <h4><Icon name="ruler" size={18} className="text-structure-600"/> MPH vs PAH의 이해</h4>
            <ul className="bg-white p-3 border border-slate-200 rounded-lg shadow-sm text-[12px]">
              <li><b>MPH (유전적 예측키):</b> 부모님의 키만으로 계산한 선천적 목표치. (남: 부+모+13/2, 여: 부+모-13/2)</li>
              <li><b>PAH (현실적 예측키):</b> 현재 키와 골연령(TW3 또는 Greulich-Pyle 기준)을 반영하여 도출한 실제 도달 가능 키.</li>
            </ul>
            <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-2 font-medium">
              ※ PAH가 MPH보다 현저히 낮다면 성장 방해 요인(수면부족, 영양결핍, 과도한 훈련, 소화기 허약)이 존재한다는 뜻이며, 적극적인 <b>한의학적 성장 치료(보신, 건비)</b>가 필요합니다.
            </p>

            <h4><Icon name="leaf" size={18} className="text-structure-600"/> 스포츠 한의학적 관점 (신주골, 비주기육)</h4>
            <div className="km-box structure">
              <p className="font-bold text-structure-800 text-sm mb-2">성장의 두 축: 신장(선천)과 비위(후천)</p>
              <ul className="!mb-0 text-[12px] space-y-2">
                <li><b>신주골(腎主骨):</b> 뼈의 성장은 타고난 신기(腎氣)에 달려 있습니다. 녹용, 숙지황 등으로 골수를 채워야 골연령 지연 및 성장통을 잡을 수 있습니다.</li>
                <li><b>비주기육(脾主肌肉):</b> 살과 근육은 소화기(비위)가 만듭니다. 체중 백분위가 낮고 밥을 안 먹는 선수는 <b>RED-S(스포츠 에너지 결핍증)</b>에 빠지기 쉽습니다. 이는 단순한 영양 부족이 아니므로, 비음허(脾陰虛)와 비기허(脾氣虛)를 개선하는 <b>향사육군자탕(香砂六君子湯), 보중익기탕(補中益氣湯)</b> 등의 소화기 보강 처방이 그 무엇보다 중요함을 주지시켜야 합니다.</li>
              </ul>
            </div>
          </div>
        )
      },
      {
        id: 's-phv',
        icon: 'trending-up',
        title: '1. 성장 단계 (PHV) 5단계 정밀 판독',
        subtitle: 'Peak Height Velocity 구간별 신체변화 및 한의학적 진단',
        content: (
          <div className="modal-prose">
            <p className="text-[13px] text-slate-600 mb-4 bg-slate-50 p-2 rounded">
              유소년 선수의 폼 저하와 부상 사이클은 뼈(길이)와 근육(장력)의 성장 불일치에서 비롯됩니다. 이를 5단계로 세밀하게 판독합니다.
            </p>
            
            <div className="space-y-5">
              {/* 1. Pre-PHV */}
              <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-white">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-extrabold rounded">1단계</span>
                  <h4 className="!m-0 text-[15px] text-slate-800">Pre-PHV (성장 가속 준비기)</h4>
                </div>
                <p className="text-[12px] text-slate-600 mb-3 leading-relaxed">
                  <b>• 신체 특징:</b> 1년에 약 4~5cm씩 완만하고 꾸준히 성장하는 시기입니다. 뼈의 급격한 변화가 없어 신경계와 근육의 협응력(코디네이션), 밸런스 습득의 최고 황금기입니다.<br/>
                  <b>• 훈련 지침:</b> 기본기 완성과 다양한 움직임 패턴을 익히는 데 주력합니다.
                </p>
                <div className="bg-structure-50 p-3 rounded-lg text-[12px] border border-structure-100">
                  <b className="text-structure-800 block mb-1">▶ 한의학 변증 & 처방 (비위허약 및 RED-S 예방)</b>
                  다가올 급성장기에 쓰일 에너지를 비축해야 합니다. 식사량이 적고 소화기가 약한 선수(비음허, 비기허)는 이 시기에 에너지를 채워두지 않으면 급성장기에 RED-S에 빠집니다. 단순 영양제가 아닌 소화기 본연의 힘을 길러주는 <b>향사육군자탕(香砂六君子湯)이나 보중익기탕(補中益氣湯)</b> 류를 최우선으로 처방하여 영양 흡수율을 극대화합니다.
                </div>
              </div>

              {/* 2. Stage 1 */}
              <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-white">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-[11px] font-extrabold rounded">2단계</span>
                  <h4 className="!m-0 text-[15px] text-blue-900">Stage 1 (성장 가속기 - Take-off)</h4>
                </div>
                <p className="text-[12px] text-slate-600 mb-3 leading-relaxed">
                  <b>• 신체 특징:</b> 성장판 자극이 본격적으로 시작되며 성장 속도가 서서히 붙습니다. 수면 시간과 식사량이 급증하며, 팔다리가 길어지기 시작해 움직임이 뻣뻣하고 어색해지기 시작합니다.
                </p>
                <div className="bg-structure-50 p-3 rounded-lg text-[12px] border border-structure-100">
                  <b className="text-structure-800 block mb-1">▶ 한의학 변증 & 처방 (신음허 징후)</b>
                  에너지 소모가 극심해지며 <b>신음허(腎陰虛)</b>로 인한 허열이 발생합니다. 자다가 땀을 흘리거나 종아리/무릎의 야간 성장통을 호소합니다. <b>육미지황탕(六味地黃湯)</b> 가감으로 진액을 채워주어 뼈의 성장을 윤택하게 뒷받침해야 합니다.
                </div>
              </div>

              {/* 3. Stage 2 (PHV) */}
              <div className="border-2 border-red-400 bg-red-50/50 rounded-lg p-4 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">훈련 부하 주의</div>
                <div className="flex items-center gap-2 mb-2 mt-1 border-b border-red-200 pb-2">
                  <span className="px-2.5 py-1 bg-red-200 text-red-900 text-[11px] font-extrabold rounded">3단계</span>
                  <h4 className="!m-0 text-[15px] text-red-800 font-extrabold">Stage 2 (PHV - 최대 급성장기)</h4>
                </div>
                <p className="text-[12px] text-red-900 mb-3 leading-relaxed">
                  <b>• 신체 특징:</b> 1년에 8~12cm씩 폭발적으로 성장합니다. <b>뼈는 하루가 다르게 길어지는데, 근육과 인대가 그 속도를 따라 늘어나지 못해 관절의 텐션(장력)이 임계치에 도달합니다.</b><br/>
                  <b>• 부상 경고:</b> 성장기 특이 부상인 무릎(오스굿씨병), 발뒤꿈치(세버병), 그리고 햄스트링 파열이 집중적으로 일어납니다. 플라이오메트릭(점프) 및 강한 스프린트 훈련을 50% 축소하고 스트레칭 시간을 2배 이상 늘려야 합니다.
                </p>
                <div className="bg-white p-3 rounded-lg text-[12px] border border-red-200 shadow-sm">
                  <b className="text-red-700 block mb-1">▶ 한의학 변증 & 처방 (간신기허 및 연부조직 손상)</b>
                  뼈(신장)의 무서운 성장 속도를 근막(간)이 감당하지 못해 쥐가 나고 연부조직 손상이 발생하는 상황입니다. <b>당귀(當歸)가 포함된 작약감초탕(芍藥甘草湯)</b>이나 <b>당귀수산(當歸須散)</b>을 처방하여 근육과 인대를 이완시키고 손상 조직을 회복시키는 것이 최우선입니다. 여기에 우귀음(右歸飮) 등을 합방하여 강하게 보신(補腎)합니다.
                </div>
              </div>

              {/* 4. Stage 3 */}
              <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-white">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-extrabold rounded">4단계</span>
                  <h4 className="!m-0 text-[15px] text-emerald-900">Stage 3 (성장 감속기)</h4>
                </div>
                <p className="text-[12px] text-slate-600 mb-3 leading-relaxed">
                  <b>• 신체 특징:</b> 수직 성장의 가속도는 꺾이지만, 길어진 뼈의 골밀도가 촘촘해지고 본격적으로 근육량이 결합(벌크업)되는 시기입니다. 근력 및 파워 훈련의 효율이 가장 좋습니다.
                </p>
                <div className="bg-structure-50 p-3 rounded-lg text-[12px] border border-structure-100">
                  <b className="text-structure-800 block mb-1">▶ 한의학 변증 & 처방 (기혈양수)</b>
                  폭발적 성장을 버텨낸 몸을 다듬는 <b>기혈양수(氣血兩收)</b>의 시기. <b>팔물탕(八物湯), 십전대보탕(十全大補湯)</b>을 투여하여 근육의 볼륨을 단단하게 키우고, 남은 성장판의 여력을 끝까지 쥐어짜는 전략이 필요합니다.
                </div>
              </div>

              {/* 5. Stage 4~5 */}
              <div className="border border-slate-200 rounded-lg p-4 shadow-sm bg-slate-50">
                <div className="flex items-center gap-2 mb-2 border-b border-slate-200 pb-2">
                  <span className="px-2.5 py-1 bg-slate-300 text-slate-800 text-[11px] font-extrabold rounded">5단계</span>
                  <h4 className="!m-0 text-[15px] text-slate-800">Stage 4~5 (성장 종료 초기 및 임박기)</h4>
                </div>
                <p className="text-[12px] text-slate-600 mb-3 leading-relaxed">
                  <b>• 신체 특징:</b> 성인 골격에 도달하여 체형이 고착되는 시기. 키 성장은 거의 멈추며, 성인 무대 진입을 위해 기능적 유연성과 근력의 완벽한 균형을 완성해야 합니다.
                </p>
                <div className="bg-white p-3 rounded-lg text-[12px] border border-slate-200 shadow-sm">
                  <b className="text-slate-800 block mb-1">▶ 한의학 치료 (구조적 교정 및 손상 관리)</b>
                  보약의 비중보다는, 굳어버린 골격의 구조적 밸런스를 바로잡는 <b>추나요법(근골격계 불균형 교정)</b>과, 고강도 훈련 후 축적되는 <b>어혈(瘀血) 제거(부항, 사혈, 약침)</b> 위주의 스포츠 손상 집중 관리가 중심이 됩니다.
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 's-type',
        icon: 'users',
        title: '2. 6대 성장 유형(Type)별 부모 상담 스크립트',
        subtitle: '현재 키(Percentile) × 골연령(성숙 속도) 조합',
        content: (
          <div className="modal-prose">
            <p className="text-[13px] text-slate-600 mb-4 bg-slate-50 p-2 rounded">
              아이의 현재 신장 백분위와 뼈나이의 빠름/느림을 조합한 6가지 유형입니다. 이를 바탕으로 부모님의 조급함을 잠재우고 맞춤 플랜을 설계합니다.
            </p>

            <div className="space-y-5">
              {/* Type 1 */}
              <div className="border border-slate-200 p-4 rounded-xl shadow-sm bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Icon name="hourglass" size={20}/></div>
                  <div>
                    <h4 className="!m-0 text-[15px] text-slate-900">1. 작은 키 + 지연 성장형 <span className="text-sm font-normal text-slate-500">(Late Bloomer)</span></h4>
                    <p className="text-[11px] text-blue-600 font-bold mt-0.5">현재 키 하위권 + 뼈나이 1년 이상 어림</p>
                  </div>
                </div>
                <p className="text-[12px] text-slate-600 mb-3 leading-relaxed">현재 피지컬은 밀리지만 골연령이 어려서 성장의 타이밍이 늦게 올 뿐, 최종 성장 잠재력은 충분한 대기만성 유형입니다.</p>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-[12px] text-slate-700 leading-relaxed relative">
                  <span className="absolute -top-2.5 left-3 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200 rounded-full">상담 스크립트</span>
                  "어머니, 지금 아이가 몸싸움에서 밀린다고 절대 조급해하지 마세요. 우리 아이는 전형적인 <b>'대기만성형(Late Bloomer)'</b>입니다. 지금 억지로 힘을 키우려 하기보다는 <b>공간 인지와 발밑 기술</b>을 다듬어 놓으라고 지도자에게 전달해 주세요. 늦게 키가 컸을 때 그 기술이 완벽한 무기가 됩니다. 단, 성장이 폭발할 시점에 소화흡수력이 떨어지면 안 되므로, 지금부터 <b>소화기(비위)를 보강하는 향사육군자탕 등 한방 치료</b>의 필요성은 증상과 평가 결과에 따라 판단합니다."
                </div>
              </div>

              {/* Type 2 */}
              <div className="border border-slate-200 p-4 rounded-xl shadow-sm bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><Icon name="bar-chart" size={20}/></div>
                  <div>
                    <h4 className="!m-0 text-[15px] text-slate-900">2. 작은 키 + 평균 성장형 <span className="text-sm font-normal text-slate-500">(Average Small)</span></h4>
                    <p className="text-[11px] text-slate-600 font-bold mt-0.5">현재 키 하위권 + 뼈나이 정상 속도</p>
                  </div>
                </div>
                <p className="text-[12px] text-slate-600 mb-3 leading-relaxed">뼈는 제 나이대로 닫혀가고 있는데 키는 크지 않고 있어, 유전적 한계나 만성적 수면/영양 결핍이 의심되는 유형입니다.</p>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-[12px] text-slate-700 leading-relaxed relative">
                  <span className="absolute -top-2.5 left-3 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200 rounded-full">상담 스크립트</span>
                  "어머니, 뼈나이는 정상 속도로 닫혀가고 있는데 키 성장이 못 따라가고 있습니다. 성장판이 완전히 닫히기 전인 지금이 <b>마지막 골든타임</b>입니다. 민첩성을 살리는 플레이 스타일을 유지하면서, 지체할 것 없이 즉각적으로 <b>성장을 폭발시키는 보신(補腎) 녹용 처방</b>을 통해 1cm라도 더 성장 여력을 확보해야 합니다."
                </div>
              </div>

              {/* Type 3 */}
              <div className="border border-red-200 p-4 rounded-xl shadow-sm bg-red-50/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0"><Icon name="alert-circle" size={20}/></div>
                  <div>
                    <h4 className="!m-0 text-[15px] text-red-900">3. 작은 키 + 조기 성장형 <span className="text-sm font-normal text-red-700">(Early Small) - 주의</span></h4>
                    <p className="text-[11px] text-red-600 font-bold mt-0.5">현재 키 하위권 + 뼈나이 1.5년 이상 빠름</p>
                  </div>
                </div>
                <p className="text-[12px] text-red-800 mb-3 leading-relaxed font-medium">현재 키와 골연령의 차이를 함께 살펴볼 유형입니다. 성장 추이와 성숙 속도는 추가 평가가 필요하며, 이 분류만으로 성조숙증을 판단하지 않습니다.</p>
                <div className="bg-white p-3.5 rounded-lg border border-red-200 text-[12px] text-red-900 leading-relaxed relative shadow-sm">
                  <span className="absolute -top-2.5 left-3 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 border border-red-200 rounded-full">상담 스크립트</span>
                  "지금 가장 적극적인 개입이 시급합니다. 키가 충분히 크지 않았는데 뼈나이가 너무 빨리 성숙해버리면 고등학교 진학 시 심각한 피지컬 열세에 놓입니다. 소아비만이 있다면 즉각 체지방을 감량해야 하며, 한의학적으로 몸에 쌓인 <b>습열(濕熱)을 끄고 성숙을 최대한 지연시키는 처방(인진호탕, 용담사간탕 가감)</b>의 필요성은 개별 평가 후 판단합니다."
                </div>
              </div>

              {/* Type 4 */}
              <div className="border border-emerald-200 p-4 rounded-xl shadow-sm bg-emerald-50/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><Icon name="star" size={20}/></div>
                  <div>
                    <h4 className="!m-0 text-[15px] text-emerald-900">4. 큰 키 + 지연 성장형 <span className="text-sm font-normal text-emerald-700">(Ideal Tall) - 이상적</span></h4>
                    <p className="text-[11px] text-emerald-600 font-bold mt-0.5">현재 키 상위권 + 뼈나이 1년 이상 어림</p>
                  </div>
                </div>
                <p className="text-[12px] text-emerald-800 mb-3 leading-relaxed font-medium">이미 또래보다 훌쩍 큰데 뼈나이는 어려서 앞으로도 더 클 여지가 넘치는, 엘리트 체육 최고의 축복받은 피지컬입니다.</p>
                <div className="bg-white p-3.5 rounded-lg border border-emerald-200 text-[12px] text-emerald-900 leading-relaxed relative shadow-sm">
                  <span className="absolute -top-2.5 left-3 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 rounded-full">상담 스크립트</span>
                  "현재 신체 조건과 성장 추이를 함께 살펴볼 수 있는 유형입니다. 최종 키와 선수로서의 성과는 이 분류만으로 예측하거나 보장할 수 없습니다. 이 아이의 <b>성장 단계에 맞는 훈련과 회복 관리가 중요</b>입니다. 뼈가 쉬지 않고 길어지느라 관절과 인대가 항상 팽팽하게 당겨져 있을 것입니다. 훈련 후 불편감과 회복 상태를 확인하고, <b>근막을 이완시키고 연부조직을 보호하는 당귀 작약감초탕, 추나, 약침 등 예방적 관리</b>의 필요성은 개별 평가 후 판단합니다."
                </div>
              </div>

              {/* Type 5 */}
              <div className="border border-slate-200 p-4 rounded-xl shadow-sm bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><Icon name="check-circle" size={20}/></div>
                  <div>
                    <h4 className="!m-0 text-[15px] text-slate-900">5. 큰 키 + 평균 성장형 <span className="text-sm font-normal text-slate-500">(Average Tall)</span></h4>
                    <p className="text-[11px] text-slate-600 font-bold mt-0.5">현재 키 상위권 + 뼈나이 정상 속도</p>
                  </div>
                </div>
                <p className="text-[12px] text-slate-600 mb-3 leading-relaxed">안정적인 피지컬 우위를 점하고 있으며, 정상적인 성숙 궤도를 그리는 우수한 체형입니다.</p>
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-[12px] text-slate-700 leading-relaxed relative">
                  <span className="absolute -top-2.5 left-3 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-200 rounded-full">상담 스크립트</span>
                  "신체 조건과 성장 흐름이 모두 준수합니다. 다만 또래보다 크다 보니 코치가 무의식적으로 훈련량을 많이 부여할 수 있습니다. <b>오버트레이닝(OTS)에 의한 근육 피로 누적</b>만 주의하면 됩니다. 주기적으로 뭉친 근육을 풀어주는 침 치료 관리가 도움이 됩니다."
                </div>
              </div>

              {/* Type 6 */}
              <div className="border border-orange-200 p-4 rounded-xl shadow-sm bg-orange-50/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0"><Icon name="zap" size={20}/></div>
                  <div>
                    <h4 className="!m-0 text-[15px] text-orange-900">6. 큰 키 + 조기 성장형 <span className="text-sm font-normal text-orange-700">(Early Maturation)</span></h4>
                    <p className="text-[11px] text-orange-600 font-bold mt-0.5">현재 키 상위권 + 뼈나이 1.5년 이상 빠름</p>
                  </div>
                </div>
                <p className="text-[12px] text-orange-800 mb-3 leading-relaxed font-medium">현재는 피지컬로 팀의 에이스 역할을 하지만, 성장판이 빨리 닫혀 성인이 되었을 때 역전당할 위험이 큰 유형입니다.</p>
                <div className="bg-white p-3.5 rounded-lg border border-orange-200 text-[12px] text-orange-900 leading-relaxed relative shadow-sm">
                  <span className="absolute -top-2.5 left-3 bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700 border border-orange-200 rounded-full">상담 스크립트</span>
                  "현재 팀에서 피지컬이 압도적일 것입니다. 하지만 뼈나이가 너무 빨라 남들보다 키 성장이 일찍 멈출 확률이 높습니다. 고등학교 진학 시 피지컬 우위가 사라지는 순간 멘탈이 크게 무너질 수 있습니다. 지금 신체 조건에 의존하지 말고 <b>철저하게 전술 이해와 발밑 기술</b>을 마스터해야 합니다. 체지방 관리를 통해 성숙이 가속화되는 것을 막아주세요."
                </div>
              </div>
            </div>
          </div>
        )
      }
    ];

