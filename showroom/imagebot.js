(function () {
  const widget = document.getElementById("imagebotWidget");
  if (!widget) return;

  const toggleBtn = document.getElementById("imagebotToggle");
  const panel = document.getElementById("imagebotPanel");
  const closeBtn = document.getElementById("imagebotClose");
  const form = document.getElementById("imagebotForm");
  const input = document.getElementById("imagebotInput");
  const generateBtn = document.getElementById("imagebotGenerate");
  const statusEl = document.getElementById("imagebotStatus");
  const galleryEl = document.getElementById("imagebotGallery");
  const emptyEl = document.getElementById("imagebotEmpty");

  let isOpen = false;
  let isLoading = false;
  const generatedImages = [];

  function closeOtherPanels() {
    const chatPanel = document.getElementById("chatbotPanel");
    const chatToggle = document.getElementById("chatbotToggle");
    if (chatPanel && !chatPanel.hidden) {
      chatPanel.hidden = true;
      if (chatToggle) {
        chatToggle.setAttribute("aria-expanded", "false");
        chatToggle.classList.remove("is-hidden");
      }
    }
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text || "";
  }

  function setLoading(loading) {
    isLoading = loading;
    input.disabled = loading;
    generateBtn.disabled = loading;
    toggleBtn.disabled = loading;
    setStatus(loading ? "이미지 생성 중... (최대 1~2분)" : "");
  }

  function openPanel() {
    closeOtherPanels();
    isOpen = true;
    panel.hidden = false;
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.classList.add("is-hidden");
    input.focus();
  }

  function closePanel() {
    isOpen = false;
    panel.hidden = true;
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.classList.remove("is-hidden");
  }

  async function parseJsonResponse(response) {
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("서버 응답 형식이 올바르지 않습니다. server.py로 실행했는지 확인해 주세요.");
    }
    return response.json();
  }

  function renderGallery() {
    if (!galleryEl) return;

    emptyEl.hidden = generatedImages.length > 0;
    galleryEl.innerHTML = generatedImages
      .map(
        (item, index) => `
        <article class="imagebot-card">
          <img src="${item.src}" alt="${escapeHtml(item.prompt)}" loading="lazy">
          <div class="imagebot-card__body">
            <p class="imagebot-card__prompt">${escapeHtml(item.prompt)}</p>
            <a class="imagebot-card__download" href="${item.src}" download="generated-${index + 1}.png">다운로드</a>
          </div>
        </article>
      `
      )
      .join("");
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function prependImage(src, prompt) {
    generatedImages.unshift({ src, prompt, createdAt: Date.now() });
    renderGallery();
  }

  async function generateImage(prompt) {
    const trimmed = prompt.trim();
    if (!trimmed || isLoading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const data = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(data.error || "이미지 생성 중 오류가 발생했습니다.");
      }

      const src = data.b64
        ? `data:image/png;base64,${data.b64}`
        : data.imageUrl;

      if (!src) {
        throw new Error("생성된 이미지 데이터를 받지 못했습니다.");
      }

      prependImage(src, data.prompt || trimmed);
      input.value = "";
      setStatus("이미지가 생성되었습니다.");
    } catch (error) {
      const message =
        error.message.includes("Failed to fetch")
          ? "서버에 연결할 수 없습니다. showroom/server.py로 실행했는지 확인해 주세요."
          : error.message;
      setStatus(`⚠ ${message}`);
    } finally {
      setLoading(false);
    }
  }

  toggleBtn.addEventListener("click", () => {
    if (isOpen) closePanel();
    else openPanel();
  });

  closeBtn.addEventListener("click", closePanel);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    generateImage(input.value);
  });

  renderGallery();
})();
