export function animateText() {
  document.querySelectorAll(".fx-text").forEach(el => {
    const text = el.innerText;
    el.innerHTML = "";

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.innerText = char === " " ? "\u00A0" : char;
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
