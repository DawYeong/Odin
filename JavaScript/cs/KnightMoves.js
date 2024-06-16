const MAXSIZE = 8;
const DIRECTIONS = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-1, -2],
  [-2, -1],
  [1, -2],
  [2, -1],
];

function checkInBounds(coords) {
  return (
    coords[0] >= 0 &&
    coords[0] < MAXSIZE &&
    coords[1] >= 0 &&
    coords[1] < MAXSIZE
  );
}

function knightMoves(start, target) {
  if (!checkInBounds(start) || !checkInBounds(target)) {
    console.log("Start and target must be positioned on a chessboard.");
    return;
  }

  const targetStr = JSON.stringify(target);

  workList = [[start]];
  unique = new Set();

  let result = [];

  // BFS

  while (workList.length != 0) {
    const item = workList.shift();
    const recentPosition = item.at(-1);
    const recentPositionStr = JSON.stringify(recentPosition);

    if (recentPositionStr === targetStr) {
      result = item;
      break;
    }

    unique.add(recentPositionStr);

    DIRECTIONS.forEach((direction) => {
      const newPos = [
        recentPosition[0] + direction[0],
        recentPosition[1] + direction[1],
      ];

      if (checkInBounds(newPos) && !unique.has(JSON.stringify(newPos))) {
        workList.push([...item, newPos]);
      }
    });
  }

  if (result.length === 0) {
    console.log(`Could not find a path from ${start} to ${target}`);
  } else {
    console.log(`You made it in ${result.length - 1} moves! Here's your path:`);
    result.forEach((pos) => console.log(pos));
  }
}

module.exports = { knightMoves };
