// Load the background disco music (with gaps)
const discoBackground = new Audio('assests/Earth, Wind & Fire - September (Official HD Video) (mp3cut.net).mp3');  // Update this path if needed
discoBackground.loop = true;  // Set the background track to loop
discoBackground.volume = 0.5;  // Adjust the volume

// Function to start background music on button click
function startMusic() {
    discoBackground.play();  // Start playing the background music
}

// Add an event listener for the button click
document.getElementById('startButton').addEventListener('click', startMusic);

// Define the audio files for the key sounds
const discoSounds = {
    'a': 'sounds/a.mp3',  // Sound for key 'a'
    's': 'sounds/s.mp3',  // Sound for key 's'
    'd': 'sounds/d.mp3',  // Sound for key 'd'
    'f': 'sounds/f.mp3'   // Sound for key 'f'
};

// Function to play the sound based on the key pressed
function playSound(key) {
    if (discoSounds[key]) {
        const audio = new Audio(discoSounds[key]);  // Create an Audio object with the appropriate MP3
        audio.play();  // Play the sound fragment
        showKeyPressed(key);  // Display the key pressed
    }
}

// Function to display the key pressed on the screen
function showKeyPressed(key) {
    const keyDisplay = document.getElementById('keyDisplay');
    keyDisplay.textContent = `Key Pressed: ${key.toUpperCase()}`;  // Update display with the key pressed
}

// Event listener to detect key presses
document.addEventListener("keydown", function(event) {
    const key = event.key.toLowerCase();  // Get the pressed key and convert to lowercase
    playSound(key);  // Call playSound function to play the corresponding sound
});
