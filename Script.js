// Define the audio files for key sounds
const discoSounds = {
  a: "assests/A.mp3",
  s: "assests/B.mp3",
  d: "assests/Db.mp3",
  f: "assests/osu-hit-sound.mp3",
  g: "assests/single_drum_kicks (1).mp3",
  h: "assests/single_drum_kicks.mp3",
  j: "assests/crisp_snare.mp3",
  k: "assests/tom_soun.mp3",
  l: "assests/tom_soun (1).mp3",
};

// Get elements
const keyDisplay = document.getElementById("keyDisplay");

const dancer = document.getElementById("dancer");


// Variable to hold the inactivity timeout
let inactivityTimeout;

// Function to play sound based on key press
// Function to play sound based on key press
function playSound(key) {
  const soundFile = discoSounds[key];
  if (soundFile) {
    const sound = new Audio(soundFile);
    sound.volume = 1.0; // Set the volume to maximum (1.0)
    sound.play().catch(err => console.log("Audio playback failed: ", err));
  } else {
    console.log(`No sound file for key: ${key}`);
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
    triggerDiscoEffect(); // Trigger disco effect
    resetInactivityTimer(); // Reset inactivity timer
  }

  
});


const myArray = ["#a414d9", "#ff802b", "#f9e105", "#34c7a5", "#5d50ce"];
function randomColor(myArray){
    return myArray[Math.floor(Math.random()*myArray.length)];
}




// Handle mouse click on the on-screen keys
document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", function () {
    const keyText = this.textContent.trim().toLowerCase();
    applyRainbowEffect(this);
    playSound(keyText);
    showKeyPressed(keyText);
    document.getElementById('music').play();
    triggerDiscoEffect(); // Trigger disco effect
    resetInactivityTimer(); // Reset inactivity timer
  });
});

// Trigger disco effect
function triggerDiscoEffect() {
  // Add disco light effect to the body
  document.body.classList.add("disco-light");
  
  // Dance effect for the female character
  dancer.style.transform = "translateY(-20px)"; // Move up
  setTimeout(() => {
    dancer.style.transform = "translateY(0)"; // Move back down
  }, 200);

  // Delay for the male character
  setTimeout(() => {
    dancer2.style.transform = "translateY(20px)"; // Move down
    setTimeout(() => {
      dancer2.style.transform = "translateY(0)"; // Move back up
    }, 200);
  }, 1); // 1 millisecond delay
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
