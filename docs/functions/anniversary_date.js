// Note: month is zero‑based (0 = Jan, 3 = April)
const anniversary = new Date(2022, 3, 27);

function updateDaysTogether() {
  const now = new Date();
  // clear the time component on both dates
  anniversary.setHours(0,0,0,0);
  now.setHours(0,0,0,0);

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor((now - anniversary) / msPerDay);
  // if you want to count the anniversary day as “day 1”, add +1:
  // const diffDays = Math.floor((now - anniversary) / msPerDay) + 1;

  document.getElementById("daysTogether")
          .textContent = `Together for ${diffDays} days`;
}

document.addEventListener("DOMContentLoaded", updateDaysTogether);
