const { fibs, fibsRec } = require("./fibonacci");

describe("Fibonacci iterative and recursive", () => {
  test("fibonacci 8 must match the example", () => {
    const expected = [0, 1, 1, 2, 3, 5, 8, 13];
    expect(fibs(8)).toStrictEqual(expected);
    expect(fibsRec(8)).toStrictEqual(expected);
  });

  test("fibonacci 1 must match the example", () => {
    const expected = [0];
    expect(fibs(1)).toStrictEqual(expected);
    expect(fibsRec(1)).toStrictEqual(expected);
  });

  test("fibonacci 2 must match the example", () => {
    const expected = [0, 1];
    expect(fibs(2)).toStrictEqual(expected);
    expect(fibsRec(2)).toStrictEqual(expected);
  });

  test("Anything 0 or less must return empty", () => {
    const expected = [];
    expect(fibs(0)).toStrictEqual(expected);
    expect(fibsRec(0)).toStrictEqual(expected);
  });

  test("fibonacci 10 must match the example", () => {
    const expected = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
    expect(fibs(10)).toStrictEqual(expected);
    expect(fibsRec(10)).toStrictEqual(expected);
  });
});
