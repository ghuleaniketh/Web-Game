
let game_pattern = [];
let user_pattern = [];

let colors = ["green", "blue", "red", "yellow"];
let game_start = false;
let level = 0;
let heading = document.querySelector("#heading");
let scoreDisplay = document.querySelector(".score p");
let refreshIcon = document.querySelector(".icon i");

document.addEventListener("click", function () {
    if (!game_start) {
        console.log("Game Started");
        game_start = true;
        level = 0;
        game_pattern = [];
        user_pattern = [];
        level_up();
    }
}, { once: true }); 

function flash(cont) {
    cont.classList.add("white");
    
    setTimeout(function () {
        cont.classList.remove("white");
    }, 250);
}

function userflash(cont) {
    cont.classList.add("black");
    setTimeout(function () {
        cont.classList.remove("black");
    }, 250);
}

function level_up() {
    user_pattern = []; 
    level++;
    console.log("Level: ", level);
    heading.textContent = `Level ${level}`;
    scoreDisplay.textContent = `Score ${level - 1}`;

    let randint = Math.floor(Math.random() * 4);
    let randcolor = colors[randint];

    game_pattern.push(randcolor);

    let randcont = document.querySelector(`#${randcolor}`);
    setTimeout(() => {
        flash(randcont);
    }, 500); 
}

let allcont = document.querySelectorAll(".color-square");
for (let btn of allcont) {
    btn.addEventListener("click", btnpressed);
}

refreshIcon.addEventListener("click", function () {
    location.reload();
});




function check(index) {
    if (user_pattern[index] === game_pattern[index]) {
        if (user_pattern.length === game_pattern.length) {
            setTimeout(level_up, 1000); 
        }
    } else {
        gameOver();
    }
}

function btnpressed() {
    if (!game_start) return;
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    user_pattern.push(userColor);

    console.log("User Pattern: ", user_pattern);

    let indx = user_pattern.length - 1; 
    check(indx);
}

function gameOver() {
    heading.innerText = "Game Over! Click Refresh";
    scoreDisplay.textContent = `Score ${level - 1}`;
    game_start = false;
    flashAll();
}

function flashAll() {
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
        document.body.style.backgroundColor = "";
    }, 300);
}