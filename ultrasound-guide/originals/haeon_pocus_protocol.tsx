import React, { useState, useEffect, useMemo } from 'react';
import { 
  Activity, 
  ChevronLeft, 
  Search, 
  Settings, 
  ArrowRight,
  Accessibility, 
  Maximize2,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clipboard,
  ChevronRight,
  Stethoscope
} from 'lucide-react';

// --- 통합 데이터 구조 (6개 부위 전체 데이터) ---
const PROTOCOL_DATA = {
  shoulder: {
    id: 'shoulder',
    title: '어깨 (Shoulder)',
    korTitle: '어깨 관절',
    iconChar: '肩',
    theme: 'blue',
    description: '회전근개, 이두근 건, 견봉하 점액낭 평가',
    steps: [
      {
        id: 1,
        title: "Biceps Tendon",
        subtitle: "The Landmark (LHB)",
        pos: "Neutral, Supination (팔을 편하게 두고 손바닥이 위로)",
        kmPoint: "견전(肩前), 견우(肩髃)",
        scan: "Bicipital Groove에서 SAX(단축) 스캔 후 장축으로 전환하여 연속성 확인",
        checks: [
          { id: "b1", label: "Effusion (+)", detail: "Tenosynovitis suspected" },
          { id: "b2", label: "Medial Subluxation", detail: "Check Transverse Humeral Ligament" },
          { id: "b3", label: "Tendinosis", detail: "Hypoechoic thickening" }
        ]
      },
      {
        id: 2,
        title: "Subscapularis",
        subtitle: "Internal Rotator Scan",
        pos: "External Rotation (팔꿈치를 붙이고 밖으로 회전)",
        kmPoint: "노수(臑兪), 견정(肩貞)",
        scan: "이두근건 내측의 견갑하근 부착부 관찰, 외회전 시 건이 팽팽해지는 모습 확인",
        checks: [
          { id: "s1", label: "Subscapularis Tear", detail: "Partial or Full thickness" },
          { id: "s2", label: "Calcific Tendonitis", detail: "Acoustic shadowing inside" },
          { id: "s3", label: "Bony Irregularity", detail: "Lesser tuberosity profile" }
        ]
      },
      {
        id: 3,
        title: "Supraspinatus",
        subtitle: "Critical Zone Assessment",
        pos: "Modified Crass (뒷주머니에 손을 넣는 자세)",
        kmPoint: "곡원(曲垣), 거골(巨骨)",
        scan: "극상근 부착부 1-2cm 지점 집중 관찰. 빗살무늬 패턴의 연속성 체크",
        checks: [
          { id: "sp1", label: "Full Thickness Tear", detail: "SST FTT confirmed" },
          { id: "sp2", label: "Articular Surface Tear", detail: "Partial thickness tear" },
          { id: "sp3", label: "Cartilage Interface (+)", detail: "Double cortex sign" }
        ]
      },
      {
        id: 4,
        title: "SASB Bursa & ACJ",
        subtitle: "Bursa & Joint Assessment",
        pos: "Neutral & Dynamic Abduction (옆으로 들어올리기)",
        kmPoint: "견료(肩髎), 견우(肩髃)",
        scan: "점액낭 두께 측정 및 AC joint 골극 관찰. 외전 시 견봉 하방 끼임 유무 확인",
        checks: [
          { id: "sa1", label: "Subacromial Bursitis", detail: ">2mm thickened bursa" },
          { id: "sa2", label: "Dynamic Impingement", detail: "Bunching observed" },
          { id: "sa3", label: "AC Joint Osteophyte", detail: "OA change" }
        ]
      },
      {
        id: 5,
        title: "Infraspinatus",
        subtitle: "Posterior View",
        pos: "Cross-body (팔을 반대쪽 어깨 위로)",
        kmPoint: "천종(天宗), 견외수(肩外兪)",
        scan: "후방 관절면(Posterior Joint Line) 및 관절와순(Labrum) 관찰",
        checks: [
          { id: "i1", label: "Posterior Labrum Cyst", detail: "Paralabral cyst" },
          { id: "i2", label: "Joint Effusion", detail: "Posterior recess fluid" },
          { id: "i3", label: "Infraspinatus Atrophy", detail: "Muscular fatty change" }
        ]
      }
    ]
  },
  elbow: {
    id: 'elbow',
    title: '팔꿈치 (Elbow)',
    korTitle: '팔꿈치 관절',
    iconChar: '肘',
    theme: 'sky',
    description: '내/외측 상과염, 주관절 터널, 인대 평가',
    steps: [
      {
        id: 1,
        title: "Anterior Joint",
        subtitle: "Effusion & Distal Biceps",
        pos: "Extension & Supination (팔을 펴고 손바닥 위로)",
        kmPoint: "척택(LU5), 곡택(PC3)",
        scan: "Anterior fat pad lifting 여부로 Joint effusion 확인. 요골두와 소두 관절면 관찰",
        checks: [
          { id: "e1", label: "Joint Effusion (+)", detail: "Sail sign or Fat pad lifting" },
          { id: "e2", label: "Loose Body", detail: "Intra-articular floating body" },
          { id: "e3", label: "Distal Biceps Tendinosis", detail: "Insertion point check" }
        ]
      },
      {
        id: 2,
        title: "Medial Elbow",
        subtitle: "Common Flexor Tendon (CFT)",
        pos: "External Rotation & Supination (골퍼 엘보 스캔)",
        kmPoint: "소해(HT8), 곡지(LI11)",
        scan: "내상과 총굴근건 부착부 장축/단축 관찰. 내측측부인대(UCL) 확인",
        checks: [
          { id: "m1", label: "Golfer's Elbow (CFT)", detail: "Hypoechoic thickening or tear" },
          { id: "m2", label: "UCL Instability", detail: "Valgus stress dynamic test needed" },
          { id: "m3", label: "Medial Epicondylitis", detail: "Bony irregularity" }
        ]
      },
      {
        id: 3,
        title: "Lateral Elbow",
        subtitle: "Common Extensor Tendon (CET)",
        pos: "Pronation & Flexion (테니스 엘보 스캔)",
        kmPoint: "곡지(LI11), 수삼리(LI10)",
        scan: "외상과 위 CET 부착부 관찰. 상완요골근(Brachioradialis)과 경계를 확인",
        checks: [
          { id: "l1", label: "Tennis Elbow (CET)", detail: "High grade partial tear or tendinosis" },
          { id: "l2", label: "Radial Head Subluxation", detail: "Annular ligament area" },
          { id: "l3", label: "Enthesophyte", detail: "Chronic traction change" }
        ]
      },
      {
        id: 4,
        title: "Posterior Elbow",
        subtitle: "Olecranon & Triceps",
        pos: "Hyper-flexion (최대한 굽힌 자세)",
        kmPoint: "천정(TE10), 주료(LI12)",
        scan: "주두 점액낭 삼출액 및 삼두근 건 부착부 확인. 활차 연골 두께 측정",
        checks: [
          { id: "p1", label: "Olecranon Bursitis", detail: "Fluid collection on posterior tip" },
          { id: "p2", label: "Triceps Tendinosis", detail: "Enthesopathy or calcification" },
          { id: "p3", label: "Trochlear Cartilage Change", detail: "OA change indication" }
        ]
      },
      {
        id: 5,
        title: "Cubital Tunnel",
        subtitle: "Ulnar Nerve Assessment",
        pos: "Flexion/Extension Dynamic Test",
        kmPoint: "소해(SI8), 노수(臑兪)",
        scan: "척골신경 단면적(CSA) 측정 및 굴곡 시 신경 탈구 여부 확인",
        checks: [
          { id: "u1", label: "Ulnar Nerve Swelling", detail: "CSA > 10mm² at tunnel" },
          { id: "u2", label: "Nerve Subluxation", detail: "Dislocation over epicondyle" },
          { id: "u3", label: "Osborne's Ligament", detail: "Thickened arcuate ligament" }
        ]
      }
    ]
  },
  hand_wrist: {
    id: 'hand_wrist',
    title: '손 & 손목 (Hand/Wrist)',
    korTitle: '손목 및 수부',
    iconChar: '手',
    theme: 'emerald',
    description: '손목 터널, 건초염, 결절종, 손가락 관절 평가',
    steps: [
      {
        id: 1,
        title: "Volar Wrist",
        subtitle: "Median Nerve & Carpal Tunnel",
        pos: "Supination (손바닥 위로)",
        kmPoint: "대릉(PC7), 내관(PC6)",
        scan: "수근관 내 정중신경의 CSA 측정(>10-12mm² 시 CTS 의심), 신경의 저에코 변화 및 굴근건 건초염 확인",
        checks: [
          { id: "v1", label: "Median Nerve Swelling", detail: "CSA increased at carpal inlet" },
          { id: "v2", label: "Flexor Tenosynovitis", detail: "Fluid around FDS/FDP tendons" },
          { id: "v3", label: "Retinaculum Bowing", detail: "Palmar displacement of flexor retinaculum" }
        ]
      },
      {
        id: 2,
        title: "Dorsal Wrist (Radial)",
        subtitle: "1st & 2nd Compartments",
        pos: "Neutral with Thumb up (손등 측면)",
        kmPoint: "양계(LI5), 열결(LU7)",
        scan: "제1구획(APL, EPB)의 건초염(De Quervain's) 확인 및 Lister's tubercle 주변 제2구획 관찰",
        checks: [
          { id: "d1", label: "De Quervain's Tenosynovitis", detail: "1st compartment thickening & fluid" },
          { id: "d2", label: "Intersection Syndrome", detail: "Fluid at 1st/2nd compartment crossing" },
          { id: "d3", label: "Radial Artery Doppler", detail: "Identify vessel before procedure" }
        ]
      },
      {
        id: 3,
        title: "Volar Finger",
        subtitle: "Flexor Tendon & A1 Pulley",
        pos: "Extension to Flexion (동적 검사)",
        kmPoint: "어제(LU10), 노궁(PC8) 주변",
        scan: "방아쇠 수지 확인을 위해 A1 활차 비후 측정 및 건의 걸림(Snapping) 현상 동적 관찰",
        checks: [
          { id: "f1", label: "A1 Pulley Thickening", detail: "Thickness > 0.5mm" },
          { id: "f2", label: "Tendon Snapping", detail: "Dynamic locking during flexion" },
          { id: "f3", label: "Volar Plate Injury", detail: "PIP joint volar side check" }
        ]
      },
      {
        id: 4,
        title: "Finger Joint (Dorsal)",
        subtitle: "MCP & PIP Joints",
        pos: "Slight Flexion",
        kmPoint: "팔사(EX-UE9), 합곡(LI4)",
        scan: "류마티스 관절염(RA) 소견 확인을 위한 활액막 증식 및 관절 삼출액, 골 미란(Erosion) 확인",
        checks: [
          { id: "j1", label: "Synovial Hypertrophy", detail: "Hypoechoic tissue in joint space" },
          { id: "j2", label: "Bony Erosion", detail: "Cortical break at joint margin" },
          { id: "j3", label: "Pannus Hyperemia", detail: "Power Doppler active signal" }
        ]
      },
      {
        id: 5,
        title: "Ulnar Wrist",
        subtitle: "TFCC & ECU",
        pos: "Pronation to Neutral",
        kmPoint: "양곡(SI5), 완골(SI4)",
        scan: "삼각섬유연골복합체(TFCC)의 파열 여부 및 제6구획(ECU) 건의 탈구/건초염 확인",
        checks: [
          { id: "u1", label: "TFCC Tear", detail: "Hypoechoic defect at ulnar recess" },
          { id: "u2", label: "ECU Tendinosis/Subluxation", detail: "6th compartment instability" },
          { id: "u3", label: "DRUJ Instability", detail: "Distal radioulnar joint gapping" }
        ]
      }
    ]
  },
  knee: {
    id: 'knee',
    title: '무릎 (Knee)',
    korTitle: '슬관절',
    iconChar: '膝',
    theme: 'indigo',
    description: '관절 삼출, 반월상 연골, 측부 인대, 슬개건 평가',
    steps: [
      {
        id: 1,
        title: "Anterior (Upper)",
        subtitle: "Suprapatellar Recess",
        pos: "Supine, 30° Flexion (무릎 밑에 베개)",
        kmPoint: "학정(鶴頂), 양구(梁丘), 혈해(SP10)",
        scan: "대퇴사두근 건(Quad Tendon) 하방의 Suprapatellar bursa 확인. 삼출액 저류 시 무릎 관절염 강력 시사",
        checks: [
          { id: "k1", label: "Joint Effusion (+)", detail: "Anechoic fluid in bursa" },
          { id: "k2", label: "Synovial Thickening", detail: "Active synovitis suspected" },
          { id: "k3", label: "Quad Tendinosis", detail: "Fibrillar pattern loss" }
        ]
      },
      {
        id: 2,
        title: "Anterior (Lower)",
        subtitle: "Patellar Tendon & Hoffa's Pad",
        pos: "Supine, 30-90° Flexion (굴곡 시 건이 팽팽해짐)",
        kmPoint: "독비(犢鼻), 내슬안(內膝眼)",
        scan: "슬개건(Patellar Tendon) 장축 스캔. Hoffa's fat pad 내의 저에코 변화 및 부종 확인",
        checks: [
          { id: "k4", label: "Jumper's Knee", detail: "Proximal patellar tendinopathy" },
          { id: "k5", label: "Hoffa's Fat Pad Edema", detail: "Increased vascularity in pad" },
          { id: "k6", label: "Osgood-Schlatter", detail: "Tibial tuberosity irregularity" }
        ]
      },
      {
        id: 3,
        title: "Medial Side",
        subtitle: "MCL & Medial Meniscus",
        pos: "Neutral or External Rotation (개구리 다리 자세)",
        kmPoint: "음릉천(陰陵泉), 곡천(LR8)",
        scan: "내측측부인대(MCL)의 전장 스캔 및 내측 반월상 연골(MM)의 돌출(Extrusion) 여부 관찰",
        checks: [
          { id: "k7", label: "MCL Sprain/Tear", detail: "Ligament thickening or gap" },
          { id: "k8", label: "Medial Meniscal Bulging", detail: "Extrusion > 3mm" },
          { id: "k9", label: "Pes Anserinus Bursitis", detail: "Fluid at S-G-T attachment" }
        ]
      },
      {
        id: 4,
        title: "Lateral Side",
        subtitle: "LCL & IT Band",
        pos: "Figure-4 Position (4자 다리 자세)",
        kmPoint: "양릉천(GB34), 슬양관(GB33)",
        scan: "장경인대(ITB)와 외측측부인대(LCL, Cord-like) 확인. 비골두(Fibular head) 부착부 관찰",
        checks: [
          { id: "k10", label: "ITB Syndrome", detail: "Fluid deep to IT band" },
          { id: "k11", label: "LCL Tear", detail: "Cord-like structure discontinuity" },
          { id: "k12", label: "Lateral Meniscal Cyst", detail: "Cystic lesion near joint line" }
        ]
      },
      {
        id: 5,
        title: "Posterior",
        subtitle: "Popliteal Fossa",
        pos: "Prone (엎드린 자세)",
        kmPoint: "위중(BL40), 위양(BL39)",
        scan: "반막양근-내측비복근 사이의 Baker's cyst 유무 확인. 슬와동맥 및 경골신경 주행 관찰",
        checks: [
          { id: "k13", label: "Baker's Cyst", detail: "Comma-shaped cyst observed" },
          { id: "k14", label: "PCL Injury", detail: "Deep posterior ligament check" },
          { id: "k15", label: "Popliteal Artery Calcification", detail: "Vascular screening" }
        ]
      }
    ]
  },
  hip: {
    id: 'hip',
    title: '골반 (Hip)',
    korTitle: '고관절 및 골반',
    iconChar: '股',
    theme: 'amber',
    description: '고관절 삼출, 점액낭염, 서혜부 통증 평가',
    steps: [
      {
        id: 1,
        title: "Anterior Joint",
        subtitle: "Effusion & Labrum",
        pos: "Supine, Neutral to Ext. Rotation",
        kmPoint: "髀關(ST31)",
        scan: "Femoral head-neck junction에서 전방 관절낭 두께 측정. Labrum의 고에코 삼각 형상 확인",
        checks: [
          { id: "h1", label: "Joint Effusion (>7mm)", detail: "Capsular distension noted" },
          { id: "h2", label: "Labral Tear", detail: "Hypoechoic cleft or paralabral cyst" },
          { id: "h3", label: "FAI (Cam type)", detail: "Bony bump at head-neck junction" }
        ]
      },
      {
        id: 2,
        title: "Anterior Soft Tissue",
        subtitle: "Iliopsoas & AIIS",
        pos: "Supine, Dynamic Flexion (Snap Hip Test)",
        kmPoint: "氣衝(ST30) 주변",
        scan: "장요근건(Iliopsoas tendon)의 장축 관찰. AIIS 하방의 대퇴직근(Rectus femoris) 부착부 확인",
        checks: [
          { id: "h4", label: "Iliopsoas Bursitis", detail: "Fluid collection deep to tendon" },
          { id: "h5", label: "Snapping Iliopsoas", detail: "Abnormal tendon flick during motion" },
          { id: "h6", label: "Rectus Femoris Injury", detail: "AIIS avulsion or tendinosis" }
        ]
      },
      {
        id: 3,
        title: "Lateral Hip",
        subtitle: "GTPS & Gluteus Tendons",
        pos: "Lateral Decubitus (옆으로 누운 자세)",
        kmPoint: "環跳(GB30), 居髎(GB29)",
        scan: "대전통증증후군(GTPS) 확인. 중둔근(Gluteus medius) 및 소둔근 건의 부착부 스캔",
        checks: [
          { id: "h7", label: "Trochanteric Bursitis", detail: "Fluid over Greater Trochanter" },
          { id: "h8", label: "Gluteus Medius Tear", detail: "Discontinuity at facet attachment" },
          { id: "h9", label: "ITB Thickening", detail: "Tension at lateral hip" }
        ]
      },
      {
        id: 4,
        title: "Medial Side",
        subtitle: "Adductor Tendons",
        pos: "Frog-leg Position (개구리 다리 자세)",
        kmPoint: "陰廉(LR11), 足五里(LR10)",
        scan: "장내전근(Adductor longus) 부착부 및 치골(Pubis) 주변부 관찰. Groin pain 원인 감별",
        checks: [
          { id: "h10", label: "Adductor Strain", detail: "Tendon thickening or fluid" },
          { id: "h11", label: "Sports Hernia", detail: "Pain at pubic symphysis area" },
          { id: "h12", label: "Obturator Nerve", detail: "Check for entrapment points" }
        ]
      },
      {
        id: 5,
        title: "Posterior Hip",
        subtitle: "Hamstring & Sciatic Nerve",
        pos: "Prone (엎드린 자세)",
        kmPoint: "承扶(BL36), 殷門(BL37)",
        scan: "좌골결절(Ischial tuberosity)의 햄스트링 기시부 관찰. 이상근 하방의 좌골신경 CSA 측정",
        checks: [
          { id: "h13", label: "Hamstring Tendinopathy", detail: "Tear or thickening at origin" },
          { id: "h14", label: "Piriformis Syndrome", detail: "Nerve entrapment beneath muscle" },
          { id: "h15", label: "Ischiofemoral Impingement", detail: "Narrowing of space with QF edema" }
        ]
      }
    ]
  },
  ankle: {
    id: 'ankle',
    title: '발목 (Ankle)',
    korTitle: '족관절 및 족부',
    iconChar: '足',
    theme: 'rose',
    description: '인대 손상(ATFL), 아킬레스 건, 족저근막염 평가',
    steps: [
      {
        id: 1,
        title: "Anterior Ankle",
        subtitle: "Joint & Anterior Tendons",
        pos: "Supine, Mild Plantar Flexion",
        kmPoint: "解谿(ST41), 中封(LR4)",
        scan: "Tibial margin-Talus neck 사이 삼출액 확인. TA, EHL, EDL 건의 활액막염 및 상방 신근지대 관찰",
        checks: [
          { id: "a1", label: "Anterior Joint Effusion", detail: "Anechoic fluid in talocrural joint" },
          { id: "a2", label: "Tibialis Ant. Tenosynovitis", detail: "Fluid around TA tendon" },
          { id: "a3", label: "Anterior Impingement", detail: "Bony spur at distal tibia/talus" }
        ]
      },
      {
        id: 2,
        title: "Lateral Ankle",
        subtitle: "ATFL & CFL (Sprain focus)",
        pos: "Inversion Stress (다리를 안으로 꺾는 자세)",
        kmPoint: "丘墟(GB40), 崑崙(BL60)",
        scan: "ATFL(전거비인대)과 CFL(종비인대)의 연속성 확인. 전방 전위(Anterior Drawer) 동적 검사 병행",
        checks: [
          { id: "a4", label: "ATFL Tear (Grade II/III)", detail: "Ligament discontinuity or thickening" },
          { id: "a5", label: "CFL Injury", detail: "Deep to peroneal tendons check" },
          { id: "a6", label: "Peroneal Tenosynovitis", detail: "Fluid in lateral compartment" }
        ]
      },
      {
        id: 3,
        title: "Medial Ankle",
        subtitle: "Deltoid & Tarsal Tunnel",
        pos: "Eversion & External Rotation",
        kmPoint: "太谿(KI3), 商丘(SP5)",
        scan: "삼각인대(Deltoid) 복합체 관찰. 후경골근(TP), 장지굴근(FDL), 후경골동맥 및 신경(Tarsal tunnel) 스캔",
        checks: [
          { id: "a7", label: "Deltoid Ligament Sprain", detail: "Medial stabilizer check" },
          { id: "a8", label: "Posterior Tibial Tendinosis", detail: "Medial arch supporter check" },
          { id: "a9", label: "Tarsal Tunnel Syndrome", detail: "Tibial nerve compression/swelling" }
        ]
      },
      {
        id: 4,
        title: "Posterior Ankle",
        subtitle: "Achilles Tendon",
        pos: "Prone, Feet over edge (엎드린 자세)",
        kmPoint: "崑崙(BL60), 太谿(KI3)",
        scan: "아킬레스건 전장 스캔. 종골 부착부(Insertion) 및 Kager's fat pad, 후종골 점액낭 관찰",
        checks: [
          { id: "a10", label: "Achilles Tendinopathy", detail: "Fusiform thickening (>6mm)" },
          { id: "a11", label: "Retrocalcaneal Bursitis", detail: "Fluid in bursa near insertion" },
          { id: "a12", label: "Paratenonitis", detail: "Inflammation around tendon margin" }
        ]
      },
      {
        id: 5,
        title: "Plantar Surface",
        subtitle: "Plantar Fascia",
        pos: "Prone, Dorsiflexion (발가락을 위로 꺾음)",
        kmPoint: "湧泉(KI1), 失眠(Extra)",
        scan: "족저근막(Plantar fascia) 기시부 두께 측정(>4mm 시 근막염 시사). 종골 극(Calcaneal spur) 확인",
        checks: [
          { id: "a13", label: "Plantar Fasciitis", detail: "Thickness > 4.5mm & hypoechoic" },
          { id: "a14", label: "Plantar Fascia Tear", detail: "Partial defect or perifascial fluid" },
          { id: "a15", label: "Calcaneal Spur (+)", detail: "Enthesophyte at medial tubercle" }
        ]
      }
    ]
  }
};

// --- 유틸리티: 테마 색상 매핑 ---
const THEME_COLORS = {
  blue: { bg: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', hover: 'hover:bg-blue-50', shadow: 'shadow-blue-200', check: 'text-blue-600', ring: 'focus:ring-blue-500' },
  sky: { bg: 'bg-sky-600', light: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-600', hover: 'hover:bg-sky-50', shadow: 'shadow-sky-200', check: 'text-sky-600', ring: 'focus:ring-sky-500' },
  emerald: { bg: 'bg-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', hover: 'hover:bg-emerald-50', shadow: 'shadow-emerald-200', check: 'text-emerald-600', ring: 'focus:ring-emerald-500' },
  indigo: { bg: 'bg-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', hover: 'hover:bg-indigo-50', shadow: 'shadow-indigo-200', check: 'text-indigo-600', ring: 'focus:ring-indigo-500' },
  amber: { bg: 'bg-amber-600', light: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', hover: 'hover:bg-amber-50', shadow: 'shadow-amber-200', check: 'text-amber-600', ring: 'focus:ring-amber-500' },
  rose: { bg: 'bg-rose-600', light: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', hover: 'hover:bg-rose-50', shadow: 'shadow-rose-200', check: 'text-rose-600', ring: 'focus:ring-rose-500' },
};

// --- 메인 앱 컴포넌트 ---
export default function HaeonPocusApp() {
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    if (currentView === 'home') {
      return <Dashboard onNavigate={(id) => setCurrentView(id)} />;
    } else {
      const data = PROTOCOL_DATA[currentView];
      return <ProtocolRunner data={data} onBack={() => setCurrentView('home')} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 flex flex-col">
      {/* 헤더는 프로토콜 러너 내부에 자체적으로 포함하거나, 여기서 공통으로 쓸 수 있음.
          하지만 러너의 경우 타이머 등 특수 기능이 있으므로 뷰에 따라 다르게 렌더링하는 게 좋음.
          Dashboard일 때만 기본 헤더 노출 */}
      
      {currentView === 'home' && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">H</div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-slate-800 leading-tight">HAEON POCUS</span>
                <span className="text-[10px] text-slate-500 font-medium tracking-wider">K-MEDI PROTOCOL</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      )}

      <main className={`flex-1 ${currentView === 'home' ? 'max-w-7xl mx-auto p-4 md:p-6 w-full' : 'h-screen flex flex-col overflow-hidden'}`}>
        {renderContent()}
      </main>
    </div>
  );
}

// --- 대시보드 컴포넌트 ---
function Dashboard({ onNavigate }) {
  return (
    <div className="animate-fade-in-up pb-20">
      <section className="mb-10 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-3xl"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">HAEON POCUS PROTOCOL</h1>
          <p className="text-blue-100 text-lg mb-6 leading-relaxed">
            HAEON K-MEDI의 표준화된 근골격계 초음파 가이드라인입니다.<br className="hidden md:block"/> 
            검사할 해부학적 위치를 선택하여 5분 프로토콜을 시작하세요.
          </p>
          <div className="flex gap-3">
             <button className="bg-white text-blue-900 px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm">
              <Stethoscope className="w-4 h-4" />
              전체 가이드라인 보기
            </button>
          </div>
        </div>
      </section>

      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-blue-600" />
        부위별 프로토콜 (Body Parts)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.values(PROTOCOL_DATA).map((item) => {
          const theme = THEME_COLORS[item.theme];
          return (
            <div 
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 ${theme.bg} opacity-[0.03] rounded-bl-full group-hover:scale-150 transition-transform duration-500`}></div>
              
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${theme.bg} bg-opacity-10 flex items-center justify-center ${theme.text} font-bold text-xl`}>
                  {item.iconChar}
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-1">{item.korTitle}</h3>
              <p className="text-sm text-slate-500 font-medium mb-3 uppercase tracking-wide">{item.title}</p>
              <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 h-10">{item.description}</p>
              
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                <span>5 Steps</span>
                <span>•</span>
                <span>Standard Scan</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- 프로토콜 러너 (통합 상세 페이지) ---
function ProtocolRunner({ data, onBack }) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [findings, setFindings] = useState(new Set()); // Stores finding IDs
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [visitedSteps, setVisitedSteps] = useState(new Set([0]));
  const [copySuccess, setCopySuccess] = useState(false); // 복사 성공 상태 추가

  const theme = THEME_COLORS[data.theme];
  const currentStep = data.steps[activeStepIdx];

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Findings Toggle
  const toggleFinding = (id) => {
    const newFindings = new Set(findings);
    if (newFindings.has(id)) {
      newFindings.delete(id);
    } else {
      newFindings.add(id);
    }
    setFindings(newFindings);
  };

  // Step Navigation
  const changeStep = (idx) => {
    setActiveStepIdx(idx);
    setVisitedSteps(prev => new Set(prev).add(idx));
  };

  // Generate EMR Text
  const generateEMR = () => {
    if (findings.size === 0) return "특이 소견 없음 (WNL)";
    
    let text = `[${data.title} Ultrasound Findings]\n`;
    data.steps.forEach(step => {
      const stepFindings = step.checks.filter(c => findings.has(c.id));
      if (stepFindings.length > 0) {
        text += stepFindings.map(f => `• ${f.label} (${step.title})`).join('\n') + '\n';
      }
    });
    return text;
  };

  // 클립보드 복사 기능 개선 (iframe 호환성 확보)
  const copyToClipboard = () => {
    const text = generateEMR();
    
    try {
      // 1. 임시 텍스트 영역 생성
      const textArea = document.createElement("textarea");
      textArea.value = text;
      
      // 2. 화면 밖으로 보내지 않고, body에 붙임 (모바일 호환성)
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      
      // 3. 선택 및 복사
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // 2초 후 복귀
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error('Fallback copy failed', err);
      // 최신 API 시도 (HTTPS 환경)
      navigator.clipboard.writeText(text).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }).catch(navErr => {
        alert('복사에 실패했습니다. 텍스트를 직접 드래그해서 복사해주세요.');
      });
    }
  };

  // Progress Calculation
  const progress = Math.round((visitedSteps.size / data.steps.length) * 100);

  // SVG Donut Chart Component
  const DonutChart = ({ percentage, colorClass }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    // Tailwind class to hex mapping (simplified for SVG)
    const strokeColor = data.theme === 'blue' ? '#2563eb' : 
                        data.theme === 'sky' ? '#0ea5e9' :
                        data.theme === 'emerald' ? '#10b981' :
                        data.theme === 'indigo' ? '#4f46e5' :
                        data.theme === 'amber' ? '#d97706' : '#e11d48';

    return (
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="50%" cy="50%" r={radius} stroke="#e2e8f0" strokeWidth="8" fill="transparent" />
          <circle 
            cx="50%" cy="50%" r={radius} 
            stroke={strokeColor} 
            strokeWidth="8" 
            fill="transparent" 
            strokeDasharray={circumference} 
            strokeDashoffset={offset} 
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-700">{percentage}%</span>
        </div>
      </div>
    );
  };

  // --- 렌더링: 시작 전 랜딩 페이지 ---
  if (!isStarted) {
    return (
      <div className="flex flex-col h-full bg-slate-50">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 shrink-0">
          <button onClick={onBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium text-sm">
            <ChevronLeft className="w-4 h-4" /> 뒤로가기
          </button>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className={`w-20 h-20 ${theme.bg} rounded-2xl flex items-center justify-center text-white font-bold text-4xl mb-6 shadow-xl`}>
            {data.iconChar}
          </div>
          <span className={`px-4 py-1 ${theme.light} ${theme.text} text-xs font-bold rounded-full mb-4`}>
            CLINIC PROTOCOL v2.0
          </span>
          <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">{data.korTitle} 정밀 진단</h2>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed mb-10">
            {data.description}.<br/>
            해온한의원 환경에 최적화된 5분 초음파 스캔 프로토콜입니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-12 text-left">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-2xl mb-2">📸</div>
              <h4 className="font-bold text-slate-800 text-sm">Standard Scan</h4>
              <p className="text-xs text-slate-400 mt-1">고해상도 표준 뷰 획득</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-2xl mb-2">📍</div>
              <h4 className="font-bold text-slate-800 text-sm">KM Integration</h4>
              <p className="text-xs text-slate-400 mt-1">해부학 구조와 경혈점 결합</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-bold text-slate-800 text-sm">Auto EMR</h4>
              <p className="text-xs text-slate-400 mt-1">차트용 텍스트 자동 생성</p>
            </div>
          </div>

          <button 
            onClick={() => { setIsStarted(true); setIsTimerRunning(true); }}
            className={`${theme.bg} hover:opacity-90 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1 flex items-center gap-2`}
          >
            <Play className="w-5 h-5 fill-current" />
            프로토콜 시작하기
          </button>
        </div>
      </div>
    );
  }

  // --- 렌더링: 활성 프로토콜 인터페이스 ---
  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* 상단 헤더 */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-6 shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-slate-400 hover:text-slate-700 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className={`w-10 h-10 ${theme.bg} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
            {data.iconChar}
          </div>
          <div>
            <h1 className="font-bold text-slate-800 leading-tight text-lg md:block hidden">{data.korTitle} 5분 프로토콜</h1>
            <h1 className="font-bold text-slate-800 leading-tight text-lg md:hidden block">{data.title}</h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase hidden md:block">HAEON Sports Medicine</p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Time Elapsed</span>
            <div className={`text-2xl font-mono font-bold ${theme.text} leading-none`}>{formatTime(timerSeconds)}</div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md flex items-center gap-2 ${isTimerRunning ? 'bg-amber-500 text-white hover:bg-amber-600' : `${theme.bg} text-white hover:opacity-90`}`}
            >
              {isTimerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span className="hidden md:inline">{isTimerRunning ? '일시정지' : '계속'}</span>
            </button>
            <button 
              onClick={() => { if(confirm('초기화하시겠습니까?')) { setIsStarted(false); setFindings(new Set()); setVisitedSteps(new Set([0])); setTimerSeconds(0); setActiveStepIdx(0); }}}
              className="bg-slate-100 hover:bg-slate-200 text-slate-500 px-3 py-2 rounded-lg transition-all text-sm"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 메인 영역 */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* 사이드바 (스텝 네비게이션) */}
        <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col shrink-0 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Scan Sequence</h2>
            <div className="space-y-2">
              {data.steps.map((step, idx) => (
                <button 
                  key={step.id} 
                  onClick={() => changeStep(idx)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-4 ${activeStepIdx === idx ? `${theme.light} ${theme.text} font-bold shadow-sm border-l-4 ${theme.border.replace('border-', 'border-l-')}`.replace('border-l-slate-200', 'border-l-current') : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${activeStepIdx === idx ? `${theme.bg} text-white` : 'bg-slate-100'}`}>
                    {idx + 1}
                  </span>
                  <span className="text-sm">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-auto p-6 bg-slate-50 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-2 h-2 rounded-full ${theme.bg} animate-pulse`}></span>
              <h3 className="text-xs font-bold text-slate-600 uppercase">Optimization</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-[11px] text-slate-500 flex justify-between"><span>Focus</span><span className={`${theme.text} font-bold text-[10px]`}>Adjusted</span></li>
              <li className="text-[11px] text-slate-500 flex justify-between"><span>Freq</span><span className={`${theme.text} font-bold text-[10px]`}>High (Linear)</span></li>
            </ul>
          </div>
        </aside>

        {/* 중앙 워크스페이스 */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* 왼쪽: 가이드 및 체크리스트 */}
              <div className="xl:col-span-8 space-y-6">
                
                {/* 스텝 정보 카드 */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${theme.light} rounded-full -mr-16 -mt-16 opacity-50`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`${theme.text} font-black text-4xl`}>{(activeStepIdx + 1).toString().padStart(2, '0')}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">{currentStep.title}</h3>
                        <p className={`${theme.text} font-semibold text-sm`}>{currentStep.subtitle}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Positioning</h4>
                        <p className="text-slate-700 font-medium text-sm leading-relaxed">{currentStep.pos}</p>
                      </div>
                      <div className={`p-4 ${theme.light} rounded-2xl border ${theme.border}`}>
                        <h4 className={`text-[10px] font-bold ${theme.text} uppercase tracking-widest mb-2 opacity-70`}>Acupuncture Point (KM)</h4>
                        <p className={`${theme.text.replace('text-', 'text-slate-')} font-bold text-lg italic`}>{currentStep.kmPoint}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Scanning Method</h4>
                      <div className="flex items-start gap-3 p-4 bg-white border-2 border-slate-50 rounded-2xl">
                        <span className="text-xl">📡</span>
                        <p className="text-slate-600 leading-relaxed text-sm">{currentStep.scan}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 체크리스트 */}
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Diagnostic Findings Checklist</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentStep.checks.map((check) => (
                      <label 
                        key={check.id}
                        className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all group ${findings.has(check.id) ? `${theme.light} ${theme.border}` : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-slate-300'}`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${findings.has(check.id) ? `${theme.bg} border-transparent` : 'border-slate-300 bg-white'}`}>
                          {findings.has(check.id) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={findings.has(check.id)}
                          onChange={() => toggleFinding(check.id)}
                        />
                        <div className="flex-1">
                          <p className={`text-sm font-bold transition-colors ${findings.has(check.id) ? theme.text : 'text-slate-700 group-hover:text-slate-900'}`}>{check.label}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{check.detail}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* 오른쪽: 요약 및 EMR */}
              <div className="xl:col-span-4 space-y-6">
                
                {/* 진행률 차트 */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col items-center">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Protocol Progress</h4>
                  <DonutChart percentage={progress} />
                </div>

                {/* EMR 생성 박스 */}
                <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200 flex flex-col h-[300px]">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">EMR Clinical Note</h4>
                    <span className={`px-2 py-0.5 bg-slate-800 ${theme.text.replace('text-', 'text-opacity-80 text-')} text-[9px] font-bold rounded`}>AUTO-GEN</span>
                  </div>
                  <div className="text-xs leading-relaxed text-slate-400 font-mono p-4 bg-slate-800 rounded-xl mb-4 overflow-y-auto flex-1 whitespace-pre-line border border-slate-700">
                    {generateEMR()}
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className={`w-full py-3 ${copySuccess ? 'bg-green-600' : theme.bg} hover:opacity-90 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shrink-0`}
                  >
                    {copySuccess ? (
                      <>
                        <CheckCircle className="w-4 h-4" /> 복사 완료!
                      </>
                    ) : (
                      <>
                        <Clipboard className="w-4 h-4" /> 소견 복사하기
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

            {/* 하단 컨트롤 바 */}
            <div className="flex justify-between items-center py-6 border-t border-slate-200">
              <button 
                onClick={() => changeStep(Math.max(0, activeStepIdx - 1))}
                disabled={activeStepIdx === 0}
                className="px-4 py-2 text-slate-400 font-bold hover:text-slate-800 transition-all disabled:opacity-30 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> PREV
              </button>
              
              <div className="flex gap-2">
                {data.steps.map((_, i) => (
                  <span key={i} className={`w-2 h-2 rounded-full transition-all ${activeStepIdx === i ? theme.bg : 'bg-slate-200'}`}></span>
                ))}
              </div>

              <button 
                onClick={() => {
                  if (activeStepIdx < data.steps.length - 1) {
                    changeStep(activeStepIdx + 1);
                  } else {
                    alert('프로토콜이 완료되었습니다. EMR 내용을 확인하세요.');
                  }
                }}
                className={`bg-slate-800 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-900 transition-all flex items-center gap-2`}
              >
                {activeStepIdx === data.steps.length - 1 ? 'COMPLETE' : 'NEXT STEP'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}