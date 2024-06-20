import { Ship } from "./Ship";

export class Gameboard {
  // 10 x 10 grid
  // place pieces
  // receiveAttack
  // report if all ships sunk
  static GRID_SIZE = 10;
  #grid;
  #shipCount;
  #ships;

  constructor() {
    this.#init();
  }

  #init() {
    this.#grid = this.#initializeGrid();
    this.#shipCount = 0;
    this.#ships = [];
  }

  #initializeGrid() {
    return Array(Gameboard.GRID_SIZE).fill(
      Array(Gameboard.GRID_SIZE).fill([null, false])
    );
  }

  static #checkIfCoordsValid(coords) {
    return (
      coords[0] < Gameboard.GRID_SIZE &&
      coords[0] >= 0 &&
      coords[1] < Gameboard.GRID_SIZE &&
      coords[1] >= 0
    );
  }

  #isOverlap(start, length, isHorizontal) {
    let currPos = [start[0], start[1]];
    for (let i = 0; i < length; i++) {
      if (this.#grid[currPos[0]][currPos[1]][0] != null) {
        return true;
      }
      currPos = isHorizontal
        ? [currPos[0], currPos[1] + 1]
        : [currPos[0] + 1, currPos[1]];
    }
    return false;
  }

  static isShipInBounds(row, col, length, isHorizontal) {
    const start = [row, col];
    const end = isHorizontal
      ? [row, col + length - 1]
      : [row + length - 1, col];

    return (
      Gameboard.#checkIfCoordsValid(start) && Gameboard.#checkIfCoordsValid(end)
    );
  }

  // only able to place vertical or horizontal ships
  placeShip(row, col, length, isHorizontal) {
    const start = [row, col];

    if (
      !Gameboard.isShipInBounds(row, col, length, isHorizontal) ||
      this.#isOverlap(start, length, isHorizontal) ||
      length <= 0
    )
      return null;

    const res = [];
    let currPos = [row, col];
    this.#ships.push(new Ship(length));
    for (let i = 0; i < length; i++) {
      this.#grid[currPos[0]][currPos[1]] = [this.#shipCount, false];
      res.push(currPos);
      currPos = isHorizontal
        ? [currPos[0], currPos[1] + 1]
        : [currPos[0] + 1, currPos[1]];
    }

    this.#shipCount += 1;

    return res;
  }

  receiveAttack(row, col) {
    if (this.#grid[row][col][1]) return -1;

    this.#grid[row][col][1] = true;
    if (this.#grid[row][col][0] != null) {
      this.#ships[this.#grid[row][col][0]].hit();
      return 1;
    } else {
      // miss
      return 0;
    }
  }

  isAllShipSunk() {
    if (this.#ships.length === 0) return false;

    return this.#ships.every((ship) => ship.isSunk());
  }
}
