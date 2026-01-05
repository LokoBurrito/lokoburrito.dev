import { pageTransition, pageEnter } from "./transitions.js";
import { animateText } from "./textFX.js";

barba.init({
  transitions: [
    {
      leave() {
        return pageTransition();
      },
      enter() {
        pageEnter();
        animateText();
      }
    }
  ]
});

window.addEventListener("load", animateText);

function animateProjects() {
  gsap.from(".project-card", {
    opacity: 0,
    y: 40,
    stagger: 0.15,
    duration: 0.6,
    ease: "power2.out"
  });
}

barba.hooks.afterEnter(() => {
  if (document.querySelector("[data-barba-namespace='projects']")) {
    animateProjects();
  }
});

function animateAbout() {
  gsap.from(".about-block", {
    opacity: 0,
    x: -30,
    stagger: 0.2,
    duration: 0.6,
    ease: "power2.out"
  });
}

barba.hooks.afterEnter(() => {
  if (document.querySelector("[data-barba-namespace='about']")) {
    animateAbout();
  }
});
