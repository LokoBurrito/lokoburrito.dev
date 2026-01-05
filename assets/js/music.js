function initMusic(container = document) {
  const player = container.querySelector("#audioPlayer");
  const songs = container.querySelectorAll(".song");

  if (!player || !songs.length) return;

  songs.forEach(song => {
    song.onclick = () => {
      player.src = song.dataset.src;
      player.play();
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMusic(document);
});

if (window.barba) {
  barba.hooks.afterEnter(({ next }) => {
    if (next.namespace === "music") {
      initMusic(next.container);
    }
  });
}
