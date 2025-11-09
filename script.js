function revealMessage() {
  const message = document.querySelector(".message");
  const hidden = document.querySelector(".hidden-message");
  const wishText = document.querySelector(".wish-text");
  const song = document.getElementById("birthdaySong");
  const playMusicBtn = document.getElementById("playMusicBtn");

  // Hide the click message and show the surprise
  message.style.display = "none";
  hidden.style.display = "flex";
  hidden.style.flexDirection = "column";
  hidden.style.alignItems = "center";

  // ✅ Fix for Burmese: use substring typing (never breaks clusters)
  // ✅ Fix for Burmese: use substring typing (never breaks clusters)
  const fullText = wishText.innerHTML.trim();
  wishText.innerHTML = "";
  let i = 0;

  function typeWriter() {
    if (i <= fullText.length) {
      wishText.innerHTML = fullText.substring(0, i);
      i++;
      setTimeout(typeWriter, 50); // typing speed
    } else {
      // ✅ when finished typing, fade in the music button
      if (playMusicBtn) {
        playMusicBtn.classList.add("show");
      }
    }
  }

  setTimeout(typeWriter, 300); // short delay before typing

  // 🎵 Music button setup
  if (song && playMusicBtn) {
    playMusicBtn.addEventListener("click", (event) => {
      event.stopPropagation(); // prevent re-opening the box
      if (song.paused) {
        song.currentTime = 0;
        song
          .play()
          .then(() => {
            playMusicBtn.textContent = "⏸️ Pause Song";
          })
          .catch((err) => {
            console.error("Playback failed:", err);
            alert("Your browser blocked autoplay — just click again!");
          });
      } else {
        song.pause();
        playMusicBtn.textContent = "🎵 Play Birthday Song";
      }
    });
  }
}
