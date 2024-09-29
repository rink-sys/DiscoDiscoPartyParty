// Load background disco music immediately
const discoBackground = new Audio('assets/bg.mp3');
discoBackground.loop = true;
discoBackground.volume = 0.5;
discoBackground.play();

// Define the audio files for key sounds
const discoSounds = {
    'a': 'sounds/a.mp3',
    's': 'sounds/s.mp3',
    'd': 'sounds/d.mp3',
    'f': 'sounds/f.mp3'
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
    const keyDisplay = document.getElementById('keyDisplay');
    keyDisplay.textContent = `Key Pressed: ${key.toUpperCase()}`;
}

// Apply rainbow effect
function applyRainbowEffect(onScreenKey) {
    if (onScreenKey) {
        onScreenKey.classList.add('rainbow-active');

        // Remove rainbow effect after 1.5s
        setTimeout(() => {
            onScreenKey.classList.remove('rainbow-active');
        }, 500);
    }
}

// Handle keyboard key press
document.addEventListener("keydown", function(event) {
    const keyPressed = event.key.toLowerCase();
    const onScreenKey = [...document.querySelectorAll(".key")].find(el => el.textContent.trim().toLowerCase() === keyPressed);

    if (onScreenKey) {
        applyRainbowEffect(onScreenKey);
        playSound(keyPressed);
        showKeyPressed(keyPressed);
    }
});

// Handle mouse click on the on-screen keys
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', function () {
        const keyText = this.textContent.trim().toLowerCase();
        applyRainbowEffect(this);
        playSound(keyText);
        showKeyPressed(keyText);
    });
});
