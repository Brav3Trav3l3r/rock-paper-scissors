const rulesButtons = document.querySelectorAll(".toggle-rules");
const gameKeys = document.querySelectorAll(".game-key");
const playGround = document.querySelector(".playground");
const gameComponent = document.querySelector("#app");
const playBoard = document.querySelector(".play-board");
const actionNextButton = document.querySelector(".next");
const myScore = document.querySelector(".my-score");
const compScore = document.querySelector(".comp-score");

rulesButtons.forEach((elem) => {
  elem.addEventListener("click", toggelCard);
});

function toggelCard() {
  let ruleCard = document.querySelector(".rules-card");
  ruleCard.classList.toggle("show-card");
}

const handsArr = ["rock", "paper", "scissors"];

gameKeys.forEach((key) => {
  key.addEventListener("click", () => drawHand(key));
});

function drawHand(key) {
  const selectedHand = key.id;
  const index = getRandomInt(handsArr.length);
  const compHand = handsArr[index];
  const data = compareHands(selectedHand, compHand);
  showResult(data, selectedHand, compHand);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function compareHands(handOne, handTwo) {
  if (handOne == handTwo) {
    return "TIE UP";
  }

  if (handOne == "rock") {
    return handTwo == "scissors" ? "YOU WIN" : "YOU LOSE";
  } else if (handOne == "paper") {
    return handTwo == "rock" ? "YOU WIN" : "YOU LOSE";
  } else if (handOne == "scissors") {
    return handTwo == "paper" ? "YOU WIN" : "YOU LOSE";
  }
}

function showResult(outcome, selectedHand, compHand) {
  const result = document.createElement("div");
  result.classList.add("result");

  result.innerHTML = `
  <div class="hand">
    <h2>YOU PICKED</h2>
    <div class="key res-key ${selectedHand} ${
    outcome == "YOU WIN" ? "winner-key" : ""
  }">
      <img src="/${selectedHand}.png" alt="" />
    </div>
  </div>

  <div class="message">
    <h1>${outcome}</h1>
    <h2>${outcome == "TIE UP" ? "" : "AGAINST COMPUTER"}</h2>
    <button class="btn primary-btn play-again">${
      outcome == "TIE UP" ? "REPLAY" : "PLAY AGAIN"
    }</button>
  </div>

  <div class="hand">
    <h2>COMPUTER PICKED</h2>
    <div class="key res-key ${compHand} ${
    outcome == "YOU LOSE" ? "winner-key" : ""
  }">
      <img src="/${compHand}.png" alt="" />
    </div>
  </div>
  `;

  if (outcome == "YOU WIN") {
    actionNextButton.style.display = "inline-block";
  }

  playGround.insertAdjacentElement("afterbegin", result);
  playBoard.style.display = "none";

  handleScore(outcome);

  const playAgainButton = document.querySelector(".play-again");
  playAgainButton.addEventListener("click", reStartGame);
}

function reStartGame() {
  const result = document.querySelector(".result");
  result.remove();
  playBoard.style.display = "";
  actionNextButton.style.display = "";
}

function handleScore(outcome) {
  if (outcome == "TIE UP") return;

  const score = getScore();

  if (outcome == "YOU WIN") {
    score.myScore += 1;
    localStorage.setItem("rpsScore", JSON.stringify(score));
  } else if (outcome == "YOU LOSE") {
    score.compScore += 1;
    localStorage.setItem("rpsScore", JSON.stringify(score));
  }

  updateScoreHtml();
}

function updateScoreHtml() {
  const score = getScore();
  myScore.innerHTML = score.myScore;
  compScore.innerHTML = score.compScore;
}

function getScore() {
  const score = localStorage.getItem("rpsScore");
  if (!score) {
    const scoreObj = { myScore: 0, compScore: 0 };
    localStorage.setItem("rpsScore", JSON.stringify(scoreObj));
    return scoreObj;
  }

  return JSON.parse(score);
}

updateScoreHtml();


//hurray component

actionNextButton.addEventListener("click", showHurrayPage);

function showHurrayPage() {
  const hurrayComponent = document.createElement("div");
  hurrayComponent.classList.add("hurray");
  hurrayComponent.innerHTML = `
    <div class="images">
      <img class="cup" src="/cup.png" alt="" />
      <img class="stars" src="/stars.png" alt="" />
    </div>
  
    <div class="greet">
      <h1>HURRAY!!</h1>
      <h2>YOU WON THE GAME</h2>
    </div>
    <button class="btn primary-btn replay-game">PLAY AGAIN</button>
  `;

  const result = document.querySelector(".result");
  result.remove();
  gameComponent.style.display = "none";
  actionNextButton.style.display = "";

  document.body.insertAdjacentElement("afterbegin", hurrayComponent);
  const replayButton = document.querySelector(".replay-game");
  replayButton.addEventListener("click", replayGame);
}

function replayGame() {
  const hurrayComponent = document.querySelector(".hurray");
  hurrayComponent.remove();
  gameComponent.style.display = "";
  playBoard.style.display = "";
  actionNextButton.style.display = "";
}
