// Set your anniversary date here
const anniversary = new Date("2022-04-27"); // Replace with your actual date

function updateDaysTogether() {
  const now = new Date();
  const diffTime = now - anniversary;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const display = `Together for ${diffDays} days`;
  // ❤️
  document.getElementById("daysTogether").textContent = display;
}

document.addEventListener("DOMContentLoaded", updateDaysTogether);
