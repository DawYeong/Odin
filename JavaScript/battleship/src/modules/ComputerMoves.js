import { Gameboard } from "./Gameboard";

function getRandomCoordinate(moves) {
  const ind = Math.floor(Math.random() * moves.length);
  const position = moves.splice(ind, 1);
  return [
    Math.floor(position / Gameboard.GRID_SIZE),
    position % Gameboard.GRID_SIZE,
  ];
}

function computerPlacement(player) {
  const positions = [
    ...Array(Gameboard.GRID_SIZE * Gameboard.GRID_SIZE).keys(),
  ];

  console.log("positions: ", positions);
  while (!player.isAllShipsPlaced() && positions.length > 0) {
    const orientation = !!Math.floor(Math.random() * 2);
    const coords = getRandomCoordinate(positions);
    if (!player.placeShip(coords[0], coords[1], orientation)) {
      player.placeShip(coords[0], coords[1], !orientation);
    }
  }
}

// randomly shoots
function computerShoot(computer, opponent, availableMoves) {
  const coords = getRandomCoordinate(availableMoves);
  return computer.fire(coords[0], coords[1], opponent.gameBoard);
}

export { computerPlacement, computerShoot };
