// Get random computer choice
function getComputerChoice() {
  let randomChoice = Math.floor(Math.random() * 3);
  switch (randomChoice) {
    case 0:
      return ["🪨", "rock"];
    case 1:
      return ["📃", "paper"];
    case 2:
      return ["✂️", "scissors"];
    default:
      return "Something went wrong in random choice.";
  }
}

function playRound(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "rock":
      if (computerSelection === "scissors") {
        return ["You won!", "user"];
      } else if (computerSelection === "paper") {
        return ["Computer won!", "computer"];
      } else {
        return ["Tie!", "tie"];
      }
    case "paper":
      if (computerSelection === "rock") {
        return ["You won!", "user"];
      } else if (computerSelection === "scissors") {
        return ["Computer won!", "computer"];
      } else {
        return ["Tie!", "tie"];
      }
    case "scissors":
      if (computerSelection === "paper") {
        return ["You won!", "user"];
      } else if (computerSelection === "rock") {
        return ["Computer won!", "computer"];
      } else {
        return ["Tie!", "tie"];
      }
    default:
      return "Something went wrong in play round";
  }
}

function keepScore(result) {
  switch (result[1]) {
    case "user":
      playerScore++;
      break;
    case "computer":
      computerScore++;
      break;
    case "tie":
      tieScore++;
      break;
    default:
      return "Something went wrong in keep score";
  }
  return result[0];
}

function defineWinner() {
  if (playerScore > computerScore) {
    return `You won! 🎉`;
  } else if (computerScore > playerScore) {
    return `Computer won! 🖥️`;
  } else {
    return `Nobody won. ⛔`;
  }
}

// HTML elements
const pcCard = document.querySelector("#computer-id");
const hidden = document.querySelector(".hide");
const choiceBtn = document.querySelectorAll(".card-user");
const userScore = document.querySelector("#user-score");
const pcScore = document.querySelector("#pc-score");
const finalScore = document.querySelector("#final-score");
const gameCounter = document.querySelector(".score-info p:nth-child(2)");
const replayBtn = document.querySelector(".replay-btn");

// Game variables
let userChoice;
let computerChoice;

let counter = 0;
let result;
let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

function replay() {
  counter = 0;
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;
  computerChoice = undefined;
  userChoice = undefined;
  replayBtn.classList.add("hide-btn");
  hidden.classList.add("hide");

  choiceBtn.forEach((btn) => {
    btn.removeAttribute("disabled", "");
  });
  pcCard.removeAttribute("disabled", "f");
}

// Main function
function game() {
  counter = 0;
  choiceBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      userChoice = e.target.value;
      // Loop start
      while (counter < 5 && userChoice != undefined) {
        console.log(counter);
        // Computer choice
        [computerEmoji, computerChoice] = getComputerChoice();
        // Show hidden element
        hidden.classList.remove("hide");
        // Show pc choice
        pcCard.textContent = computerEmoji;
        // game functions call
        result = keepScore(playRound(userChoice, computerChoice));
        // Show info
        pcScore.textContent = computerScore;
        userScore.textContent = playerScore;
        finalScore.textContent = result;
        gameCounter.textContent = `Current game #${counter + 1}/5`;

        // Reset loop condition
        userChoice = undefined;
        counter++;
      }

      // Condition to run when counter is 0
      if (counter === 5) {
        // Disable buttons
        choiceBtn.forEach((btn) => {
          btn.setAttribute("disabled", "");
        });
        pcCard.setAttribute("disabled", "");
        // Show replay buttons
        replayBtn.classList.remove("hide-btn");
        // Add event listener to reset
        replayBtn.addEventListener("click", replay);
        // Show the winner
        finalScore.textContent = defineWinner();
      }
    });
  });
}

game();
