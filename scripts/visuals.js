let disappearTimeOut;
function buttonAppear() {
    clearTimeout(disappearTimeOut);
    let appear = document.getElementById("choices");
    appear.style.display = "contents";
    let buttons = document.querySelectorAll(".buttonAnim");
    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = "1";
            btn.style.transform = "scale(1)";
        }, index * 50);
    });
}

function buttonDisappear() {
    let buttons = document.querySelectorAll(".buttonAnim");
    buttons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = "0";
            btn.style.transform = "scale(0.8)";
        }, index * 50);
    });

    disappearTimeOut = setTimeout(() => {
        document.getElementById("choices").style.display = "none";
    }, buttons.length * 500);
}


function highlightCorrect() {

}