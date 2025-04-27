let disappearTimeOut; //Used for clearing timeout functions
//Visual Toggles
let aboutActive = false;
let historyActive = false;
let buttonsActive = false;
//For Checking on Mobile
window.onload = function() {
    updateScoreboard();
    if(/Mobi|Android/i.test(navigator.userAgent)) {
        addMobileClass();
    }
};

function addMobileClass() {
    var checkDiv = document.getElementById('application');
    if (checkDiv) {
        checkDiv.classList.add('isMobile');
    }
}

//Button Animation
function buttonAppear() {
    clearTimeout(disappearTimeOut);
    let appear = document.getElementById("choices");
    appear.style.visibility = "visible";
    let buttons = document.querySelectorAll(".buttonAnim");
    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = "1";
            btn.style.transform = "scale(1)";
            btn.disabled = false;
        }, index * 50);
    });
}

function buttonDisappear() {
    let buttons = document.querySelectorAll(".buttonAnim");
    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = "0";
            btn.style.transform = "scale(0.8)";
            btn.disabled = true;
        }, index * 50);
    });

    disappearTimeOut = setTimeout(() => {
        document.getElementById("choices").style.visibility = "hidden";
    }, buttons.length * 500);

    buttons.forEach(btn => {
            btn.classList.remove('correctAns');
            btn.classList.remove('wrongAns');
    });
}

function toggleMenu() {
    const menu = document.getElementById("menu");
    if (menu.style.left === "0px") {
        menu.style.left = "-250px";
    } else {
        menu.style.left = "0px";
    }
}

function toggleScoreboard() {
    const menu = document.getElementById("scoreboard");
    if (menu.style.right === "0px") {
        menu.style.right = "-400px";
    } else {
        menu.style.right = "0px";
    }
}

function toggleAbout() {
    aboutActive=!aboutActive;
    clearTimeout(disappearTimeOut);
    document.getElementById("about").classList.toggle("active");
    let content = document.querySelectorAll(".aboutContent");
    if(aboutActive  === true) {
        content.forEach( (box, index) =>{
            setTimeout(() => {
                box.style.opacity = "1";
                box.style.transform = "scale(1)";
            }, index * 50);
        });
    } else {
        content.forEach((box, index) => {
            setTimeout(() => {
                box.style.opacity = "0";
                box.style.transform = "scale(0.8)";
            }, index * 50);
        });
    }
}

function toggleHistory() {
    historyActive=!historyActive;
    clearTimeout(disappearTimeOut);
    document.getElementById("history").classList.toggle("active");
    let content = document.querySelectorAll(".historyContent");
    if(historyActive  === true) {
        content.forEach( (box, index) =>{
            setTimeout(() => {
                box.style.opacity = "1";
                box.style.transform = "scale(1)";
            }, index * 50);
        });
    } else {
        content.forEach((box, index) => {
            setTimeout(() => {
                box.style.opacity = "0";
                box.style.transform = "scale(0.8)";
            }, index * 50);
        });
    }
}

//Register Login
function flip(container) {
    container.classList.toggle('flipped');
}
