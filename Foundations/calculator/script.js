const container = document.querySelector(".container");
const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");

let displayOperand = display.innerText;

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

const updateOperand = (digit) => {
  if (displayOperand.length === 12) return;

  if (displayOperand === "0") {
    if (digit === "0") return;
    displayOperand = digit;
  } else {
    displayOperand += digit;
  }

  display.innerText = displayOperand;
};

calculator.addEventListener("click", function (e) {
  switch (e.target.className) {
    case "operand":
      updateOperand(e.target.value);
      break;
    case "operator":
      break;
    case "clear":
      break;
    case "sign":
      break;
    case "percent":
      break;
    case "equals":
      break;
    default:
      break;
  }
});
