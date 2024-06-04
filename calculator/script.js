const inputDisplay = document.getElementById("input");

// Add input value and arithmetic operator to the display.
function addInputValue(value) {
    // Check if the current value is an error message or a result
    if (inputDisplay.value.includes('=') || inputDisplay.value.includes('Cannot divide by zero') || inputDisplay.value.includes('Error')) {
        inputDisplay.value = '';
    }
    inputDisplay.value += value;
}

// Clear value and operator from the display.
function clearValue() {
    inputDisplay.value = '';
}

// Calculate the result of the arithmetic operation on the display.
// Throw an error if a number has been divided by zero.
function calculateResult() {
    try {
       if(inputDisplay.value.includes("/0")) {
        throw new Error("Division by zero");
       }
       let result = eval(inputDisplay.value);
       inputDisplay.value += `\n\n= ${result}`;

    } catch (error) {
        if (error.message === "Division by zero") {
            inputDisplay.value = "Cannot divide by zero";
        } else {
            inputDisplay.value = "Error";
        }
        
    }  
}

// Delete input value from the last character.
function deleteInputValue() {
    const lines = inputDisplay.value.split('\n');

    if (lines.length > 1) {
        inputDisplay.value = lines[0];
    } else {
        inputDisplay.value = inputDisplay.value.slice(0, -1);
    }
}

// Handles the events of keypress.
// Ensures giving input from the keyboard.
function handleKeyPress(event) {
    const key = event.key;
    const validKeys = "0123456789.+-/*";

    if(validKeys.includes(key)) {
        addInputValue(key);
    } else if(key === "Enter") {
        calculateResult();
    } else if(key === "Backspace") {
        deleteInputValue();
    } else if(key === "Escape") {
        clearValue();
    }
}

// Get all buttons from the HTML
const buttons = document.querySelectorAll('.btn');

// Loop through the document to listen for events that happen when a button is clicked.
buttons.forEach(button => {
    button.addEventListener('click', () => {
        addInputValue(button.getAttribute('data-value'));
    });
});

// Event listener to handle various functions in the program on click.
document.getElementById("reset-btn").addEventListener('click', clearValue);
document.getElementById("equal-btn").addEventListener('click', calculateResult);
document.getElementById("delete-btn").addEventListener('click', deleteInputValue);

// Event listener to handle keypress by the user.
document.addEventListener('keydown', handleKeyPress);