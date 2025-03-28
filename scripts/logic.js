let parenthesis = false;
let result = 0;
let toggleCal = false;
let score = [0,0];

//for timer
let timer; 
let width = 100; 
let timeLeft = 0; 
let totalTime = 0;
let isPaused = false;
let timeout;
function insertInput(value) {
    let screen = document.getElementById("screen");
    let lastInput = screen.value.slice(-1);

    if("+-*/.%".includes(value) && "+-*/.%".includes(lastInput)) {
        return;
    }

    if (parenthesis === false && value === 'P') {
        value = "(";
        parenthesis = !parenthesis;
    } else if(value === 'P') {
        value = ")";
        parenthesis = !parenthesis;
    }

    if(screen.value === "SYNTAX ERROR") {
        screen.value = "";
        screen.value += value;
        return;
    }

    screen.value += value;
}

function deleteInput() {
    let screen = document.getElementById("screen");
    if(screen.value === "SYNTAX ERROR") {
        screen.value = "";
        return;
    }

    if (screen.value.charAt(screen.value.length-1) === '(' || screen.value.charAt(screen.value.length-1) === ')') {
        parenthesis = !parenthesis;
    }
    screen.value = screen.value.substring(0, (screen.value.length-1));
}
function clearInput() {
    let screen = document.getElementById("screen");
    screen.value = "";
}

function calculate() {
    let solve = document.getElementById("screen").value;
    result = solve;
    solve = solve.replace('^','**').replace('M','%');

    try {
        result = Function(`"use strict"; return (${solve})`)();
        result = Math.round(result * 100) / 100;
    } catch (error) {
        result = "SYNTAX ERROR";
    }
}

function startGame() {
    let screen = document.getElementById("screen");
    calculate(screen.value);
    console.log(result);
    if (result === "SYNTAX ERROR") {
        screen.value = "SYNTAX ERROR";
    } else {
        choicesContent();
        buttonAppear();
        setTimer(10);
        screen.value = "CHOOSE YOUR ANSWER";
        timeout = setTimeout(() => {
            toggleCalculator();
            startTimer();
        }, 500);
        
    }
}

function toggleCalculator() {
    console.log('I am triggered');
    toggleCal = !toggleCal;
    document.querySelectorAll('#calculator-button').forEach(button => {
        button.disabled = toggleCal;
    });
    if (toggleCal===false) {
        clearInput();
    }
    togglePause();
    clearTimeout(timeout);
}

function shift() {
    parenthesis = !parenthesis;
}

function choicesContent() {
    let buttons = [
        document.getElementById("output-button1"),
        document.getElementById("output-button2"),
        document.getElementById("output-button3"),
        document.getElementById("output-button4")
    ];
    let choices = new Set();
    let correctAnswer = Number.isInteger(result) ? result : parseFloat(result.toFixed(2));

    while (choices.size < 4) {
        let randomOffset = Math.floor(Math.random() * 20) - 10;
        if (randomOffset === 0) continue;

        let test = Math.abs(result + randomOffset);
        test = Number.isInteger(test) ? test : parseFloat(test.toFixed(2));

        choices.add(test);
    }

    let choicesArray = Array.from(choices);
    
    let correctPos = Math.floor(Math.random() * 4);

    choicesArray[correctPos] = correctAnswer;

    buttons.forEach((button, index) => {
        button.textContent = choicesArray[index];
    });
}

function setTimer(duration) {
    totalTime = duration;
    timeLeft = totalTime;
    width = 100;

    document.getElementById("timer-text").textContent = timeLeft.toFixed(2) + "s";
    document.getElementById("timer-bar").style.width = "100%";
    document.getElementById("timer-bar").style.backgroundColor = "rgb(76, 175, 80)";
    isPaused = false;
}

function startTimer() {
    clearInterval(timer);
    isPaused = false;

    let bar = document.getElementById("timer-bar");
    let text = document.getElementById("timer-text");

    timer = setInterval(() => {
        if (!isPaused) {
            width = (timeLeft / totalTime) * 100;
            bar.style.width = width + "%";
            text.textContent = timeLeft.toFixed(2) + "s";

            let red = Math.min(255, 255 - (width * 1.8));
            let green = Math.max(0, width * 1.8);
            bar.style.backgroundColor = `rgb(${red}, ${green}, 0)`;

            timeLeft -= 0.1;

            if (timeLeft <= 0) {
                clearInterval(timer);
                text.textContent = "0.00s";
            }
        }
    }, 100);
}

function togglePause() {
    if (isPaused) {
        isPaused = false;
    } else {
        isPaused = true;
    }
}