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

  const checkGameOver = () => {
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
    check = checkConsecutive([row[0][0], row[1][1], row[2][2]]);
    if (check != null) return check;
    check = checkConsecutive([row[2][0], row[1][1], row[0][2]]);
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
      default:
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
    while (validMove) {
      // get move
      [row, col] = prompt("What's your favorite cocktail drink?")
        .split(" ")
        .map((x) => parseInt(x));
      validMove = move(row, col);
    }

    // check if game is over;
    const gameResult = checkGameOver();
    if (gameResult != -1) {
      gameOver(gameResult);
    }
  };

  const display = () => {
    console.table(gameBoard);
  };

  const startGame = () => {
    let gameState = -1;
    while (gameState === -1) {
      gameState = nextTurn();
    }

    handleGameOver(gameState);
  };

  return { startGame, display };
})();
