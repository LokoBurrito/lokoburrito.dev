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

document.addEventListener("DOMContentLoaded", () => {
  animateStats(document);
});

if (window.barba) {
  barba.hooks.afterEnter(({ next }) => {
    if (next.namespace === "sales") {
      animateStats(next.container);
    }
  });
}
