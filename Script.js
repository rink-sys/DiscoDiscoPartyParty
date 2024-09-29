
// Define the audio files for key sounds
const discoSounds = {
  a: "assests/A.mp3",
  s: "assests/B.mp3",
  d: "assests/Db.mp3",
  f: "assests/osu-hit-sound.mp3",
  g: "assests/single_drum_kicks.mp3",
  h: "assests/single_drum_kicks (1).mp3",
  j: "assests/crisp_snare.mp3",
  k: "assests/tom_soun (1).mp3",
  l: "assests/tom_soun.mp3",
};

// Play sound based on key press
function playSound(key) {
  if (discoSounds[key]) {
    const audio = new Audio(discoSounds[key]);
    audio.play();
  }
}

// Display the key pressed on the screen
function showKeyPressed(key) {
  const keyDisplay = document.getElementById("keyDisplay");
  keyDisplay.textContent = `Key Pressed: ${key.toUpperCase()}`;
}

// Apply rainbow effect
function applyRainbowEffect(onScreenKey) {
  if (onScreenKey) {
    onScreenKey.classList.add("rainbow-active");

    // Remove rainbow effect after 1.5s
    setTimeout(() => {
      onScreenKey.classList.remove("rainbow-active");
    }, 500);
  }
}

// Handle keyboard key press
document.addEventListener("keydown", function (event) {
  const keyPressed = event.key.toLowerCase();
  const onScreenKey = [...document.querySelectorAll(".key")].find(
    (el) => el.textContent.trim().toLowerCase() === keyPressed
  );

  if (onScreenKey) {
    applyRainbowEffect(onScreenKey);
    playSound(keyPressed);
    showKeyPressed(keyPressed);
  }
});

// Handle mouse click on the on-screen keys
document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", function () {
    music.play();
    const keyText = this.textContent.trim().toLowerCase();
    applyRainbowEffect(this);
    playSound(keyText);
    showKeyPressed(keyText);
  });
  const button = document.getElementById("S");

  // Example condition: If the button ID is 'S'
  //   if (button.id === "S") {
  //     button.classList.add("large-padding"); // Add class to increase padding
  //   }
});

var music = document.getElementById('music');
music.addEventListener('timeupdate', function() {
    var gameprogress = music.currentTime;
    var progressremaining = music.duration;
    $('.progress_range').stop(true,true).animate({'width':(gameprogress +.25)/progressremaining*100+'%'},250,'linear');
});