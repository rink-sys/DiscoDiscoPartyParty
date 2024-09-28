const output = document.getElementById('output');
const keys = document.querySelectorAll('.key');

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
