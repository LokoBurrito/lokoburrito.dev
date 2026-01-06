/* health checks */
const hasGSAP = typeof gsap !== "undefined";
const hasBarba = typeof barba !== "undefined";

if (hasGSAP && gsap.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/* scroll effects (forgot to include oops) */
function scrollTitles(container = document) {
  if (!hasGSAP || !gsap.ScrollTrigger) return;

  container.querySelectorAll("section").forEach(section => {
    const title = section.querySelector("h2");
    if (!title) return;

    gsap.from(title, {
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

/* text effects */
function animateText(container = document) {
  if (!hasGSAP) return;

  container.querySelectorAll(".fx-text").forEach(el => {
    const text = el.innerText;
    el.innerHTML = "";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.innerHTML = char === " " ? "&nbsp;" : char;
      span.style.opacity = 0;
      el.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        y: 0,
        delay: i * 0.05,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });
}

/* projects page */
function animateProjects(container = document) {
  if (!hasGSAP) return;

  const cards = container.querySelectorAll(".project-card");
  if (!cards.length) return;

  gsap.from(cards, {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.6,
    ease: "power2.out"
  });
}

/* about */
function animateAbout(container = document) {
  if (!hasGSAP) return;

  const blocks = container.querySelectorAll(".about-block");
  if (!blocks.length) return;

  gsap.from(blocks, {
    opacity: 0,
    x: -30,
    stagger: 0.2,
    duration: 0.6,
    ease: "power2.out"
  });
}

/* slideshow */
let slideshowInterval = null;

function initSlideshow(container = document) {
  const slides = container.querySelectorAll(".slide");
  if (!slides.length) return;

  let index = 0;
  slides[0].classList.add("active");

  clearInterval(slideshowInterval);
  slideshowInterval = setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3500);
}

/* quotes */
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

/* music player */
function initMusic(container = document) {
  const player = container.querySelector("#audioPlayer");
  const songs = container.querySelectorAll(".song");
  if (!player || !songs.length) return;

  songs.forEach(song => {
    song.onclick = () => {
      player.src = song.dataset.src;
      player.play();
    };
  });
}

/* money money */
function animateStats(container = document) {
  const stats = container.querySelectorAll(".stat-number");
  if (!stats.length) return;

  stats.forEach(stat => {
    const target = Number(stat.dataset.value);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        stat.textContent =
          target >= 1000 ? `$${target.toLocaleString()}` : target;
        clearInterval(interval);
      } else {
        stat.textContent =
          target >= 1000 ? `$${current.toLocaleString()}` : current;
      }
    }, 16);
  });
}

/* social tabs */
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

/* transitions */
function pageTransition() {
  if (!hasGSAP) return;
  return gsap.to("main", { opacity: 0, duration: 0.4 });
}

function pageEnter() {
  if (!hasGSAP) return;
  gsap.from("main", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power2.out"
  });
}

/* barba init */
if (hasBarba) {
  barba.init({
    transitions: [{
      leave() {
        return pageTransition();
      },
      enter({ next }) {
        pageEnter();
        animateText(next.container);
      }
    }]
  });

  barba.hooks.afterEnter(({ next }) => {
    initSlideshow(next.container);
    initQuotes(next.container);
    initMusic(next.container);
    animateStats(next.container);
    initSocialTabs(next.container);
    scrollTitles(next.container);

    if (next.namespace === "projects") animateProjects(next.container);
    if (next.namespace === "about") animateAbout(next.container);
  });
}

/* fallback*/
document.addEventListener("DOMContentLoaded", () => {
  animateText();
  animateProjects();
  animateAbout();
  initSlideshow();
  initQuotes();
  initMusic();
  animateStats();
  initSocialTabs();
  scrollTitles();
});
