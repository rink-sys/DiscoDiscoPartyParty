// Define the audio files for key sounds
const discoSounds = {
  a: "assets/A.mp3",
  s: "assets/B.mp3",
  d: "assets/Db.mp3",
  f: "assets/osu-hit-sound.mp3",
  g: "assets/single_drum_kicks (1).mp3",
  h: "assets/single_drum_kicks.mp3",
  j: "assets/crisp_snare.mp3",
  k: "assets/tom_soun.mp3",
  l: "assets/tom_soun (1).mp3",
};

// Get elements
const keyDisplay = document.getElementById("keyDisplay");
const keyHighlight = document.getElementById("keyHighlight");
const highlightedKey = document.getElementById("highlightedKey");
const dancer = document.getElementById("dancer");

// Initialize score
let score = 0;
const scoreDisplay = document.getElementById('score');

// Variable to hold the inactivity timeout
let inactivityTimeout;

// Function to play sound based on key press
function playSound(key) {
  if (discoSounds[key]) {
    const audio = new Audio(discoSounds[key]);
    audio.play();
  }
}

// Function to show the key pressed on the screen
function showKeyPressed(key) {
  keyDisplay.textContent = `Key Pressed: ${key.toUpperCase()}`;
}

// Function to apply rainbow effect
function applyRainbowEffect(onScreenKey) {
  if (onScreenKey) {
    onScreenKey.classList.add("rainbow-active");
    setTimeout(() => {
      onScreenKey.classList.remove("rainbow-active");
    }, 500);
  }
}

// Function to update score
function updateScore() {
  score++;
  scoreDisplay.textContent = score;
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
    updateScore(); // Update score
    triggerDiscoEffect(); // Trigger disco effect
    resetInactivityTimer(); // Reset inactivity timer
  }
});

// Handle mouse click on the on-screen keys
document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", function () {
    const keyText = this.textContent.trim().toLowerCase();
    applyRainbowEffect(this);
    playSound(keyText);
    showKeyPressed(keyText);
    updateScore(); // Update score
    triggerDiscoEffect(); // Trigger disco effect
    resetInactivityTimer(); // Reset inactivity timer
  });
});

// Trigger disco effect
function triggerDiscoEffect() {
  // Add disco light effect to the body
  document.body.classList.add("disco-light");
  
  // Dance effect for the character
  dancer.style.transform = "translateY(-20px)"; // Move up
  setTimeout(() => {
    dancer.style.transform = "translateY(0)"; // Move back down
  }, 200);
}

// Function to reset the inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimeout);
  
  // Set the timer to remove the disco effect after 2 seconds
  inactivityTimeout = setTimeout(() => {
    document.body.classList.remove("disco-light");
  }, 2000);
}

// Music progress tracking
var music = document.getElementById('music');
music.addEventListener('timeupdate', function() {
  var gameprogress = music.currentTime;
  var progressremaining = music.duration;
  const progressRange = document.querySelector('.progress_range');
  
  // Update the progress range width based on current time
  progressRange.style.width = (gameprogress / progressremaining * 100) + '%';
});

// Start the music
music.play();
