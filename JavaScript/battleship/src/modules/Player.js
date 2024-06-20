import { Gameboard } from "./Gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard();
  }

  fire(row, col, enemyGB) {
    return enemyGB.receiveAttack(row, col);
  }
}
