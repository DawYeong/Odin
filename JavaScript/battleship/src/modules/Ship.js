export class Ship {
  #length;
  #hits;
  constructor(length) {
    this.#length = length;
    this.#hits = 0;
  }

  hit() {
    if (this.#length > this.#hits) {
      this.#hits += 1;
    }
    return this.#hits;
  }

  isSunk() {
    return this.#hits >= this.#length;
  }
}
