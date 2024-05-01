const container = document.querySelector(".container");
const calculator = document.querySelector(".calculator");
const display = document.querySelector(".display");

const MAX_DIGITS = 11;
let displayOperand = display.innerText;

let operand1 = 0,
  currOperator = "";

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

const roundScientific = (numString, expPos) => {
  const digits = Math.pow(10, numString.length - MAX_DIGITS);
  const numberSection = numString.slice(0, expPos);
  return (
    (Math.round(parseFloat(numberSection) * digits) / digits).toString() +
    numString.slice(expPos)
  );
};

const roundNumber = (num) => {
  const numString = num.toString();

  if (numString.length <= MAX_DIGITS) {
    displayOperand = numString;
  } else {
    let round;
    let expPos = numString.indexOf("e");
    if (expPos != -1) {
      round = roundScientific(numString, expPos);
    } else {
      const wholeLength = numString.split(".")[0].length;
      // limit display to MAX_DIGITS
      if (wholeLength > MAX_DIGITS) {
        const scientificNotation = num.toPrecision(MAX_DIGITS);
        round = roundScientific(
          scientificNotation,
          scientificNotation.indexOf("e")
        );
      } else {
        const decimalPlaces = Math.pow(10, MAX_DIGITS - wholeLength);
        round = (Math.round(num * decimalPlaces) / decimalPlaces).toString();
      }
    }
    displayOperand = round;
  }

  display.innerText = displayOperand;
};

const operate = (a, b, op) => {
  switch (op) {
    case "add":
      operand1 = add(a, b);
      break;
    case "subtract":
      operand1 = subtract(a, b);
      break;
    case "multiply":
      operand1 = multiply(a, b);
      break;
    case "divide":
      operand1 = divide(a, b);
      break;
    default:
      return;
  }

  roundNumber(operand1);
};

const updateOperand = (digit) => {
  if (displayOperand.length >= MAX_DIGITS) return;

  if (displayOperand === "0") {
    if (digit === "0") return;
    displayOperand = digit;
  } else {
    displayOperand += digit;
  }

  display.innerText = displayOperand;
};

const evaluate = () => {
  if (currOperator != "") {
    operate(operand1, parseFloat(displayOperand), currOperator);
    currOperator = "";
    displayOperand = operand1.toString();
  }
};

const updateOperator = (op) => {
  // if operator exists => perform operation then change op
  if (currOperator != "") {
    operate(operand1, parseFloat(displayOperand), currOperator);
  } else {
    operand1 = parseFloat(displayOperand);
  }
  currOperator = op;
  displayOperand = "0";
};

const clear = () => {
  displayOperand = "0";
  currOperator = "";
  operand1 = 0;
  display.innerText = displayOperand;
};

const percent = () => {
  const percentNumber = parseFloat(displayOperand) / 100;
  roundNumber(percentNumber);
};

const toggleSign = () => {
  roundNumber(parseFloat(displayOperand) * -1);
};

const addDecimal = () => {
  // check if number has a decimal
  if (displayOperand.length >= MAX_DIGITS || displayOperand.indexOf(".") > -1)
    return;
  displayOperand += ".";
  display.innerText = displayOperand;
};

calculator.addEventListener("click", function (e) {
  switch (e.target.className) {
    case "operand":
      updateOperand(e.target.value);
      break;
    case "operator":
      updateOperator(e.target.value);
      break;
    case "clear":
      clear();
      break;
    case "sign":
      toggleSign();
      break;
    case "percent":
      percent();
      break;
    case "decimal":
      addDecimal();
      break;
    case "equals":
      evaluate();
      break;
    default:
      break;
  }
});

document.addEventListener("keypress", function (e) {
  const button = document.querySelector(`button[code="${e.code}"]`);

  if (button) {
    button.click();
  }
});
