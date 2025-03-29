let parenthesis = false;
let result = 0;
let toggleCal = false;
let score = [0,0];
let historyList = [];
let checkTimeout;
//for timer
let timer; 
let width = 100; 
let timeLeft = 0; 
let totalTime = 0;
let isPaused = false;
let timeout;
function insertInput(value) {
    playbeep();
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
    playbeep();
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

    solve = solve.replace('^', '**').replace('M', '%').replace(/√(\d+(\.\d+)*)/g, 'Math.sqrt($1)');

    solve = solve.replace(/(\d+(\.\d+)?)\s*([\+\-\*\/])\s*(\d+(\.\d+)?)%/g, 
        (match, num1, _, operator, num2) => `${num1} ${operator} (${num1} * ${num2} / 100)`);

    try {
        result = Function(`"use strict"; return (${solve})`)();
        result = Math.round(result * 100) / 100;
    } catch (error) {
        result = "SYNTAX ERROR";
    }

    history(solve, result);
}

function history(expression, answer) {
    if (historyList.length >= 10) { 
        historyList.shift(); // Keep only the last 10 records
    }
    
    historyList.push(`${expression} = ${answer}`);

    let historyElement = document.getElementById("history");
    if (historyElement) {
        historyElement.innerHTML = ""; // Clear previous content
        
        historyList.forEach(entry => {
            let p = document.createElement("p");
            p.textContent = entry;
            p.id="contenthistory";
            historyElement.appendChild(p);
        });
    }
}

function startGame() {
    let screen = document.getElementById("screen");
    calculate(screen.value);
    if (result === "SYNTAX ERROR") {
        screen.value = "SYNTAX ERROR";
    } else {
        choicesContent();
        buttonAppear();
        setTimer(10);
        screen.value = "CHOOSE YOUR ANSWER";
        toggleCalculator();
        timeout = setTimeout(() => {
            startTimer();
        }, 500);
        
    }
}

function toggleCalculator() {
    setTimer(10);
    toggleCal = !toggleCal;
    document.querySelectorAll('#calculator-button').forEach(button => {
        button.disabled = toggleCal;
    });
    if (toggleCal===false) {
        clearInput();
    }
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

        let test = result + randomOffset;
        test = Number.isInteger(test) ? test : parseFloat(test.toFixed(2));

        choices.add(test);
    }

    let choicesArray = Array.from(choices);
    
    let correctPos = Math.floor(Math.random() * 4);

    choicesArray[correctPos] = correctAnswer;

    buttons.forEach((button, index) => {
        button.textContent = choicesArray[index];
        button.classList.remove('correct');
    });

    buttons.forEach(check => {
        if(check.textContent == result) {
            check.classList.add('correct');
        }
    });
}

function setTimer(duration) {
    totalTime = duration;
    timeLeft = totalTime;
    width = 100;

    let bar = document.getElementById("timer-bar");
    let text = document.getElementById("timer-text");

    bar.style.width = width + "%";
    text.textContent = timeLeft.toFixed(2) + "s";

    let red = Math.min(200, 255 - (width * 1.8));
    let green = Math.max(0, width * 1.8);
    bar.style.backgroundColor = `rgb(${red}, ${green}, 0)`;

    isPaused = true;
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

            let red = Math.min(200, 255 - (width * 1.8));
            let green = Math.max(0, width * 1.8);
            bar.style.backgroundColor = `rgb(${red}, ${green}, 0)`;

            timeLeft -= 0.1;

            if (timeLeft <= 0) {
                clearInterval(timer);
                text.textContent = "0.00s";
                playwomp();
                onTimeEnd();
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

function onTimeEnd() {
    score[1]++;
    updateScoreboard();
    checkAns();
}

function checkAns() {
    clearInterval(checkTimeout);
    checkTimeout = setTimeout(() => {
        buttonDisappear();
        toggleCalculator();
    }, 2000);
    
    togglePause();
    let btn = document.querySelectorAll(".buttonAnim");
    btn.forEach(button => button.disabled= true);
    let buttons = [
        document.getElementById("output-button1"),
        document.getElementById("output-button2"),
        document.getElementById("output-button3"),
        document.getElementById("output-button4")
    ];

    buttons.forEach(btn => {
        if(btn.textContent == result) {
            btn.classList.add('correctAns');
        } else {
            btn.classList.add('wrongAns');
        }
    });
}

function addScore(x) {
    if (x.classList.contains('correct')) {
        playding();
        score[0]++;
    } else {
        playwomp();
        score[1]++;
    }
    updateScoreboard();
}

function playbeep() {
    const audio = new Audio('assets/audios/press.mp3');
    audio.play();
}
function playding() {
    const audio = new Audio('assets/audios/correct.mp3');
    audio.play();
}

function playwomp() {
    console.log('womp womp')
    const audio = new Audio('assets/audios/wrong.mp3');
    audio.play();
}

function updateScoreboard() {
    let correctsDiv = document.getElementById('scoreCorrect');
    let wrongsDiv = document.getElementById('scoreWrong');

    if (correctsDiv) {
        correctsDiv.textContent = 'PASS: ' + score[0]; // Update correct answers display
    }
    if (wrongsDiv) {
        wrongsDiv.textContent = 'FAIL: ' + score[1]; // Update wrong answers display
    }
}