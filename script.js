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

bookButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const card = button.closest(".tour-card");
    const packageTitle = card?.querySelector("h3")?.textContent?.trim() || "Selected Package";
    if (selectedPackageName) selectedPackageName.textContent = packageTitle;
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
  alert("Thank you! Your booking request has been submitted.");
  bookingModal?.classList.remove("open");
  bookingModal?.setAttribute("aria-hidden", "true");
  bookingForm.reset();
});
