function initQuotes(container = document) {
  const cards = container.querySelectorAll(".quote-card");
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // prevent re-trigger
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach(card => observer.observe(card));
}

/* HARD REFRESH SUPPORT */
document.addEventListener("DOMContentLoaded", () => {
  initQuotes(document);
});

/* BARBA SUPPORT */
if (window.barba) {
  barba.hooks.afterEnter(({ next }) => {
    if (next.namespace === "quotes") {
      initQuotes(next.container);
    }
  });
}
