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
