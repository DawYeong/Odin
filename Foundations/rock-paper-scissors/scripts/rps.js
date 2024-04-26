const moves = ["rock", "paper", "scissors"];
const strengthMap = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};
let humanScore = 0,
  computerScore = 0;

const getComputerChoice = () => {
  const computerChoice = Math.floor(Math.random() * 3);
  return moves[computerChoice];
};

const getHumanChoice = () => {
  let humanChoice;
  while (true) {
    humanChoice = prompt("Your choice (rock/paper/scissors):")
      .trim()
      .toLowerCase();

    if (moves.includes(humanChoice)) {
      return humanChoice;
    } else {
      console.log(`${humanChoice} is not a valid move, please try again.`);
    }
  }
};

const playRound = (round) => {
  const computerSelection = getComputerChoice();
  const humanSelection = getHumanChoice();

  console.group(`round ${round}`);
  console.log(`Human: ${humanSelection} vs Computer: ${computerSelection}`);
  if (computerSelection === humanSelection) {
    console.log("It is a draw!");
  } else if (strengthMap[humanSelection] === computerSelection) {
    console.log(`You win! ${humanSelection} beats ${computerSelection}`);
    humanScore++;
  } else {
    console.log(`You lose! ${computerSelection} beats ${humanSelection}`);
    computerScore++;
  }

  console.log(`Human: ${humanScore} Computer: ${computerScore}`);
  console.groupEnd();
  return;
};

const playGame = () => {
  (humanScore = 0), (computerScore = 0);
  console.group("Game");
  for (let i = 1; i <= 5; i++) {
    playRound(i);
  }
  console.groupEnd();
  return humanScore > computerScore
    ? "You beat the robots!"
    : humanScore === computerScore
    ? "It is a draw!"
    : "You lose :(, the robots have won.";
};
