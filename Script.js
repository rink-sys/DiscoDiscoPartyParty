const output = document.getElementById('output');
const keys = document.querySelectorAll('.key');

document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();  // Capture the pressed key
    playSound(key);  // Call the playSound function
});

// Map keys to musical frequencies (in Hz)
const discoNotes = {
    'a': 261.63,  // C note
    's': 293.66,  // D note
    'd': 329.63,  // E note
    'f': 349.23   // F note
};

// Function to play a sound based on the key pressed
function playSound(key) {
    const context = new (window.AudioContext || window.webkitAudioContext)();  // Create an AudioContext
    const keyDiv = document.createElement('div');
keyDiv.classList.add('key-visual');
keyDiv.textContent = key.toUpperCase();
document.body.appendChild(keyDiv);

setTimeout(() => {
    keyDiv.remove();
}, 500); // Remove after 0.5 seconds


    // Check if the pressed key is in our notes
    if (discoNotes[key]) {
        const osc = context.createOscillator();  // Create an oscillator (sound generator)
        osc.frequency.value = discoNotes[key];  // Set the frequency based on the key pressed
        osc.type = 'sine';  // You can change this to 'square', 'triangle', or 'sawtooth' for different sounds
        osc.connect(context.destination);  // Connect the oscillator to the speakers

        osc.start();  // Start the sound
        osc.stop(context.currentTime + 0.5);  // Stop the sound after 0.5 seconds
    }
}


keys.forEach(key => {
    key.addEventListener('click', () => {
        let keyValue = key.textContent;

        // Handle space and backspace separately
        if (key.id === 'space') {
            output.value += ' ';
        } else if (key.id === 'backspace') {
            output.value = output.value.slice(0, -1);
        } else {
            output.value += keyValue;
        }
    });
});
