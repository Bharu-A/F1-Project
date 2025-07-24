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
window.addEventListener('scroll', () => {
  document.querySelectorAll('section').forEach(section => {
    const revealTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (revealTop < windowHeight - 150) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
});

// Intro Animation Logic
window.addEventListener('load', () => {
  const hasVisited = sessionStorage.getItem('visitedHome');
  const video = document.getElementById('introVideo');
  const f1Block = document.getElementById('f1StartLight');
  const hero = document.getElementById('hero');
  const loader = document.querySelector(".loader");

  if (loader) loader.style.display = "none";

  if (hasVisited) {
    video?.remove();
    if (f1Block) f1Block.style.display = "none";
    if (hero) hero.style.opacity = 1;
    return;
  }

  sessionStorage.setItem('visitedHome', 'true');

  const lights = document.querySelectorAll('.light');
  const goText = document.getElementById('goText');
  let index = 0;

  // ✅ Use a single beep sound
  const beepSound = new Audio('assets/sounds/beep.mp3');

  const interval = setInterval(() => {
    if (index < lights.length) {
      lights[index].classList.add('on');

      // ✅ Reset and play same beep sound each time
      beepSound.currentTime = 0;
      beepSound.play().catch(() => {});

      index++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        document.querySelector('.lights').style.display = 'none';
        goText.style.display = 'block';
        setTimeout(() => {
          f1Block.style.opacity = 0;
          f1Block.style.pointerEvents = 'none';
        }, 1500);
        hero.style.opacity = 1;
      }, 600);
    }
  }, 800);

  if (video) {
    video.play().catch(() => {});
    setTimeout(() => {
      video.style.opacity = 0;
      video.addEventListener('transitionend', () => {
        f1Block.style.display = 'none';
        video.remove();
        hero.style.opacity = 1;
      });
    }, 5800);
  }
});


// Spark Animation on Click
document.addEventListener("click", (e) => {
  for (let i = 0; i < 6; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 40;
    const xOffset = Math.cos(angle) * distance;
    const yOffset = Math.sin(angle) * distance;

    spark.style.left = `${e.clientX + xOffset}px`;
    spark.style.top = `${e.clientY + yOffset}px`;
    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 1200);
  }
});

// Dialog Messages on Load
window.addEventListener('load', () => {
  const dialog = document.getElementById('racemate-dialog');
  dialog.style.display = 'block';
  dialog.innerText = '💭 Thinking...';

  setTimeout(() => dialog.innerText = '🔧 Check out the Toolkit for dev gears!', 2000);
  setTimeout(() => dialog.innerText = '🎮 Ready to race? Try the Red Bull Challenge!', 4000);
});

// Avatar Click → Speak + Show Options
document.getElementById('racemate-avatar').addEventListener('click', (e) => {
  e.stopPropagation();
  const dialog = document.getElementById('racemate-dialog');
  const options = document.getElementById('racemate-options');
  const music = document.getElementById('bgMusic');

  dialog.innerText = "Hey Racer! What do you want to explore today?";
  dialog.style.display = 'block';
  options.style.display = "flex";

  dimMusicDuringSpeech(music, "Hey Racer! What do you want to explore today?");
});

document.querySelectorAll('.option-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const link = btn.getAttribute('data-link');
    const bgMusic = document.getElementById("bgMusic");

    const msg = new SpeechSynthesisUtterance(`Zooming to ${link.replace('.html', '').replace('_', ' ')}!`);
    msg.pitch = 1.1;
    msg.rate = 1;

    msg.onstart = () => {
      if (bgMusic) bgMusic.volume = 0.1;
    };

    msg.onend = () => {
      if (bgMusic) bgMusic.volume = 0.7;
      window.location.href = link;
    };

    speechSynthesis.speak(msg);
  });
});


// Click Outside → Hide Dialog + Options
document.addEventListener("click", (e) => {
  const container = document.getElementById("racemate-container");
  if (!container.contains(e.target)) {
    document.getElementById("racemate-options").style.display = "none";
    document.getElementById("racemate-dialog").style.display = "none";
  }
});

// Resume Button Speech
function speakResume() {
  dimMusicDuringSpeech(document.getElementById("bgMusic"), "Downloading resume!");
}

document.addEventListener("DOMContentLoaded", () => {
  const bgMusic = document.getElementById("bgMusic");
  const soundBtn = document.getElementById("soundBtn");
  const soundIcon = document.getElementById("soundIcon");

  // Restore mute state from localStorage
let isMuted = false;
  bgMusic.muted = isMuted;
  updateSoundIcon();

  // Autoplay after user interaction (required by browsers)
  const enablePlayback = () => {
    if (!isMuted) {
      bgMusic.play().catch(() => {});
    }
    document.removeEventListener("click", enablePlayback);
  };
  document.addEventListener("click", enablePlayback);

  // Toggle mute/unmute on button click
  soundBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    localStorage.setItem("bgMuted", isMuted);
    updateSoundIcon();
  });

  function updateSoundIcon() {
    soundIcon.src = isMuted
      ? "assets/icons/tyre-sound-off.png"
      : "assets/icons/tyre-sound-on.png";
    soundIcon.alt = isMuted ? "Sound Off" : "Sound On";
  }
});





// Fade Out Music Function
function fadeOutMusic(audioElement, duration = 1000) {
  let volume = audioElement.volume;
  const step = volume / (duration / 50);

  const fade = setInterval(() => {
    volume = Math.max(0, volume - step);
    audioElement.volume = volume;
    if (volume <= 0.01) {
      clearInterval(fade);
      audioElement.pause();
      audioElement.volume = 0.7; // reset volume
    }
  }, 50);
}

// Dim Music During Speech
function dimMusicDuringSpeech(audioElement, text) {
  const originalVolume = audioElement.volume;
  audioElement.volume = 0.1;

  const msg = new SpeechSynthesisUtterance(text);
  msg.pitch = 1.1;
  msg.rate = 1;

  msg.onend = () => {
    audioElement.volume = originalVolume;
  };

  speechSynthesis.speak(msg);
}
