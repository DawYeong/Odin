import { Gameboard } from "./Gameboard";

export function computerPlacement(player) {
  const positions = [
    ...Array(Gameboard.GRID_SIZE * Gameboard.GRID_SIZE).keys(),
  ];

  console.log("positions: ", positions);
  while (!player.isAllShipsPlaced() && positions.length > 0) {
    const orientation = !!Math.floor(Math.random() * 2);
    const ind = Math.floor(Math.random() * positions.length);
    const position = positions.splice(ind, 1);
    const coords = [
      Math.floor(position / Gameboard.GRID_SIZE),
      position % Gameboard.GRID_SIZE,
    ];
    if (!player.placeShip(coords[0], coords[1], orientation)) {
      player.placeShip(coords[0], coords[1], !orientation);
    }
  }
}
