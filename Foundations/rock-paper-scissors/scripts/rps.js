const moves = ["rock", "paper", "scissors"];
const strengthMap = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};
let humanScore = 0,
  computerScore = 0;

const content = document.querySelector("#content");
const play = document.querySelector(".play");

const getComputerChoice = () => {
  const computerChoice = Math.floor(Math.random() * 3);
  return moves[computerChoice];
};

const playRound = (humanSelection) => {
  const computerSelection = getComputerChoice();

  let roundText = `${humanSelection.toUpperCase()} vs ${computerSelection.toUpperCase()}: `;
  if (computerSelection === humanSelection) {
    roundText += "Draw!";
  } else if (strengthMap[humanSelection] === computerSelection) {
    roundText += "You win!";
    humanScore++;
  } else {
    roundText += "You lose!";
    computerScore++;
  }

  const roundAnalysis = document.querySelector(".round");

  if (humanScore === 5 || computerScore === 5) {
    // game over! play again
    const rpsButtons = document.querySelector(".rps-buttons");
    rpsButtons.remove();
    const playButton = createButton("", "play", "Play Again");
    content.insertBefore(playButton, roundAnalysis);
    roundText = humanScore > computerScore ? "Victory :)" : "Defeated ;(";
  }

  roundAnalysis.innerText = roundText;

  const gameScore = document.querySelector(".score");
  gameScore.innerText = `Human: ${humanScore} - Computer: ${computerScore}`;
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

const createButton = (id, className, innerText) => {
  const button = document.createElement("button");
  button.id = id;
  button.className = className;
  button.innerText = innerText;
  return button;
};

const startGame = () => {
  // remove last state and add the RPS buttons
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }
  const rpsButtons = document.createElement("div");
  rpsButtons.className = "rps-buttons";
  const rock = createButton("rock", "move", "Rock");
  const paper = createButton("paper", "move", "Paper");
  const scissors = createButton("scissors", "move", "Scissors");
  rpsButtons.appendChild(rock);
  rpsButtons.appendChild(paper);
  rpsButtons.appendChild(scissors);

  const roundAnalysis = document.createElement("div");
  roundAnalysis.className = "round";

  const gameScore = document.createElement("div");
  (humanScore = 0), (computerScore = 0);
  gameScore.innerText = `Human: ${humanScore} - Computer: ${computerScore}`;
  gameScore.className = "score";

  content.appendChild(rpsButtons);
  content.appendChild(roundAnalysis);
  content.appendChild(gameScore);
};

const gameHandler = (e) => {
  switch (e.target.classList[0]) {
    case "play":
      startGame();
      break;
    case "move":
      playRound(e.target.id);
      break;
    default:
      break;
  }
};

content.addEventListener("click", function (e) {
  gameHandler(e);
});
