const BOOKINGS_KEY = "bluemoon_bookings";

function parseAmountToNumber(amountText) {
  if (!amountText) return 0;
  const numeric = amountText.replace(/[^\d.]/g, "");
  return Number(numeric) || 0;
}

function formatDate(isoDate) {
  if (!isoDate) return "-";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}

function loadBookings() {
  const raw = localStorage.getItem(BOOKINGS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (error) {
    return [];
  }
}

function renderDashboard() {
  const bookings = loadBookings();
  const totalBookings = document.getElementById("totalBookings");
  const totalRevenue = document.getElementById("totalRevenue");
  const lastBooking = document.getElementById("lastBooking");
  const bookingRows = document.getElementById("bookingRows");

  if (!totalBookings || !totalRevenue || !lastBooking || !bookingRows) return;

  totalBookings.textContent = String(bookings.length);

  const revenue = bookings.reduce((sum, booking) => {
    return sum + parseAmountToNumber(booking.amount);
  }, 0);
  totalRevenue.textContent = `THB ${revenue.toLocaleString()}`;

  const latest = bookings[bookings.length - 1];
  lastBooking.textContent = latest ? latest.packageName : "-";

  if (bookings.length === 0) {
    bookingRows.innerHTML = "<tr><td colspan=\"9\">No bookings yet.</td></tr>";
    return;
  }

  const rows = bookings
    .slice()
    .reverse()
    .map((booking) => {
      return `
        <tr>
          <td>${booking.id || "-"}</td>
          <td>${booking.packageName || "-"}</td>
          <td>${booking.guestName || "-"}</td>
          <td>${booking.email || "-"}</td>
          <td>${booking.persons || "-"}</td>
          <td>${booking.travelDate || "-"}</td>
          <td>${booking.amount || "-"}</td>
          <td>${booking.status || "-"}</td>
          <td>${formatDate(booking.paidAt)}</td>
        </tr>
      `;
    })
    .join("");

  bookingRows.innerHTML = rows;
}

renderDashboard();
