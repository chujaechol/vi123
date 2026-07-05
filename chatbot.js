(function () {
  const widget = document.getElementById("chatbotWidget");
  if (!widget) return;

  const toggleBtn = document.getElementById("chatbotToggle");
  const panel = document.getElementById("chatbotPanel");
  const closeBtn = document.getElementById("chatbotClose");
  const messagesEl = document.getElementById("chatbotMessages");
  const form = document.getElementById("chatbotForm");
  const input = document.getElementById("chatbotInput");
  const sendBtn = document.getElementById("chatbotSend");
  const statusEl = document.getElementById("chatbotStatus");

  const history = [];
  let isOpen = false;
  let isLoading = false;

  const WELCOME =
    "안녕하세요! 건축자재 포털 AI 상담입니다.\n" +
    "프로젝트 용도, 자재 추천, 카테고리 안내 등 무엇이든 물어보세요.";

  function buildMaterialsContext() {
    if (typeof MATERIALS === "undefined") return "";
    return MATERIALS.map(
      (item) =>
        `- [${item.category}] ${item.name}: ${item.description} (태그: ${(item.tags || []).join(", ")})`
    ).join("\n");
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text || "";
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function createMessage(role, text) {
    const el = document.createElement("div");
    el.className = `chatbot-message chatbot-message--${role}`;
    el.setAttribute("role", role === "user" ? "status" : "log");

    const bubble = document.createElement("div");
    bubble.className = "chatbot-message__bubble";
    bubble.textContent = text;
    el.appendChild(bubble);

    return el;
  }

  function appendMessage(role, text) {
    messagesEl.appendChild(createMessage(role, text));
    scrollToBottom();
  }

  function setLoading(loading) {
    isLoading = loading;
    input.disabled = loading;
    sendBtn.disabled = loading;
    toggleBtn.disabled = loading;
    setStatus(loading ? "답변 생성 중..." : "");
  }

  function openPanel() {
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

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    appendMessage("user", trimmed);
    history.push({ role: "user", content: trimmed });
    input.value = "";
    setLoading(true);

    const typing = document.createElement("div");
    typing.className = "chatbot-message chatbot-message--assistant chatbot-message--typing";
    typing.innerHTML = '<div class="chatbot-message__bubble"><span class="chatbot-dots"><span></span><span></span><span></span></span></div>';
    messagesEl.appendChild(typing);
    scrollToBottom();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          materialsContext: buildMaterialsContext(),
        }),
      });

      const data = await response.json();
      typing.remove();

      if (!response.ok) {
        throw new Error(data.error || "요청 처리 중 오류가 발생했습니다.");
      }

      const reply = data.reply || "답변을 생성하지 못했습니다.";
      appendMessage("assistant", reply);
      history.push({ role: "assistant", content: reply });
    } catch (error) {
      typing.remove();
      const message =
        error.message.includes("Failed to fetch")
          ? "서버에 연결할 수 없습니다. server.py로 실행했는지 확인해 주세요."
          : error.message;
      appendMessage("assistant", `⚠ ${message}`);
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
    sendMessage(input.value);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input.value);
    }
  });

  appendMessage("assistant", WELCOME);
})();
