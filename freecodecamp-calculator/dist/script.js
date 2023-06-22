const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.getElementById("equals");
const deleteButton = document.querySelector(".delete");
const allClearButton = document.getElementById("clear");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
});

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "0";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (number === "0" && this.currentOperand === "0") return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    if (this.currentOperand[0] === "0" && this.currentOperand[1] !== ".") {
      this.currentOperand = this.currentOperand.slice(1);
    }
  }

  chooseOperation(operation) {
    if (
    (this.previousOperandTextElement.innerText.slice(-1) === "+" ||
    this.previousOperandTextElement.innerText.slice(-1) === "*" ||
    this.previousOperandTextElement.innerText.slice(-1) === "/" ||
    this.previousOperandTextElement.innerText.slice(-1) === "-") && (
    operation === "+" || operation === "*" || operation === "/") &&
    this.currentOperand === "")
    {
      this.previousOperandTextElement.innerText =
      this.previousOperandTextElement.innerText.slice(0, -1);
      this.operation = operation;
    } else if (
    this.previousOperandTextElement.innerText.slice(-1) === "*" &&
    operation === "-" &&
    this.currentOperand === "")
    {
      this.operation = "*-";
    } else if (
    this.previousOperandTextElement.innerText.slice(-1) === "-" &&
    operation === "-" &&
    this.currentOperand === "")
    {
      this.operation = "+";
    } else if (
    this.previousOperandTextElement.innerText.slice(-1) === "/" &&
    operation === "-" &&
    this.currentOperand === "")
    {
      this.operation = "/-";
    } else if (
    this.previousOperandTextElement.innerText.slice(-1) === "+" &&
    operation === "-" &&
    this.currentOperand === "")
    {
      this.operation = "-";
    }

    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "*-":
        computation = -prev * current;
        break;
      case "/-":
        computation = -prev / current;
        break;
      default:
        return;}

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const floatNumber = parseFloat(number);
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(floatNumber)) return "";
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0 });

    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }

    return floatNumber.toLocaleString("en");
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
      this.previousOperand)
      } ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }}


const calculator = new Calculator(
previousOperandTextElement,
currentOperandTextElement);