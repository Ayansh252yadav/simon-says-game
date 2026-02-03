let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "blue"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");
let startBtn = document.querySelector("#startBtn");

// ✅ START GAME (MOBILE SAFE)
startBtn.addEventListener("click", function () {
    if (!started) {
        started = true;
        startBtn.style.display = "none";
        levelUp();
    }
});

// GAME FLASH
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

// USER FLASH
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
}

// LEVEL UP
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

// CHECK ANSWER
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {

        // 📳 vibration (mobile)
        if (navigator.vibrate) {
            navigator.vibrate(300);
        }

        h2.innerHTML = `Game Over! Score: <b>${level}</b><br>Press Start`;

        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "white";
        }, 300);

        displayHigh();
        reset();
        startBtn.style.display = "block";
    }
}

// BUTTON PRESS
function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.id;
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

// COLOR BUTTON EVENTS (CLICK ONLY)
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// RESET
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// HIGH SCORE
function displayHigh() {
    if (level > highScore) {
        highScore = level;
        h4.innerText = `Your High Score: ${highScore}`;
    }
}
