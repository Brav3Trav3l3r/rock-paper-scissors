let rulesButtons = document.querySelectorAll(".toggle-rules");

rulesButtons.forEach((elem) => elem.addEventListener("click", toggelModal));

function toggelModal() {
  let ruleCard = document.querySelector(".rules-card");
  ruleCard.classList.toggle("show-card");
}

const gameKeys = {
    
}