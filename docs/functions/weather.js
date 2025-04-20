// Get Weather
document.addEventListener('DOMContentLoaded', () => {
  const apiKey  = 'd1d80979227d4d6499253413252004';
  const endpoint = 'https://api.weatherapi.com/v1/current.json';

  const intervalMs = 30 * 60 * 1000;    // 30 minutes
  let intervalId   = null;              // for clearing later

  // Which card to update, and what q-param to send
  const cards = [
    { selector: '.skyler-card', query: '92037' },
    { selector: '.layla-card',  query: '96821' }
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

  function updateAll() {
    cards.forEach(fetchAndRender);
  }
  
  // Start polling immediately and then every intervalMs
  function startPolling() {
    updateAll();
    intervalId = setInterval(updateAll, intervalMs);
  }

  // Stop the polling loop
  function stopPolling() {
    clearInterval(intervalId);
    intervalId = null;
  }

  startPolling();

  // Pause when the tab is hidden, resume when visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopPolling();
      console.log('Polling paused (tab hidden)');
    } else if (!intervalId) {
      console.log('Polling resumed (tab visible)');
      startPolling();
    }
  });
});
