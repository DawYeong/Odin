import { Ship } from "../src/modules/Ship";

describe("Testing Ship API", () => {
  test("Check if hit is incrementing", () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.hit()).toBe(2);
  });

  test("Stop incrementing hits after ship is sunk", () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hit()).toBe(4);
  });

  test("Ship not sunk if hit requirement not met", () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship sunk if hit requirement is met", () => {
    const ship = new Ship(4);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
