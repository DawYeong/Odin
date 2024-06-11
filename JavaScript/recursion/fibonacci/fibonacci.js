const fibs = function (n) {
  res = [];

  if (n <= 0) {
    return res;
  }

  if (n >= 1) {
    res.push(0);
  }
  if (n >= 2) {
    res.push(1);
  }

  for (let i = 2; i < n; i++) {
    res.push(res[i - 1] + res[i - 2]);
  }

  return res;
};

const fibsRec = function (n) {
  if (n <= 0) {
    return [];
  }

  const traverse = (n, end, currRes = []) => {
    const newRes = [...currRes];

    if (n === 1) {
      newRes.push(0);
    } else if (n === 2) {
      newRes.push(1);
    } else {
      newRes.push(currRes[currRes.length - 1] + currRes[currRes.length - 2]);
    }

    if (n === end) {
      return newRes;
    } else {
      return traverse(n + 1, end, newRes);
    }
  };

  return traverse(1, n);
};

module.exports = { fibs, fibsRec };
