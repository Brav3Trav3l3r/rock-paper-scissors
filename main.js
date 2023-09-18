const rulesButtons = document.querySelectorAll(".toggle-rules");
const gameComponent = document.querySelector("#app");
const gameKeys = document.querySelectorAll(".game-key");
const playBoard = document.querySelector(".play-board");
const actionNextButton = document.querySelector(".next");

rulesButtons.forEach((elem) => {
  elem.addEventListener("click", toggelCard);
});

function toggelCard() {
  let ruleCard = document.querySelector(".rules-card");
  ruleCard.classList.toggle("show-card");
}

const handsArr = ["rock", "paper", "scissors"];

gameKeys.forEach((key) => {
  key.addEventListener("click", () => drawHands(key));
});

function drawHands(key) {
  const selectedHand = key.id;
  const compHand = getCompHand();
  const outcome = compareHands(selectedHand, compHand);
  showResult(outcome, selectedHand, compHand);
}

const getCompHand = () => {
  const randomIndex = Math.floor(Math.random() * handsArr.length);
  return handsArr[randomIndex];
};

const compareHands = (selectedHand, compHand) => {
  if (selectedHand == compHand) {
    return "TIE UP";
  } else if (selectedHand == "rock") {
    return compHand == "scissors" ? "YOU WIN" : "YOU LOSE";
  } else if (selectedHand == "paper") {
    return compHand == "rock" ? "YOU WIN" : "YOU LOSE";
  } else if (selectedHand == "scissors") {
    return compHand == "paper" ? "YOU WIN" : "YOU LOSE";
  }
};

const showResult = (outcome, selectedHand, compHand) => {
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

  handleScore(outcome);

  const playGround = document.querySelector(".playground");
  playGround.insertAdjacentElement("afterbegin", result);
  playBoard.style.display = "none";
  const playAgainButton = document.querySelector(".play-again");
  playAgainButton.addEventListener("click", reStartGame);
};

const reStartGame = () => {
  const result = document.querySelector(".result");
  result.remove();
  playBoard.style.display = "";
  actionNextButton.style.display = "";
};

const handleScore = (outcome) => {
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
};

function getScore() {
  const score = localStorage.getItem("rpsScore");
  if (!score) {
    const scoreObj = { myScore: 0, compScore: 0 };
    localStorage.setItem("rpsScore", JSON.stringify(scoreObj));
    return scoreObj;
  }

  return JSON.parse(score);
}

function updateScoreHtml() {
  const score = getScore();
  const myScore = document.querySelector(".my-score");
  const compScore = document.querySelector(".comp-score");
  myScore.innerHTML = score.myScore;
  compScore.innerHTML = score.compScore;
}

updateScoreHtml();

//greet component
actionNextButton.addEventListener("click", showGreetPage);

function showGreetPage() {
  const greetComponent = document.createElement("div");
  greetComponent.classList.add("greet-comp");
  greetComponent.innerHTML = `
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

  document.body.insertAdjacentElement("afterbegin", greetComponent);
  const replayButton = document.querySelector(".replay-game");
  replayButton.addEventListener("click", replayGame);
}

const replayGame = () => {
  const greetComponent = document.querySelector(".greet-comp");
  greetComponent.remove();
  gameComponent.style.display = "";
  playBoard.style.display = "";
  actionNextButton.style.display = "";
};
