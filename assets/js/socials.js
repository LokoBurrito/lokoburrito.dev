function initSocialTabs() {
  const tabs = document.querySelectorAll(".social-tab");
  const panels = document.querySelectorAll(".social-panel");

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.social;

      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });
}

/* Barba support */
document.addEventListener("DOMContentLoaded", initSocialTabs);

if (window.barba) {
  barba.hooks.afterEnter(({ next }) => {
    if (next.namespace === "summary") {
      initSocialTabs();
    }
  });
}
