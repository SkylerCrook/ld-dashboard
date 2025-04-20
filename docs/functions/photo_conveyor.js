(async function() {
    // ←–––  Replace these with your own GitHub info  –––→
    const owner = 'SkylerCrook';
    const repo  = 'ld-dashboard';
    const path  = 'docs/images/conveyor';
  
    // 1️⃣ Fetch the directory listing from GitHub’s REST API
    async function fetchImageUrls() {
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const res    = await fetch(apiUrl);
      if (!res.ok) throw new Error(`GitHub API error ${res.status}`);
      const files = await res.json();
      return files
        .filter(f => /\.(jpe?g|png|webp)$/i.test(f.name))
        .map(f => f.download_url);
    }
  
    // 2️⃣ Pull in the list, then build+animate
    let imageUrls;
    try {
      imageUrls = await fetchImageUrls();
    } catch (e) {
      console.error('Couldn’t load images from GitHub:', e);
      return;
    }
  
    // 3️⃣ Fisher–Yates shuffle
    function shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
    }
  
    // 4️⃣ Build & kick off the conveyor
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
        const fullWidth       = belt.scrollWidth;
        const speedPxPerSec   = 20;
        belt.style.setProperty('--belt-width', `${fullWidth}px`);
        belt.style.animationDuration = `${fullWidth / speedPxPerSec}s`;
      });
    }
  
    document.addEventListener('DOMContentLoaded', buildBelt);
  })();
  