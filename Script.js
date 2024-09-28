const output = document.getElementById('output');
const keys = document.querySelectorAll('.key');

// Create an AudioContext that will be reused
const context = new (window.AudioContext || window.webkitAudioContext)();

// Map keys to musical frequencies (in Hz)
const discoNotes = {
    'a': 261.63,  // C note
    's': 293.66,  // D note
    'd': 329.63,  // E note
    'f': 349.23   // F note
};

// Function to play a sound based on the key pressed
function playSound(key) {
    if (discoNotes[key]) {
        const osc = context.createOscillator();  // Create an oscillator (sound generator)
        osc.frequency.value = discoNotes[key];  // Set the frequency based on the key pressed
        osc.type = 'sine';  // You can change this to 'square', 'triangle', or 'sawtooth' for different sounds

        const gainNode = context.createGain();  // Create a gain node (controls volume)
        osc.connect(gainNode);
        gainNode.connect(context.destination);
        gainNode.gain.setValueAtTime(0.2, context.currentTime);  // Set a lower volume for clearer sound

        osc.start();  // Start the sound
        osc.stop(context.currentTime + 0.5);  // Stop the sound after 0.5 seconds
    }
}

// Event listener to trigger the playSound function on key press
document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();  // Capture the pressed key
    playSound(key);  // Call the playSound function
});
