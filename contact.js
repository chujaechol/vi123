const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const categorySelect = document.getElementById("category");

if (categorySelect) {
  CATEGORIES.filter((c) => c !== "전체").forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      alert("필수 항목을 모두 입력해 주세요.");
      return;
    }

    contactForm.reset();
    formSuccess.hidden = false;
    contactForm.querySelector('button[type="submit"]').disabled = true;

    setTimeout(() => {
      formSuccess.hidden = true;
      contactForm.querySelector('button[type="submit"]').disabled = false;
    }, 5000);
  });
}
