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
      span.style.opacity = 0;
      span.style.transform = "translateY(10px)";
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

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
}

function initMusic(container = document) {
  const player = container.querySelector("#audioPlayer");
  const songs = container.querySelectorAll(".song");

  if (!player || !songs.length) return;

  songs.forEach(song => {
    song.onclick = () => {
      player.src = song.dataset.src;
      player.play().catch(() => {});
    };
  });
}

function animateSales(container = document) {
  const stats = container.querySelectorAll(".stat-number");
  if (!stats.length) return;

  stats.forEach(stat => {
    const target = Number(stat.dataset.value);
    if (!target) return;

    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        stat.textContent = target >= 1000 ? `$${target.toLocaleString()}` : target;
        clearInterval(timer);
      } else {
        stat.textContent = target >= 1000 ? `$${current.toLocaleString()}` : current;
      }
    }, 16);
  });
}

function initSocialTabs(container = document) {
  const tabs = container.querySelectorAll(".social-tab");
  const panels = container.querySelectorAll(".social-panel");
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.onclick = () => {
      const target = tab.dataset.social;

      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      container.querySelector(`#${target}`)?.classList.add("active");
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
      duration: 0.6
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
    transitions: [{
      leave() {
        return gsap.to("main", { opacity: 0, duration: 0.3 });
      },
      enter({ next }) {
        gsap.from(next.container, { opacity: 0, y: 20, duration: 0.4 });
        initPage(next.container);
      }
    }]
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initPage(document);
});
