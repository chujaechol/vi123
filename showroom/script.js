const materials = [
  {
    id: 1,
    category: 'tile',
    categoryLabel: '타일',
    name: '화이트 매트 세라믹',
    desc: '은은한 매트 질감의 대형 포맷 타일. 거실·주방 벽면에 적합합니다.',
    preview: 'preview-tile-white',
    specs: { '규격': '600 × 600 mm', '두께': '10 mm', '표면': '매트', '원산지': '국내' }
  },
  {
    id: 2,
    category: 'tile',
    categoryLabel: '타일',
    name: '그레이 스톤 룩',
    desc: '자연석 질감을 재현한 그레이톤 타일. 모던한 공간 연출에 최적.',
    preview: 'preview-tile-gray',
    specs: { '규격': '600 × 1200 mm', '두께': '11 mm', '표면': '스톤', '원산지': '이탈리아' }
  },
  {
    id: 3,
    category: 'tile',
    categoryLabel: '타일',
    name: '테라코타 클래식',
    desc: '따뜻한 테라코타 컬러의 클래식 타일. 레트로·내추럴 인테리어에 어울립니다.',
    preview: 'preview-tile-terra',
    specs: { '규격': '300 × 300 mm', '두께': '8 mm', '표면': '글레이즈', '원산지': '스페인' }
  },
  {
    id: 4,
    category: 'tile',
    categoryLabel: '타일',
    name: '모자이크 패턴',
    desc: '욕실·현관 포인트용 모자이크 타일. 다양한 컬러 조합 가능.',
    preview: 'preview-tile-mosaic',
    specs: { '규격': '300 × 300 mm (시트)', '두께': '6 mm', '표면': '글로시', '원산지': '국내' }
  },
  {
    id: 5,
    category: 'tile',
    categoryLabel: '타일',
    name: '서브웨이 화이트',
    desc: '클래식한 지하철 타일 스타일. 주방 백스플래시에 인기.',
    preview: 'preview-tile-subway',
    specs: { '규격': '75 × 300 mm', '두께': '7 mm', '표면': '글로시', '원산지': '국내' }
  },
  {
    id: 6,
    category: 'tile',
    categoryLabel: '타일',
    name: '헥사곤 지오메트릭',
    desc: '육각형 지오메트릭 패턴. 욕실·현관 바닥 포인트.',
    preview: 'preview-tile-hex',
    specs: { '규격': '200 × 230 mm', '두께': '9 mm', '표면': '매트', '원산지': '터키' }
  },
  {
    id: 7,
    category: 'wood',
    categoryLabel: '목재',
    name: '오크 내추럴',
    desc: '밝은 오크 원목 마감. 따뜻하고 자연스러운 공간 연출.',
    preview: 'preview-wood-oak',
    specs: { '규격': '120 × 15 mm', '종류': '오크 원목', '마감': 'UV 코팅', '등급': 'AB' }
  },
  {
    id: 8,
    category: 'wood',
    categoryLabel: '목재',
    name: '월넛 다크',
    desc: '고급스러운 월넛 다크톤. 서재·침실 벽면 마감에 추천.',
    preview: 'preview-wood-walnut',
    specs: { '규격': '120 × 12 mm', '종류': '월넛 합판', '마감': '오일', '등급': 'A' }
  },
  {
    id: 9,
    category: 'wood',
    categoryLabel: '목재',
    name: '파인 라이트',
    desc: '밝은 파인 소재. 북유럽 스타일 인테리어에 적합.',
    preview: 'preview-wood-pine',
    specs: { '규격': '90 × 12 mm', '종류': '파인 SPF', '마감': '수성', '등급': 'AB' }
  },
  {
    id: 10,
    category: 'wood',
    categoryLabel: '목재',
    name: '티크 내추럴',
    desc: '내구성이 뛰어난 티크. 발코니·다용도실 마감용.',
    preview: 'preview-wood-teak',
    specs: { '규격': '100 × 15 mm', '종류': '티크 원목', '마감': 'UV', '등급': 'A' }
  },
  {
    id: 11,
    category: 'wood',
    categoryLabel: '목재',
    name: '대나무 친환경',
    desc: '친환경 대나무 마감재. ESG 트렌드에 맞는 지속가능 자재.',
    preview: 'preview-wood-bamboo',
    specs: { '규격': '960 × 96 mm', '종류': '대나무 합판', '마감': '천연', '등급': 'A' }
  },
  {
    id: 12,
    category: 'floor',
    categoryLabel: '바닥재',
    name: 'LVT 럭셔리 비닐',
    desc: '방수·내구성 우수한 LVT 바닥재. 원목 질감 리얼하게 재현.',
    preview: 'preview-floor-vinyl',
    specs: { '규격': '180 × 1200 mm', '두께': '5 mm', '등급': 'AC4', '방수': '100%' }
  },
  {
    id: 13,
    category: 'floor',
    categoryLabel: '바닥재',
    name: '강화마루 오크',
    desc: '합리적인 가격의 강화마루. 거실·침실 범용.',
    preview: 'preview-floor-laminate',
    specs: { '규격': '190 × 1200 mm', '두께': '8 mm', '등급': 'AC5', '클릭': 'Unilin' }
  },
  {
    id: 14,
    category: 'floor',
    categoryLabel: '바닥재',
    name: '코르크 바닥',
    desc: '충격 흡수·방음 효과. 아이 방·서재에 추천.',
    preview: 'preview-floor-cork',
    specs: { '규격': '300 × 600 mm', '두께': '6 mm', '특성': '방음·친환경', '원산지': '포르투갈' }
  },
  {
    id: 15,
    category: 'floor',
    categoryLabel: '바닥재',
    name: '울 카펫 타일',
    desc: '모듈형 카펫 타일. 사무실·서재 바닥에 적합.',
    preview: 'preview-floor-carpet',
    specs: { '규격': '500 × 500 mm', '소재': '울 80%', '두께': '8 mm', '내화': 'B1' }
  },
  {
    id: 16,
    category: 'wall',
    categoryLabel: '벽지·도장',
    name: '실크 벽지 내추럴',
    desc: '고급 실크 벽지. 은은한 텍스처와 내구성.',
    preview: 'preview-wall-paper',
    specs: { '규격': '1.06m × 15.6m', '종류': '실크', '세탁': '가능', '내화': 'B1' }
  },
  {
    id: 17,
    category: 'wall',
    categoryLabel: '벽지·도장',
    name: '친환경 수성 페인트',
    desc: 'VOC 최소화 친환경 수성 도장. 전 공간 사용 가능.',
    preview: 'preview-wall-paint',
    specs: { '용량': '18L', '도장면적': '약 108㎡', '광택': '무광', '인증': '환경마크' }
  },
  {
    id: 18,
    category: 'wall',
    categoryLabel: '벽지·도장',
    name: '패브릭 월커버링',
    desc: '직물 질감의 월커버링. 방음·단열 효과.',
    preview: 'preview-wall-fabric',
    specs: { '규격': '1.37m × 50m', '소재': '폴리에스터', '두께': '1.2 mm', '내화': 'B1' }
  },
  {
    id: 19,
    category: 'wall',
    categoryLabel: '벽지·도장',
    name: 'MDF 패널 다크',
    desc: 'MDF 슬랫 패널. TV월·침실 헤드보드 마감.',
    preview: 'preview-wall-panel',
    specs: { '규격': '120 × 2700 mm', '두께': '18 mm', '마감': '라미네이트', '설치': '클립형' }
  },
  {
    id: 20,
    category: 'stone',
    categoryLabel: '석재',
    name: '카라라 화이트 대리석',
    desc: '이탈리아산 카라라 대리석. 주방·욕실 고급 마감.',
    preview: 'preview-stone-marble',
    specs: { '규격': '600 × 600 mm', '두께': '20 mm', '원산지': '이탈리아', '표면': '폴리싱' }
  },
  {
    id: 21,
    category: 'stone',
    categoryLabel: '석재',
    name: '블랙 갤럭시 화강암',
    desc: '별점 패턴의 블랙 화강암. 현관·주방 아일랜드.',
    preview: 'preview-stone-granite',
    specs: { '규격': '600 × 600 mm', '두께': '18 mm', '원산지': '인도', '표면': '폴리싱' }
  },
  {
    id: 22,
    category: 'stone',
    categoryLabel: '석재',
    name: '슬레이트 그레이',
    desc: '자연스러운 슬레이트. 외벽·테라스 마감.',
    preview: 'preview-stone-slate',
    specs: { '규격': '300 × 600 mm', '두께': '10 mm', '원산지': '국내', '표면': '내추럴' }
  },
  {
    id: 23,
    category: 'stone',
    categoryLabel: '석재',
    name: '쿼artz 화이트',
    desc: '얼룩에 강한 인조대리석. 주방 상판에 최적.',
    preview: 'preview-stone-quartz',
    specs: { '규격': '3200 × 1600 mm', '두께': '20 mm', '내열': '300°C', '보증': '10년' }
  },
  {
    id: 24,
    category: 'stone',
    categoryLabel: '석재',
    name: '트라버틴 베이지',
    desc: '따뜻한 베이지 트라버틴. 스파·욕실 벽면.',
    preview: 'preview-stone-travertine',
    specs: { '규격': '400 × 400 mm', '두께': '12 mm', '원산지': '터키', '표면': '허니드' }
  }
];

let activeCategory = 'all';
let searchQuery = '';

const galleryGrid = document.getElementById('galleryGrid');
const galleryCount = document.getElementById('galleryCount');
const galleryEmpty = document.getElementById('galleryEmpty');
const searchInput = document.getElementById('searchInput');
const modal = document.getElementById('modal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalPreview = document.getElementById('modalPreview');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalSpecs = document.getElementById('modalSpecs');
const modalCta = document.getElementById('modalCta');
const categoryCards = document.querySelectorAll('.category-card');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const navSectionLinks = document.querySelectorAll('.nav-links a[data-section]');

function getFilteredMaterials() {
  return materials.filter(m => {
    const matchCategory = activeCategory === 'all' || m.category === activeCategory;
    const matchSearch = !searchQuery ||
      m.name.toLowerCase().includes(searchQuery) ||
      m.desc.toLowerCase().includes(searchQuery) ||
      m.categoryLabel.includes(searchQuery);
    return matchCategory && matchSearch;
  });
}

function renderGallery() {
  const filtered = getFilteredMaterials();

  galleryCount.innerHTML = `총 <strong>${filtered.length}</strong>개 자재`;
  galleryEmpty.hidden = filtered.length > 0;

  galleryGrid.innerHTML = filtered
    .map((m, i) => `
      <article class="material-card" data-id="${m.id}" style="animation-delay: ${i * 0.05}s">
        <div class="material-preview ${m.preview}"></div>
        <div class="material-info">
          <span class="material-tag">${m.categoryLabel}</span>
          <h3>${m.name}</h3>
          <p>${m.desc}</p>
        </div>
      </article>
    `).join('');

  galleryGrid.querySelectorAll('.material-card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.id)));
  });
}

function openModal(id) {
  const material = materials.find(m => m.id === id);
  if (!material) return;

  modalPreview.className = `modal-preview ${material.preview}`;
  modalCategory.textContent = material.categoryLabel;
  modalTitle.textContent = material.name;
  modalDesc.textContent = material.desc;
  modalSpecs.innerHTML = Object.entries(material.specs)
    .map(([key, val]) => `<dt>${key}</dt><dd>${val}</dd>`)
    .join('');

  const interestSelect = contactForm.querySelector('select[name="interest"]');
  if (interestSelect) interestSelect.value = material.category;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

function animateCounters() {
  document.querySelectorAll('.stat strong').forEach(el => {
    const target = Number(el.dataset.count);
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + (target >= 50 ? '+' : '');
      }
    }

    requestAnimationFrame(update);
  });
}

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  document.querySelectorAll('.hero .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
}

function initActiveNav() {
  const sections = ['about', 'categories', 'gallery', 'directions', 'contact'];

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = '';

    sections.forEach(id => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollY) {
        current = id;
      }
    });

    navSectionLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    categoryCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    activeCategory = card.dataset.category;
    renderGallery();
  });
});

let searchTimeout;
searchInput.addEventListener('input', e => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderGallery();
  }, 200);
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

modalCta.addEventListener('click', () => {
  closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  contactForm.reset();
  showToast('예약 신청이 접수되었습니다. 곧 연락드리겠습니다.');
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

document.querySelector('.logo').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  navToggle.classList.remove('active');
  navLinks.classList.remove('open');
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

heroObserver.observe(document.querySelector('.hero-stats'));

const dateInput = contactForm.querySelector('input[name="date"]');
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
dateInput.min = tomorrow.toISOString().split('T')[0];

initScrollReveal();
initActiveNav();
renderGallery();
