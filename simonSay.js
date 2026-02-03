let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "blue"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");


document.addEventListener("click", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});


function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;


    let ranIdx = Math.floor(Math.random() * 4);
    let randColor = btns[ranIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

// CHECK ANSWER
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Tap anywhere to restart`;

        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 250);

        displayHigh();
        reset();
    }
}


function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


let allBtn = document.querySelectorAll(".btn");

for (let btn of allBtn) {
    btn.addEventListener("click", btnPress);
    btn.addEventListener("touchstart", btnPress);
}


function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}

function displayHigh() {
    if (highScore < level) {
        highScore = level;
        h4.innerText = `Your High score: ${highScore}`;
    }
}
