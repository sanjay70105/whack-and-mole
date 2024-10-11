const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoredis = document.getElementById('score');
const timedis = document.getElementById('time');
const start = document.getElementById('startButton');
const gameOverPopup = document.getElementById('gameOverPopup');
const finalScore = document.getElementById('finalScore');
const closePopup = document.getElementById('closePopup');

let lastHole;
let timeUp = false;
let score = 0;
let timer;
let gameActive = false;

function ranTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const ran = Math.floor(Math.random() * holes.length);
    const hole = holes[ran];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function movement() {
    const time = ranTime(500, 700);
    const hole = randomHole(holes);
    const mole = hole.querySelector('.mole');
    mole.classList.add('up');
    setTimeout(() => {
        mole.classList.remove('up');
        if (!timeUp) movement();
    }, 850); 
}

function startGame() {
    scoredis.textContent = 0;
    timedis.textContent = '30';
    timeUp = false;
    score = 0;
    gameActive = true;
    movement();
    let timeRemaining = 30;
    disableButtons();
    timer = setInterval(() => {
        timeRemaining--;
        timedis.textContent = timeRemaining;
        if (timeRemaining < 1) {
            clearInterval(timer);
            timeUp = true;
            gameActive = false;
            showGameOverPopup();
        }
    }, 1000);
}

function punch(e) {
    if (!e.isTrusted || !gameActive) return;
    score++;
    this.classList.remove('up');
    scoredis.textContent = score;
}

function showGameOverPopup() {
    finalScore.textContent = score;
    gameOverPopup.style.display = 'flex';
    enableButtons();
}

function hideGameOverPopup() {
    gameOverPopup.style.display = 'none';
}
function reset(){
    clearInterval(timer);
    timeUp = true;
    gameActive = false;
    scoredis.textContent="0";
    timedis.textContent="00"
    enableButtons();
}

function disableButtons() {
    var button = document.getElementById("startButton");
    button.disabled = true;
}

function enableButtons() {
    var button = document.getElementById("startButton");
    button.disabled = false;
}

moles.forEach(mole => mole.addEventListener('click', punch));
start.addEventListener('click', startGame);
closePopup.addEventListener('click', hideGameOverPopup);