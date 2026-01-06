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

document.addEventListener("DOMContentLoaded", () => {
  initQuotes(document);
});

if (window.barba) {
  barba.hooks.afterEnter(({ next }) => {
    if (next.namespace === "quotes") {
      initQuotes(next.container);
    }
  });
}
