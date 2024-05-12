const tttGame = (function () {
  let gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
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
    if (row < 0 || row > 2 || col < 0 || col > 2 || gameBoard[row][col] != null)
      return false;

    gameBoard[row][col] = turn;
    turn = !turn;
    turnCount += 1;

    return true;
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
    let gameState = -1;
    while (gameState === -1) {
      gameState = nextTurn();
      console.log(`gameState: ${gameState}`);
      display();
    }

    handleGameOver(gameState);
    reset();
  };

  return { startGame };
})();
