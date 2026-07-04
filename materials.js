const MATERIALS = [
  {
    id: "concrete-ready-mix",
    name: "레미콘 (Ready-Mix Concrete)",
    category: "콘크리트",
    description: "현장 타설용 준비 혼합 콘크리트. 구조체 및 바닥 슬래브에 사용됩니다.",
    image: "images/concrete.svg",
    tags: ["구조", "기초", "슬래브"]
  },
  {
    id: "rebar",
    name: "철근 (Rebar)",
    category: "철강",
    description: "콘크리트 보강용 HRB400급 철근. 기둥·보·슬래브 보강재로 사용됩니다.",
    image: "images/steel.svg",
    tags: ["보강", "구조", "철근콘크리트"]
  },
  {
    id: "h-beam",
    name: "H형강 (H-Beam)",
    category: "철강",
    description: "철골 구조용 H형강. 대형 공간 및 고층 건물 골조에 적합합니다.",
    image: "images/steel.svg",
    tags: ["철골", "골조", "H빔"]
  },
  {
    id: "plywood",
    name: "합판 (Plywood)",
    category: "목재",
    description: "거푸집 및 마감용 합판. 내수·내화 등급별로 선택합니다.",
    image: "images/wood.svg",
    tags: ["거푸집", "마감", "합판"]
  },
  {
    id: "lumber",
    name: "구조용 각재 (Structural Lumber)",
    category: "목재",
    description: "목구조 및 보조 골조용 건조 각재. 휨·압축 강도 등급을 확인합니다.",
    image: "images/wood.svg",
    tags: ["목구조", "각재", "SPF"]
  },
  {
    id: "tempered-glass",
    name: "강화유리 (Tempered Glass)",
    category: "유리",
    description: "외벽·난간·파티션용 강화유리. 충격에 강하고 파편 위험이 낮습니다.",
    image: "images/glass.svg",
    tags: ["외벽", "커튼월", "안전유리"]
  },
  {
    id: "double-glazing",
    name: "복층유리 (Double Glazing)",
    category: "유리",
    description: "단열·방음 성능이 우수한 복층 창호용 유리. Low-E 코팅 적용 가능.",
    image: "images/glass.svg",
    tags: ["창호", "단열", "Low-E"]
  },
  {
    id: "ceramic-tile",
    name: "도자기 타일 (Ceramic Tile)",
    category: "타일",
    description: "욕실·주방·현관 마감용 도자기 타일. 내수·미끄럼 등급 확인 필요.",
    image: "images/tile.svg",
    tags: ["바닥", "벽면", "욕실"]
  },
  {
    id: "porcelain-tile",
    name: "포세린 타일 (Porcelain Tile)",
    category: "타일",
    description: "고강도·저흡수율 포세린 타일. 대형 슬래브 및 외부 바닥에 적합.",
    image: "images/tile.svg",
    tags: ["대형슬래브", "외부", "고강도"]
  },
  {
    id: "eps-insulation",
    name: "EPS 단열재 (Expanded Polystyrene)",
    category: "단열재",
    description: "외단열 및 지붕 단열용 EPS 보드. 열전도율 및 내화 등급을 확인합니다.",
    image: "images/insulation.svg",
    tags: ["외단열", "ETICS", "보드"]
  },
  {
    id: "rockwool",
    name: "암면 (Mineral Wool)",
    category: "단열재",
    description: "내화·흡음 성능이 우수한 암면 단열재. 스프링클러 공간 및 외벽에 사용.",
    image: "images/insulation.svg",
    tags: ["내화", "흡음", "암면"]
  },
  {
    id: "granite",
    name: "화강석 (Granite)",
    category: "석재",
    description: "외벽·바닥·계단 마감용 천연 화강석. 내구성과 고급 마감감을 제공합니다.",
    image: "images/stone.svg",
    tags: ["천연석", "외벽", "계단"]
  },
  {
    id: "marble",
    name: "대리석 (Marble)",
    category: "석재",
    description: "로비·욕실 등 인테리어 마감용 대리석. 결 패턴과 등급을 선별합니다.",
    image: "images/stone.svg",
    tags: ["인테리어", "로비", "천연석"]
  },
  {
    id: "metal-roof",
    name: "금속 지붕재 (Metal Roofing)",
    category: "지붕재",
    description: "아연도금 강판 및 컬러강판 지붕재. 경량·내구성이 우수합니다.",
    image: "images/roofing.svg",
    tags: ["지붕", "강판", "경량"]
  },
  {
    id: "asphalt-shingle",
    name: "아스팔트 슁글 (Asphalt Shingle)",
    category: "지붕재",
    description: "경사지붕용 아스팔트 슁글. 시공이 간편하고 다양한 색상 선택 가능.",
    image: "images/roofing.svg",
    tags: ["슁글", "경사지붕", "주택"]
  },
  {
    id: "waterproof-membrane",
    name: "방수 시트 (Waterproof Membrane)",
    category: "방수재",
    description: "지하·옥상·욕실 방수용 고분자 방수 시트. 이음부 처리가 중요합니다.",
    image: "images/waterproof.svg",
    tags: ["옥상", "지하", "방수"]
  },
  {
    id: "liquid-waterproof",
    name: "액체 방수재 (Liquid Waterproofing)",
    category: "방수재",
    description: "복잡한 형상 및 코너부 방수용 액체형 방수재. 연속 막 형성이 가능합니다.",
    image: "images/waterproof.svg",
    tags: ["욕실", "발코니", "액체방수"]
  },
  {
    id: "gypsum-board",
    name: "석고보드 (Gypsum Board)",
    category: "마감재",
    description: "내부 벽체·천장 마감용 석고보드. 방화·방습 등급별 제품 선택.",
    image: "images/finish.svg",
    tags: ["천장", "칸막이", "석고"]
  },
  {
    id: "paint-exterior",
    name: "외벽 도장 (Exterior Paint)",
    category: "마감재",
    description: "외벽 보호 및 미관용 수성/유성 외벽 도장. 내후성·오염 저항성 확인.",
    image: "images/finish.svg",
    tags: ["외벽", "도장", "마감"]
  }
];

const CATEGORIES = ["전체", ...new Set(MATERIALS.map((item) => item.category))];
