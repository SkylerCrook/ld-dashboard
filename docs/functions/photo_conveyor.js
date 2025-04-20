// Show Photo Conveyor
(async function() {
    let imageUrls;
    try {
      const res = await fetch('conveyor_images.json');
      if (!res.ok) throw new Error(`Could not fetch images.json (${res.status})`);
      imageUrls = await res.json();
    } catch (e) {
      console.error('Error loading image manifest:', e);
      return;
    }
  
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
  
    // Build & animate
    function buildBelt() {
      shuffle(imageUrls);
      const belt = document.querySelector('.conveyor-belt');
      belt.innerHTML = '';
  
      imageUrls.forEach(src => {
        const img = new Image();
        img.src     = src;
        img.loading = 'lazy';
        img.alt     = '';
        belt.append(img);
      });
  
      // duplicate for seamless loop
      belt.innerHTML += belt.innerHTML;
  
      requestAnimationFrame(() => {
        const fullWidth     = belt.scrollWidth;
        const speedPxPerSec = 20;
        belt.style.setProperty('--belt-width', `${fullWidth}px`);
        belt.style.animationDuration = `${fullWidth / speedPxPerSec}s`;
      });
    }
  
    buildBelt();
  })();
  