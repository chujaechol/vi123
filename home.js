const CATEGORY_ICONS = {
  "콘크리트": "images/concrete.svg",
  "철강": "images/steel.svg",
  "목재": "images/wood.svg",
  "유리": "images/glass.svg",
  "타일": "images/tile.svg",
  "단열재": "images/insulation.svg",
  "석재": "images/stone.svg",
  "지붕재": "images/roofing.svg",
  "방수재": "images/waterproof.svg",
  "마감재": "images/finish.svg"
};

const FEATURED_IDS = [
  "concrete-ready-mix",
  "rebar",
  "tempered-glass",
  "eps-insulation",
  "ceramic-tile",
  "waterproof-membrane"
];

function countByCategory() {
  const counts = {};
  MATERIALS.forEach((item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
  });
  return counts;
}

function renderCategoryGrid() {
  const grid = document.getElementById("categoryGrid");
  if (!grid) return;

  const counts = countByCategory();
  const categories = CATEGORIES.filter((c) => c !== "전체");

  grid.innerHTML = categories
    .map(
      (category) => `
        <a class="category-card" href="catalog.html?category=${encodeURIComponent(category)}">
          <img class="category-card__img" src="${CATEGORY_ICONS[category] || "images/finish.svg"}" alt="">
          <div class="category-card__body">
            <h3>${category}</h3>
            <p>${counts[category] || 0}개 자재</p>
          </div>
        </a>
      `
    )
    .join("");
}

function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  const featured = FEATURED_IDS.map((id) => MATERIALS.find((m) => m.id === id)).filter(Boolean);

  grid.innerHTML = featured
    .map(
      (item) => `
        <a class="card card--link" href="catalog.html?q=${encodeURIComponent(item.name.split(" ")[0])}">
          <div class="card__image-wrap">
            <img class="card__image" src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="card__body">
            <span class="card__category">${item.category}</span>
            <h3 class="card__title">${item.name}</h3>
            <p class="card__description">${item.description}</p>
          </div>
        </a>
      `
    )
    .join("");
}

function updateHeroStats() {
  const materialEl = document.getElementById("heroMaterialCount");
  const categoryEl = document.getElementById("heroCategoryCount");
  if (materialEl) materialEl.textContent = `${MATERIALS.length}+`;
  if (categoryEl) categoryEl.textContent = String(CATEGORIES.length - 1);
}

renderCategoryGrid();
renderFeatured();
updateHeroStats();
