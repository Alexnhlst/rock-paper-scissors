/* function getPlayerChoice() {
  let choice = prompt("Select your move: ").toLowerCase();
  return choice;
}

function getComputerChoice() {
  let randomChoice = Math.floor(Math.random() * 3);
  switch (randomChoice) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    case 2:
      return "scissors";
    default:
      return "Something went wrong in computer choice";
  }
}

function playRound(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "rock":
      if (computerSelection === "scissors") {
        alert("You won! Rock beats scissors");
        return "user";
      } else if (computerSelection === "paper") {
        alert("Computer won! Paper beats rock");
        return "computer";
      } else {
        alert("Tie! Rock and rock");
        return "tie";
      }
    case "paper":
      if (computerSelection === "rock") {
        alert("You won! Paper beats rock");
        return "user";
      } else if (computerSelection === "scissors") {
        alert("Computer won! Scissors beats paper");
        return "computer";
      } else {
        alert("Tie! Paper and paper");
        return "tie";
      }
    case "scissors":
      if (computerSelection === "paper") {
        alert("You won! Scissors beats paper");
        return "user";
      } else if (computerSelection === "rock") {
        alert("Computer won! Rock beats scissors");
        return "computer";
      } else {
        alert("Tie! Scissors and scissors");
        return "tie";
      }
    default:
      return "Something went wrong in play round";
  }
}

function keepScore(result) {
  switch (result) {
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
      break;
  }
}

function defineWinner() {
  alert("Game finished - Getting result");
  if (playerScore > computerScore) {
    alert(
      `You won! - Your score: ${playerScore} - Computer score: ${computerScore}`
    );
  } else if (computerScore > playerScore) {
    alert(
      `Computer won! - Your score: ${computerScore} - Computer score: ${playerScore}`
    );
  } else {
    alert(
      `Nobody won. Final score - Your score: ${playerScore} - Computer score: ${computerScore}`
    );
  }
}

let playerScore = 0;
let computerScore = 0;
let tieScore = 0;
let counter = 0;

function game() {
  while (counter < 5) {
    keepScore(playRound(getPlayerChoice(), getComputerChoice()));
    counter++;
  }
  if (counter === 5) {
    defineWinner();
  }
}

game();*/

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
