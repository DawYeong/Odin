import { Gameboard } from "../src/modules/Gameboard";

describe("Testing Gameboard API", () => {
  describe("Testing placeShip", () => {
    test("Place ship vertically in correct location", () => {
      const gb = new Gameboard();

      expect(gb.placeShip(0, 0, 4, false)).toStrictEqual([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
      ]);
    });

    test("Place ship horizontally in correct location", () => {
      const gb = new Gameboard();

      expect(gb.placeShip(0, 0, 4, true)).toStrictEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
      ]);
    });

    test("Place ship in invalid location", () => {
      const gb = new Gameboard();

      expect(gb.placeShip(9, 8, 4, false)).toBeNull();
    });

    test("Place ship with invalid start position", () => {
      const gb = new Gameboard();

      expect(gb.placeShip(-1, -1, 1, false)).toBeNull();
    });

    test("Place ship with invalid length", () => {
      const gb = new Gameboard();

      expect(gb.placeShip(1, 1, -4, false)).toBeNull();
    });
  });

  describe("Testing receiveAttack", () => {
    test("Hit ship on start coordinate", () => {
      const gb = new Gameboard();
      gb.placeShip(0, 0, 4, false);

      expect(gb.receiveAttack(0, 0)).toBe(1);
    });

    test("Hit ship on non-start coordinate", () => {
      const gb = new Gameboard();
      gb.placeShip(0, 0, 4, false);

      expect(gb.receiveAttack(2, 0)).toBe(1);
    });

    test("Miss ship with incorrect coordinate", () => {
      const gb = new Gameboard();
      gb.placeShip(0, 0, 1, false);

      expect(gb.receiveAttack(4, 5)).toBe(0);
    });

    test("Attack on already attacked coordinate", () => {
      const gb = new Gameboard();
      gb.placeShip(0, 0, 2, false);
      gb.receiveAttack(0, 0);

      expect(gb.receiveAttack(0, 0)).toBe(-1);
    });
  });
});
