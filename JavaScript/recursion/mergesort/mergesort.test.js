const mergesort = require("./mergesort");

describe("mergesort", () => {
  test("Testing list 1", () => {
    expect(mergesort([3, 2, 1, 13, 8, 5, 0, 1])).toStrictEqual([
      0, 1, 1, 2, 3, 5, 8, 13,
    ]);
  });

  test("Testing list 2", () => {
    expect(mergesort([105, 79, 100, 110])).toStrictEqual([79, 100, 105, 110]);
  });

  test("Already sorted list", () => {
    expect(mergesort([1, 2, 3, 4])).toStrictEqual([1, 2, 3, 4]);
  });

  test("Single item list", () => {
    expect(mergesort([1])).toStrictEqual([1]);
  });

  test("Empty list", () => {
    expect(mergesort([])).toStrictEqual([]);
  });
});
