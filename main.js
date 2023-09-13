const rulesButtons = document.querySelectorAll(".toggle-rules");
const gameKeys = document.querySelectorAll(".game-key");
const playBoard = document.querySelector(".play-board");

let showRes = false;

rulesButtons.forEach((elem) => {
  elem.addEventListener("click", toggelCard);
});

function toggelCard() {
  let ruleCard = document.querySelector(".rules-card");
  ruleCard.classList.toggle("show-card");
}

let handsArr = ["rock", "paper", "scissors"];

gameKeys.forEach((key) => {
  key.addEventListener("click", () => drawHand(key));
});

function drawHand(key) {
  const selectedHand = key.className.split(" ");
  const index = getRandomInt(handsArr.length);
  const compHand = handsArr[index];
  console.log(compHand);

  const data = compareHands(selectedHand[1], compHand);
  showResult(data, selectedHand[1], compHand);
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
  const playGround = document.querySelector(".playground");

  const result = document.createElement("div");
  result.classList.add("result");

  result.innerHTML = `
  <div class="hand">
    <h2>YOU PICKED</h2>
    <div class="key ${selectedHand} ${
    outcome == "YOU WIN" ? "winner-key" : ""
  }">
      <img src="/${selectedHand}.png" alt="" />
    </div>
  </div>

  <div class="message">
    <h1>${outcome}</h1>
    <h2>${outcome == "TIE UP" ? "" : "AGAINST COMPUTER"}</h2>
    <button class="btn play-again">${
      outcome == "TIE UP" ? "REPLAY" : "PLAY AGAIN"
    }</button>
  </div>

  <div class="hand">
    <h2>COMPUTER PICKED</h2>
    <div class="key ${compHand} ${outcome == "YOU LOSE" ? "winner-key" : ""}">
      <img src="/${compHand}.png" alt="" />
    </div>
  </div>
  `;

  playBoard.style.display = "none";
  
  playGround.insertAdjacentElement("afterbegin", result);

  const playAgainButton = document.querySelector(".play-again");
  playAgainButton.addEventListener("click", reStartGame);
}

function reStartGame() {
  console.log("button");
  const result = document.querySelector(".result");

  result.remove();

  playBoard.style.display = "";
}
