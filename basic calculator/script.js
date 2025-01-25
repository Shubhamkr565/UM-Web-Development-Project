// Select the input field where the results and input will be displayed
const inputfield = document.getElementById('inputnum'); 
const buttons = document.querySelectorAll('.btn'); // Select all buttons with the class 'btn'

// Initialize variables for the calculator's logic
let currentInput = ""; // Stores the currently entered number or operand
let previousInput = ""; // Stores the previous number before an operator
let operator = ""; // Stores the selected operator (e.g., +, -, *, /, %)

// Add event listeners to all buttons
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.innerText; // Get the text of the button clicked

        if (value === 'AC') {
            // Clear everything when the 'AC' button is clicked
            currentInput = ""; 
            previousInput = ""; 
            operator = ""; 
            inputfield.value = ""; 
        } else if (value === 'X') {
            // Delete the last character of the current input
            currentInput = currentInput.slice(0, -1);
            inputfield.value = previousInput + " " + operator + " " + currentInput; // Update the display
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            // Handle operator buttons (+, -, *, /, %)
            if (currentInput) {
                
                if (previousInput) {
                    
                    previousInput = calculate(Number(previousInput), Number(currentInput), operator);
                    inputfield.value = previousInput + " " + operator + " "; // Display the ongoing calculation with operator
                } else {
                    // Otherwise, just save the current input as previous
                    previousInput = currentInput;
                    inputfield.value = previousInput + " " + operator + " "; // Display the operator
                }
                currentInput = ""; 
            }
            operator = value; 
            inputfield.value = previousInput + " " + operator + " "; // Update display with operator
        } else if (value === '=') {
            // Perform the calculation when the '=' button is clicked
            if (currentInput && previousInput && operator) {
                const result = calculate(Number(previousInput), Number(currentInput), operator);
                inputfield.value = previousInput + " " + operator + " " + currentInput + " = " + result; // Display the full calculation with result
                previousInput = result; 
                currentInput = ""; 
                operator = ""; 
            }
        } else {
            // Handle number and decimal point input
            currentInput += value; // Append the clicked button's value to the current input
            inputfield.value = previousInput + " " + operator + " " + currentInput; // Display ongoing calculation with operator
        }
    });
});

// Function to perform calculations
function calculate(a, b, operator) {
    // Perform the operation based on the operator
    switch (operator) {
        case '+':
            return a + b; 
        case '-':
            return a - b; 
        case '*':
            return a * b; 
        case '/':
            return b !== 0 ? a / b : "Error"; 
        case '%':
            return a % b; 
        default:
            return ""; // Return an empty string for invalid cases
    }
}


