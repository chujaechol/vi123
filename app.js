const gallery = document.getElementById("gallery");
const categoryFilters = document.getElementById("categoryFilters");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxTags = document.getElementById("lightboxTags");

const urlParams = new URLSearchParams(window.location.search);
let activeCategory = urlParams.get("category") || "전체";
const initialQuery = urlParams.get("q") || "";

if (initialQuery && searchInput) {
  searchInput.value = initialQuery;
}

function renderFilters() {
  categoryFilters.innerHTML = CATEGORIES.map(
    (category) =>
      `<button type="button" class="filter-btn${category === activeCategory ? " is-active" : ""}" data-category="${category}">${category}</button>`
  ).join("");
}

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderGallery();
});

function matchesQuery(item, query) {
  if (!query) return true;
  const haystack = [item.name, item.description, item.category, ...(item.tags || [])]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function getFilteredMaterials() {
  const query = searchInput.value.trim().toLowerCase();
  return MATERIALS.filter((item) => {
    const categoryMatch = activeCategory === "전체" || item.category === activeCategory;
    return categoryMatch && matchesQuery(item, query);
  });
}

function openLightbox(item) {
  lightboxImage.src = item.image;
  lightboxImage.alt = item.name;
  lightboxTitle.textContent = item.name;
  lightboxDescription.textContent = item.description;
  lightboxCategory.textContent = item.category;
  lightboxTags.textContent = (item.tags || []).map((tag) => `#${tag}`).join(" ");
  lightbox.showModal();
}

function renderGallery() {
  const items = getFilteredMaterials();
  totalCount.textContent = String(items.length);

  if (items.length === 0) {
    gallery.innerHTML = "";
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  gallery.innerHTML = items
    .map(
      (item) => `
        <button class="card" type="button" data-id="${item.id}" aria-label="${item.name} 상세 보기">
          <div class="card__image-wrap">
            <img class="card__image" src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="card__body">
            <span class="card__category">${item.category}</span>
            <h3 class="card__title">${item.name}</h3>
            <p class="card__description">${item.description}</p>
          </div>
        </button>
      `
    )
    .join("");

  gallery.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const item = MATERIALS.find((entry) => entry.id === card.dataset.id);
      if (item) openLightbox(item);
    });
  });
}

lightbox.querySelector(".lightbox__close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

searchInput.addEventListener("input", renderGallery);

renderFilters();
renderGallery();
