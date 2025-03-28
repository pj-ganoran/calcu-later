let disappearTimeOut;

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

function toggleHistory() {
    document.getElementById("container").classList.toggle("active");
}