const container = document.querySelector(".container");

const tttGame = (function () {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  let players = ["Player 1", "Player 2"];
  // false = x, true = o
  let turn = false;
  let turnCount = 0;

  const setPlayerNames = (player1, player2) => {
    const player1Name = player1.trim();
    const player2Name = player2.trim();
    players = [
      player1Name.length > 0 ? player1Name : "Player 1",
      player2Name.length > 0 ? player2Name : "Player 2",
    ];
  };

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
    return result === 2 ? "It is a draw!" : `${players[result]} won!`;
  };

  const reset = () => {
    gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    turn = false;
    turnCount = 0;
    players = ["Player 1", "Player 2"];
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

    const gameState = getGameState();

    if (gameState != -1) {
      displayController.setGameMessage(handleGameOver(gameState));
    }

    return gameState;
  };

  const startGame = () => {
    displayController.render(gameBoard);
  };

  return { startGame, move, reset, setPlayerNames };
})();

const displayController = (function () {
  const startSection = document.querySelector(".start-section");
  const gameSection = document.querySelector(".game-board");
  const gameMessage = document.querySelector(".game-message");
  const reset = document.querySelector(".reset");
  const playerInput = document.querySelector("#player-names");

  const init = () => {
    container.addEventListener("click", function (e) {
      console.dir(e.target);
      if (e.target.tagName) {
        switch (e.target.classList[0]) {
          case "start-btn":
            start();
            break;
          case "reset-btn":
            displayReset();
            break;
          case "ttt-btn":
            playerMove(
              parseInt(e.target.attributes["row"].value),
              parseInt(e.target.attributes["col"].value)
            );
            break;
        }
      }
    });

    playerInput.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputs = e.target.querySelectorAll("input");
      tttGame.setPlayerNames(inputs[0].value, inputs[1].value);
    });
  };

  const render = (gameBoard) => {
    gameSection.innerHTML = "";
    let cell;
    let img;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const box = document.createElement("div");
        box.className = "box";
        cell = document.createElement("button");
        cell.type = "button";
        cell.className = "ttt-btn";
        cell.setAttribute("row", i);
        cell.setAttribute("col", j);

        if (gameBoard[i][j] === false) {
          img = document.createElement("img");
          img.src = "./icons/x.svg";
          cell.appendChild(img);
        } else if (gameBoard[i][j] === true) {
          img = document.createElement("img");
          img.src = "./icons/o.svg";
          cell.appendChild(img);
        }
        box.appendChild(cell);
        gameSection.appendChild(box);
      }
    }
    console.dir(container);
  };

  const setGameMessage = (message) => {
    gameMessage.innerText = message;
  };

  const disableGame = () => {
    const cells = document.querySelectorAll(".ttt-btn");
    cells.forEach((cell) => {
      cell.disabled = true;
    });
  };

  const displayReset = () => {
    tttGame.reset();
    playerInput.reset();
    startSection.classList.add("active");
    gameSection.classList.remove("active");
    gameMessage.innerText = "";
    gameMessage.classList.remove("active");
    reset.classList.remove("active");
  };

  const start = () => {
    //start the game...
    startSection.classList.remove("active");
    gameSection.classList.add("active");
    gameMessage.classList.add("active");

    tttGame.startGame();
  };

  const playerMove = (row, col) => {
    const gameState = tttGame.move(row, col);

    if (gameState != -1) {
      // gameOver
      disableGame();
      reset.classList.add("active");
    }
  };

  return { init, render, setGameMessage };
})();

displayController.init();
