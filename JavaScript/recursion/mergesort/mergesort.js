const merge = function (l, r) {
  if (l.length === 0) {
    return r;
  }
  if (r.length === 0) {
    return l;
  }

  if (l[0] <= r[0]) {
    return [l[0], ...merge(l.slice(1), r)];
  } else {
    return [r[0], ...merge(l, r.slice(1))];
  }
};

const mergesort = function (arr) {
  const mid = Math.floor(arr.length / 2);
  if (arr.length > 1) {
    return merge(mergesort(arr.slice(0, mid)), mergesort(arr.slice(mid)));
  } else {
    return arr;
  }
};

module.exports = mergesort;
