export class Ship {
  #length;
  #hits;
  constructor(length) {
    this.#length = length;
    this.#hits = 0;
  }

  hit() {}

  isSunk() {}
}
