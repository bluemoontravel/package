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
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_dRmdRb3G1g363mucSRgjC00";

bookButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const card = button.closest(".tour-card");
    const packageTitle = card?.querySelector("h3")?.textContent?.trim() || "Selected Package";
    if (selectedPackageName) selectedPackageName.textContent = packageTitle;
    if (bookingModal) bookingModal.dataset.packageName = packageTitle;
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
  const packageName = bookingModal?.dataset.packageName || "Selected Package";
  const guestName = document.getElementById("guestName")?.value?.trim() || "";
  const email = document.getElementById("guestEmail")?.value?.trim() || "guest@example.com";
  const persons = document.getElementById("guestPersons")?.value?.trim() || "1";
  const travelDate = document.getElementById("travelDate")?.value?.trim() || "";

  const card = [...document.querySelectorAll(".tour-card h3")]
    .find((h3) => h3.textContent?.trim() === packageName)
    ?.closest(".tour-card");
  const amount = card?.querySelector(".tour-price strong")?.textContent?.trim() || "THB 0";

  const pendingBooking = {
    id: `BK-${Date.now()}`,
    packageName,
    amount,
    guestName,
    email,
    persons,
    travelDate,
    createdAt: new Date().toISOString(),
    status: "PENDING_PAYMENT"
  };

  localStorage.setItem(PENDING_BOOKING_KEY, JSON.stringify(pendingBooking));

  const params = new URLSearchParams({
    prefilled_email: email
  });
  window.location.href = `${STRIPE_PAYMENT_LINK}?${params.toString()}`;
});

const params = new URLSearchParams(window.location.search);
if (params.get("payment") === "success" && paymentSuccess) {
  paymentSuccess.hidden = false;
}
