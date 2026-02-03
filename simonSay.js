let gameSeq = [];
let userSeq = [];

let btns = [ "yellow", "red", "green", "blue" ];

let started = false;
let level = 0;
let highScore=0;
let h2 = document.querySelector("h2");
let h4=document.querySelector("h4");
document.addEventListener("keypress", function () {
    // let h2=document.querySelector("h2");
    // h2.innerText="Game has Started";
    if (started == false) {
        console.log("game started");
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
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    //random btn choose
    let ranIdx = Math.floor(Math.random() * 3);
    let radColor = btns[ ranIdx ];
    let randBtn = document.querySelector(`.${radColor}`);
    gameSeq.push(radColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    // let idx = level - 1;
    if (userSeq[ idx ] === gameSeq[ idx ]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);

        }
    } else {
        h2.innerHTML = `Game over! your score was <b>${level}</b> <br> press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },250);
        
        displayHigh();
         reset();
    }
}

function btnPress() {
    let btn = this;
    // console.log(this);
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);

}

let allBtn = document.querySelectorAll(".btn");

for (btn of allBtn) {
    btn.addEventListener("click", btnPress);
}

function reset(){
    
    started=false;
    userSeq=[];
    gameSeq=[];
    level=0;
}
function displayHigh(){
   
    if(highScore<level){
        highScore=level;
    h4.innerText=`Your High score :${highScore}`;
    }
}