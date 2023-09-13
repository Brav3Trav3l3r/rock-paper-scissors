const rulesButtons = document.querySelectorAll(".toggle-rules");
const gameKeys = document.querySelectorAll(".game-key");
const playGround = document.querySelector(".playground");

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
  showResult(data);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function compareHands(handOne, handTwo) {
  if (handOne == handTwo) {
    return "tie";
  }

  if (handOne == "rock") {
    return handTwo == "scissors" ? "you win" : "you lose";
  } else if (handOne == "paper") {
    return handTwo == "rock" ? "you win" : "you lose";
  } else if (handOne == "scissors") {
    return handTwo == "paper" ? "you win" : "you lose";
  }
}

function showResult(outcome) {
  playGround.innerHTML = 
  `
    <h1>${outcome}</h1>
  `;
}
