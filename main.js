let outputDisplay,
    outputComposite,
    input = '',
    memory = 0,
    operator = '+';

function calculate() {
    let number = parseFloat(input);
    switch (operator) {
        case '/':
            memory /= number;
            break;
        case '*':
            memory *= number;
            break;
        case '-':
            memory -= number;
            break;
        case '+':
            memory += number;
    }
}

// erase once

function calculator(element) {
    button = element.target.innerHTML;
    // get Input
    if (button.match(/[0-9.]/gi)) {
        if (input === '' && button === '.') {
            input += '0.';
            outputDisplay.innerHTML = input;
        } else if (!(input === '' && button === '0')) {
            input += button;
            outputDisplay.innerHTML = input;
        }
    }

    else if (button.match(/[\/*\-+]/gi)) {
        if (input === '') {
            operator = button;
            outputComposite.innerHTML = memory + ' ' + operator;
        } else {
            calculate();
            operator = button;
            input = '';
            outputDisplay.innerHTML = memory;
            outputComposite.innerHTML = memory + ' ' + operator;
        }
    }

    // perform calculation and display result
    else if (button.match(/=/gi) && input !== '') {
        calculate();
        input = '';
        outputDisplay.innerHTML = memory;
        outputComposite.innerHTML = memory;
    }

    // clear input
    else if (button.match(/CE/gi)) {
        input = '';
        outputDisplay.innerHTML = 0;
    }
    // clear all
    else if (button.match(/AC/gi)) {
        input = '';
        memory = 0;
        operator = '+';
        outputDisplay.innerHTML = 0;
        outputComposite.innerHTML = 0;
    }

    // exceeding characters
    if (input.length >= 12 || String(memory).length >= 12) {
        outputDisplay.innerHTML = ':(';
        outputComposite.innerHTML = 'Exceeds character limit.';
        console.log(memory);
    }
}

(function () {
    let buttons = document.getElementsByClassName('btn');
    outputDisplay = document.getElementsByClassName('output-display')[0];
    outputComposite = document.getElementsByClassName('output-composite')[0];
    outputDisplay.innerHTML = 0;
    outputComposite.innerHTML = 0;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = calculator;
    }
})();