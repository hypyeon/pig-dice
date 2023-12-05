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
function PigDice(player, score) {
    this.player = player;
    this.score = score;
    this.current = [];
    this.total = [];
}

const player1 = new PigDice("Player1", 0);
const player2 = new PigDice("Player2", 0);

function getNames() {
    const onePlayer = document.getElementById("onePlayer");
    const twoPlayers = document.getElementById("twoPlayers");
    const playerOne = document.getElementById("player-1");
    const playerTwo = document.getElementById("player-2");
    const playerName = document.getElementById("playerName");
    const playerOneName = document.getElementById("playerOneName");
    const playerTwoName = document.getElementById("playerTwoName");
    if (onePlayer.checked) {
        const name = formatName(playerName.value);
        playerOne.innerText = name;
        player1.player = name;
        playerTwo.innerText = 'Computer';
        player2.player = 'Computer';
    } else if (twoPlayers.checked) {
        const name1 = formatName(playerOneName.value) + " (1P)";
        const name2 = formatName(playerTwoName.value) + " (2P)";
        playerOne.innerText = name1;
        player1.player = name1;
        playerTwo.innerText = name2;
        player2.player = name2;
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

PigDice.prototype.getCurrent = function(num) {
    if (num === 1) {
        this.current = [];
    } else {
        this.current.push(num);
    }
    return this.current.reduce((a, b) => a + b, 0);
}
PigDice.prototype.getTotal = function(num) {
    const current = this.getCurrent(num) - num;
    this.total.push(current);
    return this.total.reduce((a, b) => a + b, 0);
}

function getRandomNum() {
    return Math.floor(Math.random() * 6) + 1;
}

function btnDisablerOne(num, element) {
    const btnsOne = document.getElementsByClassName("btnOne");
    const btnsTwo = document.getElementsByClassName("btnTwo");
    if (num === 1) {
        disableButtons(btnsOne);
        enableButtons(btnsTwo);
        element.style.color = 'red';
    } else {
        disableButtons(btnsTwo);
        enableButtons(btnsOne);
        element.style.color = 'black';
    }
}
function btnDisablerTwo(num, element) {
    const btnsOne = document.getElementsByClassName("btnOne");
    const btnsTwo = document.getElementsByClassName("btnTwo");
    if (num === 1) {
        disableButtons(btnsTwo);
        enableButtons(btnsOne);
        element.style.color = 'red';
    } else {
        disableButtons(btnsOne);
        enableButtons(btnsTwo);
        element.style.color = 'black';
    }
}
function disableButtons(btns) {
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
        btns[i].style.cursor = "not-allowed";
        btns[i].style.backgroundColor = 'white';
        btns[i].style.color = 'gray';
    }
}
function enableButtons(btns) {
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
        btns[i].style.cursor = "pointer";
        btns[i].style.backgroundColor = ''; // Reset to default background color
        btns[i].style.color = ''; // Reset to default text color
    }
}
function getWinner(value, winner) {
    const btnsOne = document.getElementsByClassName("btnOne");
    const btnsTwo = document.getElementsByClassName("btnTwo");
    const announcement = document.getElementById("winnerAnnouncement");
    const winnerPlace = document.getElementById("winner");
    if (value >= 100) {
        disableButtons(btnsOne);
        disableButtons(btnsTwo);
        announcement.classList.remove("hidden");
        winnerPlace.innerText = winner;
    } else {
        return;
    }
}

//UI Logic
function getScoreOne() {
    const playBtnOne = document.getElementById("playBtnOne");
    const holdBtnOne = document.getElementById("holdBtnOne");
    const diceResultOne = document.getElementById("diceResultOne");
    const currentScoreOne = document.getElementById("currentScoreOne");
    const totalScoreOne = document.getElementById("totalScoreOne");
    const btnsOne = document.getElementsByClassName("btnOne");
    const btnsTwo = document.getElementsByClassName("btnTwo");
    playBtnOne.addEventListener("click", e => {
        e.preventDefault();
        player1.score = getRandomNum();
        btnDisablerOne(player1.score, diceResultOne);
        diceResultOne.innerText = player1.score;
        currentScoreOne.innerText = player1.getCurrent(player1.score);
    });
    holdBtnOne.addEventListener("click", e => {
        e.preventDefault();
        const totalScore = player1.getTotal(player1.score);
        totalScoreOne.innerText = totalScore;
        getWinner(totalScore, player1.player);
        player1.current = [];
        diceResultOne.innerText = '';
        currentScoreOne.innerText = 0;
        disableButtons(btnsOne);
        enableButtons(btnsTwo);
    });
}
function getScoreTwo() {
    const playBtnTwo = document.getElementById("playBtnTwo");
    const holdBtnTwo = document.getElementById("holdBtnTwo");
    const diceResultTwo = document.getElementById("diceResultTwo");
    const currentScoreTwo = document.getElementById("currentScoreTwo");
    const totalScoreTwo = document.getElementById("totalScoreTwo");
    const btnsOne = document.getElementsByClassName("btnOne");
    const btnsTwo = document.getElementsByClassName("btnTwo");
    playBtnTwo.addEventListener("click", e => {
        e.preventDefault();
        player2.score = getRandomNum();
        btnDisablerTwo(player2.score, diceResultTwo);
        diceResultTwo.innerText = player2.score;
        currentScoreTwo.innerText = player2.getCurrent(player2.score);
    });
    holdBtnTwo.addEventListener("click", e => {
        e.preventDefault();
        const totalScore = player2.getTotal(player2.score);
        totalScoreTwo.innerText = totalScore;
        getWinner(totalScore, player2.player);
        player2.current = [];
        diceResultTwo.innerText = '';
        currentScoreTwo.innerText = 0;
        disableButtons(btnsTwo);
        enableButtons(btnsOne);
    });
}


window.onload = () => {
    getPlayerInfo();
    eventHandler();
    getScoreOne();
    getScoreTwo();
}


