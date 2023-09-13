let rulesButtons = document.querySelectorAll(".toggle-rules");
let gameKeys = document.querySelectorAll(".game-key");

rulesButtons.forEach((elem) => {
  elem.addEventListener("click", toggelModal);
});

function toggelModal() {
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

  if (selectedHand[1] == compHand) {
    console.log("tie");
  } else {
    const data = compareHands(selectedHand[1], compHand);
    console.log(data);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function compareHands(handOne, handTwo) {
  //rock > scissors > paper > rock > scissors > paper >......
  if (handOne == "rock") {
    return handTwo == "scissors" ? "you win" : "you lose";
  } else if (handOne == "paper") {
    return handTwo == "rock" ? "you win" : "you lose";
  } else if (handOne == "scissors") {
    return handTwo == "paper" ? "you win" : "you lose";
  }
}
