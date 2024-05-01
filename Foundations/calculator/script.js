const container = document.querySelector(".container");

console.log(container.attributes);

let var1 = 0,
  var2 = 0,
  op = "";

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  if (b === 0) {
    // error
    return "undefined";
  }

  return a / b;
};

const operator = (a, b, op) => {
  switch (op) {
    case 0:
      return add(a, b);
    case 1:
      return subtract(a, b);
    case 2:
      return multiply(a, b);
    case 3:
      return divide(a, b);
    default:
      break;
  }
};
