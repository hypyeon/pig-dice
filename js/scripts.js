function createTextInput(area, placeholder, id, name) {
    const inputText = document.createElement('input');
    Object.assign(inputText, {
        type: 'text',
        placeholder: placeholder,
        id: id,
        name: name
    });
    area.appendChild(inputText);
}
function getPlayerInfo() {
    const radioOnePlayer = document.getElementById("onePlayer");
    const radioTwoPlayers = document.getElementById("twoPlayers");
    const playerNames = document.getElementById("playerNames");
    radioOnePlayer.addEventListener("click", () => {
        playerNames.textContent = '';
        createTextInput(playerNames, 'Your game name', 'playerName', 'playerName');
    });
    radioTwoPlayers.addEventListener("click", () => {
        playerNames.textContent = '';
        createTextInput(playerNames, 'Name of Player 1', 'playerOneName', 'playerOneName');
        createTextInput(playerNames, 'Name of Player 2', 'playerTwoName', 'playerTwoName');
    });
}
function formatName(name) {
    if (name !== '') {
        return name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
    } else {
        return "Player";
    }
}
function getNames() {
    const onePlayer = document.getElementById("onePlayer");
    const twoPlayers = document.getElementById("twoPlayers");
    const playerOne = document.getElementById("player-1");
    const playerTwo = document.getElementById("player-2");
    const playerName = document.getElementById("playerName");
    const playerOneName = document.getElementById("playerOneName");
    const playerTwoName = document.getElementById("playerTwoName");
    if (onePlayer.checked) {
        playerOne.innerText = formatName(playerName.value);
        playerTwo.innerText = 'Computer';
    } else if (twoPlayers.checked) {
        playerOne.innerText = formatName(playerOneName.value);
        playerTwo.innerText = formatName(playerTwoName.value);
    } else {
        window.location.reload();
    }
}
function eventHandler() {
    document.querySelector('#startGameBtn').addEventListener("click", e => {
        e.preventDefault();
        getNames();
        document.getElementById("playerInfo").classList.add("hidden");
        document.getElementById("playerOne").classList.remove("hidden");
        document.getElementById("playerTwo").classList.remove("hidden");
        document.getElementById("goBack").classList.remove("hidden");
    });
    document.querySelector('#goBack').addEventListener("click", () => {
        window.location.reload();
    })
}


//Business Logic
function PigDice(player, score) {
    this.player = player;
    this.score = score;
    this.current = [];
    this.total = [];
}

const player1 = new PigDice("player1", 0);
const player2 = new PigDice("player2", 0);

PigDice.prototype.getCurrent = function(num) {
    if (num === 1) {
        this.current = [];
    } else {
        this.current.push(num);
    }
    return this.current.reduce((a, b) => a + b, 0);
}
PigDice.prototype.getTotal = function(num) {
    if (num !== 1) {
        this.total.push(num);
    }
    return this.total.reduce((a, b) => a + b, 0);
}

function getRandomNum() {
    return Math.floor(Math.random() * 6) + 1;
}

function btnDisablerOne(num) {
    const btnsOne = document.getElementsByClassName("btnOne");
    const btnsTwo = document.getElementsByClassName("btnTwo");
    if (num === 1) {
        disableButtons(btnsOne);
        enableButtons(btnsTwo);
    } else {
        disableButtons(btnsTwo);
        enableButtons(btnsOne);
    }
}
function btnDisablerTwo(num) {
    const btnsOne = document.getElementsByClassName("btnOne");
    const btnsTwo = document.getElementsByClassName("btnTwo");
    if (num === 1) {
        disableButtons(btnsTwo);
        enableButtons(btnsOne);
    } else {
        disableButtons(btnsOne);
        enableButtons(btnsTwo);
    }
}
function disableButtons(btns) {
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        btns[i].style.backgroundColor = 'white';
        btns[i].style.color = 'gray';
    }
}
function enableButtons(btns) {
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
        btns[i].style.backgroundColor = ''; // Reset to default background color
        btns[i].style.color = ''; // Reset to default text color
    }
}

//UI Logic
function getScoreOne() {
    const playBtnOne = document.getElementById("playBtnOne");
    const diceResultOne = document.getElementById("diceResultOne");
    const currentScoreOne = document.getElementById("currentScoreOne");
    const totalScoreOne = document.getElementById("totalScoreOne");
    playBtnOne.addEventListener("click", e => {
        e.preventDefault();
        player1.score = getRandomNum();
        btnDisablerOne(player1.score);
        diceResultOne.innerText = player1.score;
        currentScoreOne.innerText = player1.getCurrent(player1.score);
        totalScoreOne.innerText = player1.getTotal(player1.score);
    });
}
function getScoreTwo() {
    const playBtnTwo = document.getElementById("playBtnTwo");
    const diceResultTwo = document.getElementById("diceResultTwo");
    const currentScoreTwo = document.getElementById("currentScoreTwo");
    const totalScoreTwo = document.getElementById("totalScoreTwo");
    playBtnTwo.addEventListener("click", e => {
        e.preventDefault();
        player2.score = getRandomNum();
        btnDisablerTwo(player2.score);
        diceResultTwo.innerText = player2.score;
        currentScoreTwo.innerText = player2.getCurrent(player2.score);
        totalScoreTwo.innerText = player2.getTotal(player2.score);
    });
}


window.onload = () => {
    getPlayerInfo();
    eventHandler();
    getScoreOne();
    getScoreTwo();
}


