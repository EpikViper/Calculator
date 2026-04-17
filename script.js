const add = function(a,b) {
    return a + b;
}

const subtract = function(a,b) {
    return a - b;
}

const multiply = function(a,b) {
    return a * b;
}

const divide = function(a,b) {
    return a / b;
}

let firstNumber = 0;
let operatorFunction;
let secondNumber = 0;
let lastUpdated = 0;
let lastClicked = 'number';

const operate = function(operator) {
    if(operator != '+' && operator != '-' && operator != '*' && operator != '/') return 'Error';
    
    switch(operator) {
        case('+'): return add;
        case('-'): return subtract;
        case('*'): return multiply;
        case('/'): return divide;
    }
}


const updateVariables = function(number) {
    if(lastUpdated == 1){
        firstNumber = firstNumber * 10 + number;
    } else {
        secondNumber = secondNumber * 10 + number;
    }
}


const numbers = document.querySelectorAll('.number');
const displayText = document.querySelector('.display p');
const clearButton = document.querySelector('#clear');

numbers.forEach((button) => {
    button.addEventListener('click', (e) => {
        let number = Number(e.target.textContent);
        if(lastClicked == 'equals') {
            lastUpdated = 1;
            firstNumber = 0;
            lastNumber = 0;
        } else if (lastUpdated == 0) lastUpdated = 1;

        updateVariables(number);
        lastUpdated == 1 ? displayText.textContent = `${firstNumber}` : displayText.textContent = `${secondNumber}`;
        lastClicked = 'number';
    })
})

clearButton.addEventListener('click', () => {
    lastUpdated = 0;
    firstNumber = 0;
    secondNumber = 0;
    lastClicked = 'clear';
    displayText.textContent = 0;
})

const operators = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('#equals');

operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        let operator = e.target.textContent;
        if(lastUpdated == 0) {
            displayText.textContent = operator;
        } else if(lastUpdated == 1) {
            lastUpdated *= -1;
            displayText.textContent = operator;
        } else if(lastClicked == 'number') {
            if(operatorFunction == divide && secondNumber == 0) {
                displayText.textContent = "Can't do that bro";
            } else {
                firstNumber = operatorFunction(firstNumber, secondNumber);
                let firstNumberString = firstNumber.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                    }
                )   
                secondNumber = 0;
                displayText.textContent = firstNumberString;
            }
        }
        operatorFunction =  operate(operator);
        lastClicked = 'operator';
    })
})

equalsButton.addEventListener('click', () => {
    if(operatorFunction == divide && secondNumber == 0) {
        displayText.textContent = "Can't do that bro";
        firstNumber = 0;
    } else {
        firstNumber = operatorFunction(firstNumber, secondNumber);
        let firstNumberString = firstNumber.toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
            }
        )   
        displayText.textContent = firstNumberString;
    }
    secondNumber = 0;
    lastUpdated = -1;
    lastClicked = 'equals';
})
