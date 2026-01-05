export function pageTransition() {
  const tl = gsap.timeline();
  tl.to("main", {
    opacity: 0,
    duration: 0.4,
    ease: "power1.out"
  });
  return tl;
}

export function pageEnter() {
  gsap.from("main", {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: "power2.out"
  });
}
