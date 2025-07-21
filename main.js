// main.js

// Typed.js Effect
const typed = new Typed('#typed', {
  strings: [
    'Speed. Code. Precision. Bharath A.',
    'Built like an F1 car — fast and optimized.',
    'From Garage to GitHub — Let\'s Race!',
  ],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 2000,
  loop: true
});

// Scroll Reveal Effect
window.addEventListener('scroll', function () {
  const reveals = document.querySelectorAll('section');
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const revealTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
});

// Speedometer Loader (Optional)
window.addEventListener('load', () => {
  const loader = document.querySelector(".loader");
  if (loader) loader.style.display = "none";
});

const soundBtn = document.getElementById("soundBtn");
const soundIcon = document.getElementById("soundIcon");
const bgMusic = document.getElementById("bgMusic");
let isPlaying = false;

soundBtn.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    soundIcon.src = "assets/icons/tyre-sound-off.png";
  } else {
    bgMusic.play().then(() => {
      soundIcon.src = "assets/icons/tyre-sound-on.png";
    }).catch(err => {
      console.error("Music play error:", err);
    });
  }
  isPlaying = !isPlaying;
});
window.addEventListener('load', () => {
  const lights = document.querySelectorAll('.light');
  const hero = document.getElementById('hero');
  const f1StartLight = document.getElementById('f1StartLight');
  const goText = document.getElementById('goText');

  let index = 0;

  const interval = setInterval(() => {
    if (index < lights.length) {
      lights[index].classList.add('on');

      // Play the beep sound each time a light turns on
      const beep = new Audio('assets/sounds/beep.mp3');
      beep.play();

      index++;
    } else {
      clearInterval(interval);

      // After a pause, show "GO!", fade out lights, and show hero section
      setTimeout(() => {
        document.querySelector('.lights').style.display = 'none';
        goText.style.display = 'block';

        // Fade out start light container
        setTimeout(() => {
          f1StartLight.style.opacity = 0;
          f1StartLight.style.pointerEvents = 'none';
        }, 1500);

        // Reveal main content (hero)
        hero.style.opacity = 1;
      }, 600); // Delay before showing GO!
    }
  }, 800); // Each light turns on every 800ms
});
window.addEventListener('load', () => {
  const video = document.getElementById('introVideo');
  const f1Block = document.getElementById('f1StartLight');
  const hero = document.getElementById('hero');

  video.play();

  // After countdown & drift effect
  const totalDelay = 5 * 800 + 2000; // ~6 seconds
  setTimeout(() => {
    f1Block.style.opacity = 0;
    video.style.opacity = 0;
    video.addEventListener('transitionend', () => {
      f1Block.style.display = 'none';
      video.remove();
      hero.style.opacity = 1;
    });
  }, totalDelay);
});
