const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".main-nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

const detailToggles = document.querySelectorAll(".details-toggle");

detailToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const card = toggle.closest(".tour-card");
    if (!card) return;

    const isOpen = card.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

const bookButtons = document.querySelectorAll(".book-btn");
const bookingModal = document.getElementById("bookingModal");
const modalClose = document.querySelector(".modal-close");
const bookingForm = document.getElementById("bookingForm");
const selectedPackageName = document.getElementById("selectedPackageName");
const paymentSuccess = document.getElementById("paymentSuccess");

const PENDING_BOOKING_KEY = "bluemoon_pending_booking";
const bookingDialog = document.querySelector(".booking-dialog");

bookButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const card = button.closest(".tour-card");
    const packageTitle = card?.querySelector("h3")?.textContent?.trim() || "Selected Package";
    if (selectedPackageName) selectedPackageName.textContent = packageTitle;
    if (bookingModal) bookingModal.dataset.packageName = packageTitle;
    if (bookingForm) {
      bookingForm.reset();
      bookingForm.style.display = "grid";
    }
    const thanks = document.getElementById("bookingThanksMessage");
    if (thanks) thanks.hidden = true;
    bookingModal?.classList.add("open");
    bookingModal?.setAttribute("aria-hidden", "false");
  });
});

modalClose?.addEventListener("click", () => {
  bookingModal?.classList.remove("open");
  bookingModal?.setAttribute("aria-hidden", "true");
});

bookingModal?.addEventListener("click", (event) => {
  if (event.target === bookingModal) {
    bookingModal.classList.remove("open");
    bookingModal.setAttribute("aria-hidden", "true");
  }
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  bookingForm.style.display = "none";

  let thanks = document.getElementById("bookingThanksMessage");
  if (!thanks) {
    thanks = document.createElement("p");
    thanks.id = "bookingThanksMessage";
    thanks.textContent = "Thank you. Your booking request has been received.";
    thanks.style.margin = "0.9rem 0 0";
    thanks.style.color = "#0f6a39";
    thanks.style.fontWeight = "700";
    bookingDialog?.appendChild(thanks);
  }
  thanks.hidden = false;
});

const params = new URLSearchParams(window.location.search);
if (params.get("payment") === "success" && paymentSuccess) {
  paymentSuccess.hidden = false;
}

const typingElement = document.getElementById("typingText");

if (typingElement) {
  const typingPhrases = [
    { text: "We've got your full covered insurance. 🛡️", tone: "primary" },
    { text: "We've got your visa covered. 🛂", tone: "primary" },
    { text: "Luxury transfers waiting for you.. 🚘", tone: "primary" },
    { text: "5-Star accommodations guaranteed. 🏨", tone: "primary" },
    { text: "GPS safety bands for kids. 📍", tone: "primary" },
    { text: "Experienced local guides with you. 🧭", tone: "primary" },
    { text: "Want something unique?", tone: "alert" },
    { text: "Customize your own travel package 🎯", tone: "primary" },
    { text: "& More ...", tone: "primary" },
    { text: "BOOK NOW", tone: "primary" }
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = typingPhrases[phraseIndex];

    if (isDeleting) {
      charIndex -= 1;
    } else {
      charIndex += 1;
    }

    const visible = current.text.slice(0, charIndex);
    const toneClass = current.tone === "alert" ? "typing-alert" : "typing-primary";
    typingElement.innerHTML = `<span class="${toneClass}">${visible}</span>`;

    let delay = isDeleting ? 35 : 55;

    if (!isDeleting && charIndex === current.text.length) {
      delay = current.text === "BOOK NOW" ? 3000 : 900;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      delay = 260;
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();
}
