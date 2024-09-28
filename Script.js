const output = document.getElementById('output');
const keys = document.querySelectorAll('.key');

let audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Map keys to musical frequencies (in Hz)
const discoNotes = {
    'a': 261.63,  // C note
    's': 293.66,  // D note
    'd': 329.63,  // E note
    'f': 349.23   // F note
};

const activeOscillators = {}; // Track active oscillators

document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();
    if (discoNotes[key]) {
        playSound(key); // Play sound only if the key is valid
    }
});

document.addEventListener("keyup", function(event) {
    stopAllSounds(); // Stop all sounds on key release
});

// Function to play a sound based on the key pressed
function playSound(key) {
    // Stop the current oscillator for this key if it exists
    if (activeOscillators[key]) {
        stopSound(key);
    }

    const osc = audioContext.createOscillator(); // Create an oscillator
    osc.frequency.setValueAtTime(discoNotes[key], audioContext.currentTime); // Set frequency
    osc.type = 'sine'; // Sine wave type

    const gainNode = audioContext.createGain(); // Create a gain node
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start volume at 0
    gainNode.gain.linearRampToValueAtTime(1.5, audioContext.currentTime + 0.1); // Fade in

    osc.connect(gainNode); // Connect oscillator to gain node
    osc.start(); // Start the sound

    // Clean up when the oscillator ends
    osc.onended = () => {
        delete activeOscillators[key]; // Remove from active oscillators
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5); // Fade out
        setTimeout(() => {
            gainNode.disconnect(); // Disconnect gain node after fade out
        }, 500); // Wait for fade out to finish
    };

    activeOscillators[key] = osc; // Store the oscillator
}

// Function to stop sound for a specific key
function stopSound(key) {
    const osc = activeOscillators[key];
    if (osc) {
        osc.stop(); // Stop the oscillator immediately
        delete activeOscillators[key]; // Remove from active oscillators
    }
}

// Function to stop all sounds
function stopAllSounds() {
    for (const key in activeOscillators) {
        stopSound(key); // Stop each active oscillator
    }
}

// Click handling for visual keys
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent.toLowerCase();
        
        // Handle space and backspace separately
        if (key.id === 'space') {
            output.value += ' ';
        } else if (key.id === 'backspace') {
            output.value = output.value.slice(0, -1);
        } else {
            output.value += keyValue; // Add key value to output
            playSound(keyValue); // Play sound when key is clicked
        }
    });
});
