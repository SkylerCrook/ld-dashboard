// Get Times
document.addEventListener('DOMContentLoaded', () => {
    // grab the two .time elements
    const skylerTimeEl = document.querySelector('.skyler-card .time');
    const laylaTimeEl  = document.querySelector('.layla-card  .time');
  
    // map each element to its IANA time‑zone
    const clocks = [
      { el: skylerTimeEl, timeZone: 'America/Los_Angeles' }, // San Diego
      { el: laylaTimeEl,  timeZone: 'Pacific/Honolulu' }     // Honolulu
    ];
  
    // update each clock once per second
    function updateClocks() {
      const now = new Date();
      clocks.forEach(({ el, timeZone }) => {
        if (!el) return;  // safety
        el.textContent = new Intl.DateTimeFormat('en-US', {
          hour:   'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
          timeZone
        }).format(now);
      });
    }
  
    updateClocks();               // initial render
    setInterval(updateClocks, 1000);
  });
  