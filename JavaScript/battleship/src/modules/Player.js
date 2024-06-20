import { Gameboard } from "./Gameboard";

export class Player {
  static shipLengths = [5, 4, 3, 3, 2];

  constructor() {
    this.gameBoard = new Gameboard();
    this.numShips = 0;
  }

  placeShip(row, col, isHorizontal) {
    if (this.isAllShipsPlaced()) return false;

    if (
      this.gameBoard.placeShip(
        row,
        col,
        Player.shipLengths[this.numShips],
        isHorizontal
      ) != null
    ) {
      this.numShips += 1;
      return true;
    }

    return false;
  }

  fire(row, col, enemyGB) {
    return enemyGB.receiveAttack(row, col);
  }

  getCurrentShipLength() {
    if (this.isAllShipsPlaced()) return -1;
    return Player.shipLengths[this.numShips];
  }

  isAllShipsPlaced() {
    return this.numShips === Player.shipLengths.length;
  }
}
