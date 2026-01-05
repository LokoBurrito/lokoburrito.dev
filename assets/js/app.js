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
