// weather.js
document.addEventListener('DOMContentLoaded', () => {
  const apiKey  = 'd1d80979227d4d6499253413252004';            // ← paste your key here
  const endpoint = 'https://api.weatherapi.com/v1/current.json';

  // Which card to update, and what q-param to send
  const cards = [
    { selector: '.skyler-card', query: 'San Diego' },
    { selector: '.layla-card',  query: 'Honolulu' }
  ];

  // Fetch from WeatherAPI, update icon/temp/condition
  async function fetchAndRender({ selector, query }) {
    try {
      const res = await fetch(
        `${endpoint}?key=${apiKey}`
        + `&q=${encodeURIComponent(query)}&aqi=no`
      );
      const { current } = await res.json();
      const card = document.querySelector(selector);
      // set the little weather icon
      card.querySelector('.weather-icon').src       = 'https:' + current.condition.icon;
      card.querySelector('.weather-icon').alt       = current.condition.text;
      // set temp & text
      card.querySelector('.temperature').textContent = `${Math.round(current.temp_f)}° F`;
      card.querySelector('.condition').textContent   = current.condition.text;
    } catch (err) {
      console.error('WeatherAPI error for', query, err);
    }
  }

  // do it now, and again every 10 minutes
  function updateAll() {
    cards.forEach(fetchAndRender);
  }
  updateAll();
  setInterval(updateAll, 10 * 60 * 1000);
});
