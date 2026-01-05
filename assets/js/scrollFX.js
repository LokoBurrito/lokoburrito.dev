export function scrollTitles() {
  document.querySelectorAll("section").forEach(sec => {
    gsap.from(sec.querySelector("h2"), {
      scrollTrigger: {
        trigger: sec,
        start: "top 80%"
      },
      y: 40,
      opacity: 0,
      duration: 0.6
    });
  });
}
