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

barba.hooks.afterEnter(({ next }) => {
  if (next.namespace === "summary") {
    initSocialTabs(next.container);
  }
});

if (!window.barba) {
  document.addEventListener("DOMContentLoaded", initSocialTabs);
}
