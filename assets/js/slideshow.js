let slideshowInterval = null;

function initSlideshow(container = document) {
  const slides = container.querySelectorAll(".slide");
  if (!slides.length) return;

  let index = 0;
  slides[0].classList.add("active");

  clearInterval(slideshowInterval);
  slideshowInterval = setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3500);
}
