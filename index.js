function getPlayerChoice() {
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

game();
