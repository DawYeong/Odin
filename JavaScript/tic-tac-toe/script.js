const container = document.querySelector(".container");

const tttGame = (function () {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const players = ["Player 2", "Player 1"];
  // true = x, false = o
  let turn = true;
  let turnCount = 0;

  const checkConsecutive = (arr) => {
    return arr.every((item) => item === arr[0]) && arr[0] != null
      ? +arr[0]
      : null;
  };

  const getGameState = () => {
    let check;
    for (let i = 0; i < 3; i++) {
      // check rows
      check = checkConsecutive(gameBoard[i]);
      if (check != null) return check;
      // check cols
      check = checkConsecutive(gameBoard.map((row) => row[i]));
      if (check != null) return check;
    }

    // check diagonals
    check = checkConsecutive([
      gameBoard[0][0],
      gameBoard[1][1],
      gameBoard[2][2],
    ]);
    if (check != null) return check;
    check = checkConsecutive([
      gameBoard[2][0],
      gameBoard[1][1],
      gameBoard[0][2],
    ]);
    if (check != null) return check;

    // check game turn => if all checks don't result in a win and if turnCount is 9 => tie
    // if(gameOver)
    if (turnCount >= 9) return 2;

    return -1;
  };

  const handleGameOver = (result) => {
    // declare result and reset the board
    switch (result) {
      case 0:
        console.log("Player 1 won!");
        break;
      case 1:
        console.log("Player 2 won!");
        break;
      case 2:
        console.log("It is a draw!");
        break;
    }
  };

  const reset = () => {
    gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    turn = true;
    turnCount = 0;
  };

  const move = (row, col) => {
    if (
      row < 0 ||
      row > 2 ||
      col < 0 ||
      col > 2 ||
      gameBoard[row][col] != null
    ) {
      displayController.setGameMessage(`${players[+turn]}: invalid move!`); // display a message
      return -1;
    }

    displayController.setGameMessage(`${players[+turn]}: valid move!`);
    gameBoard[row][col] = turn;
    turn = !turn;
    turnCount += 1;

    displayController.render(gameBoard);

    return getGameState();
    // return "Valid move!"; // display message
    // return true;
  };

  const nextTurn = () => {
    // prompt for move
    let validMove = false;
    let row, col;
    while (!validMove) {
      // get move
      [row, col] = prompt(
        `what is your move ${turn ? "Player 1" : "Player 2"}?`
      )
        .split(" ")
        .map((x) => parseInt(x));
      validMove = move(row, col);
    }

    // check if game is over;
    return getGameState();
  };

  const display = () => {
    console.table(gameBoard);
  };

  const startGame = () => {
    // let gameState = -1;
    displayController.render(gameBoard);
    // while (gameState === -1) {
    //   gameState = nextTurn();
    //   console.log(`gameState: ${gameState}`);
    //   display();
    //   displayController.render(gameBoard);
    // }
    // handleGameOver(gameState);
    // reset();
  };

  return { startGame, move, reset };
})();

const displayController = (function () {
  const startSection = document.querySelector(".start-section");
  const gameSection = document.querySelector(".game-board");
  const gameMessage = document.querySelector(".game-message");
  const reset = document.querySelector(".reset");

  const init = () => {
    container.addEventListener("click", function (e) {
      console.dir(e.target);
      if (e.target.tagName) {
        switch (e.target.classList[0]) {
          case "start-btn":
            start(e);
            break;
          case "reset-btn":
            displayReset();
            break;
          case "ttt-cell":
            playerMove(
              parseInt(e.target.attributes["row"].value),
              parseInt(e.target.attributes["col"].value)
            );
            break;
        }
      }
    });
  };

  const render = (gameBoard) => {
    gameSection.innerHTML = "";
    let cell;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cell = document.createElement("button");
        cell.type = "button";
        cell.className = "ttt-cell";
        cell.setAttribute("row", i);
        cell.setAttribute("col", j);
        cell.innerText =
          gameBoard[i][j] === true
            ? "X"
            : gameBoard[i][j] === false
            ? "O"
            : "FREE";

        gameSection.appendChild(cell);
      }
    }
    console.dir(container);
  };

  const setGameMessage = (message) => {
    gameMessage.innerText = message;
  };

  const disableGame = () => {
    const cells = document.querySelectorAll(".ttt-cell");
    cells.forEach((cell) => {
      cell.disabled = true;
    });
  };

  const displayReset = () => {
    tttGame.reset();
    startSection.classList.add("active");
    gameSection.classList.remove("active");
    gameMessage.innerText = "";
    gameMessage.classList.remove("active");
    reset.classList.remove("active");
  };

  const start = (e) => {
    e.preventDefault();
    //start the game...
    startSection.classList.remove("active");
    gameSection.classList.add("active");
    gameMessage.classList.add("active");
    // render()
    tttGame.startGame();
  };

  const playerMove = (row, col) => {
    const gameState = tttGame.move(row, col);

    if (gameState != -1) {
      // gameOver
      setGameMessage(`Game over! gameState: ${gameState}`);
      disableGame();
      reset.classList.add("active");
    }
  };

  return { init, render, setGameMessage };
})();

displayController.init();
