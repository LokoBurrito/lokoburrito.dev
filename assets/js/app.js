const hasGSAP = typeof gsap !== "undefined";
const hasBarba = typeof barba !== "undefined";

if (hasGSAP && gsap.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

function animateText(container = document) {
  if (!hasGSAP) return;

  container.querySelectorAll(".fx-text").forEach(el => {
    if (el.dataset.fxDone) return;
    el.dataset.fxDone = "true";

    const text = el.innerText;
    el.innerHTML = "";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.innerHTML = char === " " ? "&nbsp;" : char;
      span.style.opacity = "0";
      span.style.transform = "translateY(10px)";
      span.style.display = "inline-block";

      el.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        y: 0,
        delay: i * 0.04,
        duration: 0.35,
        ease: "power2.out"
      });
    });
  });
}

function initSlideshow(container = document) {
  const slides = container.querySelectorAll(".slide");
  if (!slides.length) return;

  let index = 0;
  slides[0].classList.add("active");

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3500);
}

function initQuotes(container = document) {
  const cards = container.querySelectorAll(".quote-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => observer.observe(card));
}

function initMusic(container = document) {
  if (!container.querySelector("#audioPlayer")) return;

  const player = container.querySelector("#audioPlayer");
  const songs = container.querySelectorAll(".song-item");

  const currentCover = container.querySelector("#current-cover");
  const currentTitle = container.querySelector("#current-title");
  const currentArtist = container.querySelector("#current-artist");
  const playPauseBtn = container.querySelector("#play-pause-btn");
  const progressFill = container.querySelector(".progress-fill");
  const progressBar = container.querySelector(".progress-bar");
  const currentTimeEl = container.querySelector("#current-time");
  const durationEl = container.querySelector("#duration");

  if (!player || !playPauseBtn || !progressBar) return;

  const queue = [];
  let currentIndex = -1;

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  function setPlayingUI(isPlaying) {
    playPauseBtn.textContent = isPlaying ? "❚❚" : "▶";
  }

  function loadSong(index, autoplay = true) {
    if (index < 0 || index >= queue.length) return;
    const song = queue[index];

    player.src = song.src;
    if (currentCover) currentCover.src = song.cover || "/assets/media/placeholder.png";
    if (currentTitle) currentTitle.textContent = song.title;
    if (currentArtist) currentArtist.textContent = song.artist;

    currentIndex = index;

    if (autoplay) {
      player.play().catch(() => {});
      setPlayingUI(true);
    } else {
      setPlayingUI(false);
    }
  }

  function enqueueAndPlay(songEl) {
    const src = songEl.dataset.src;
    const cover = songEl.dataset.cover;
    const title = songEl.querySelector("strong")?.textContent || "Unknown";
    const artist = songEl.querySelector("span")?.textContent || "Unknown";

    const existingIndex = queue.findIndex(s => s.src === src);
    if (existingIndex !== -1) {
      loadSong(existingIndex, true);
      return;
    }

    queue.push({ src, cover, title, artist });
    loadSong(queue.length - 1, true);
  }

  songs.forEach(songEl => {
    songEl.addEventListener("click", () => enqueueAndPlay(songEl));
  });

  playPauseBtn.addEventListener("click", () => {
    if (!player.src) return;

    if (player.paused) {
      player.play().catch(() => {});
      setPlayingUI(true);
    } else {
      player.pause();
      setPlayingUI(false);
    }
  });

  player.addEventListener("timeupdate", () => {
    if (!player.duration) return;

    const percent = (player.currentTime / player.duration) * 100;
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(player.currentTime);
    if (durationEl) durationEl.textContent = formatTime(player.duration);
  });

  progressBar.addEventListener("click", e => {
    if (!player.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, offsetX / rect.width));
    player.currentTime = percent * player.duration;
  });

  player.addEventListener("play", () => setPlayingUI(true));
  player.addEventListener("pause", () => setPlayingUI(false));

  player.addEventListener("ended", () => {
    if (currentIndex + 1 < queue.length) {
      loadSong(currentIndex + 1, true);
    } else {
      setPlayingUI(false);
    }
  });
}

function initSocialTabs(container = document) {
  const tabs = container.querySelectorAll(".social-tab");
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.onclick = () => {
      const target = tab.dataset.social;

      container
        .querySelectorAll(".social-tab")
        .forEach(t => t.classList.remove("active"));

      container
        .querySelectorAll(".social-panel")
        .forEach(p => p.classList.remove("active"));

      tab.classList.add("active");

      const panel = container.querySelector(`#${target}`);
      if (panel) panel.classList.add("active");
    };
  });
}

function initScrollFX(container = document) {
  if (!hasGSAP || !gsap.ScrollTrigger) return;

  container.querySelectorAll("section").forEach(section => {
    const h2 = section.querySelector("h2");
    if (!h2) return;

    gsap.from(h2, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        once: true
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    });
  });
}

function initPage(container = document) {
  animateText(container);
  initSlideshow(container);
  initQuotes(container);
  initMusic(container);
  animateSales(container);
  initSocialTabs(container);
  initScrollFX(container);
}

if (hasBarba) {
  barba.init({
    transitions: [
      {
        once({ next }) {
          initPage(next.container);
        },
        enter({ next }) {
          gsap.fromTo(
            next.container,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
          window.scrollTo(0, 0);
          initPage(next.container);
        },
        after({ next }) {
          initPage(next.container);
        }
      }
    ]
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPage(document);
})
