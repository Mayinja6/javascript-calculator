class Calculator {
  constructor(prevOperandEl, currOperandEl) {
    this.prevOperandEl = prevOperandEl;
    this.currOperandEl = currOperandEl;
    this.clear();
  }

  clear() {
    this.prevOperand = "";
    this.currOperand = "";
    this.operator = undefined;
  }

  delete() {
    if (!this.currOperand) return;

    this.currOperand = String(this.currOperand).slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    if (number === "." && !this.currOperand) return (this.currOperand = "0.");
    this.currOperand = String(this.currOperand) + String(number);
  }

  operate(operator) {
    if (!this.currOperand || this.operator !== undefined) return;

    this.operator = operator;
    this.prevOperand = this.currOperand;
    this.currOperand = "";
  }

  calculate() {
    if (!this.currOperand || !this.operator) return;

    let prevNum = parseFloat(this.prevOperand);
    let currNum = parseFloat(this.currOperand);

    switch (this.operator) {
      case "÷":
        this.currOperand = prevNum / currNum;
        break;
      case "⋆":
        this.currOperand = prevNum * currNum;
        break;
      case "-":
        this.currOperand = prevNum - currNum;
        break;
      case "+":
        this.currOperand = prevNum + currNum;
        break;
      default:
        return;
    }

    this.prevOperand = "";
    this.operator = undefined;
  }

  updateDisplay() {
    this.currOperandEl.textContent = Number(this.currOperand).toLocaleString();
    if (this.operator)
      this.prevOperandEl.textContent = `${Number(
        this.prevOperand
      ).toLocaleString()} ${this.operator}`;
    else this.prevOperandEl.textContent = this.prevOperand;
  }
}

const prevOperandTextEl = document.querySelector("[data-prev_operand]"),
  currOperandTextEl = document.querySelector("[data-curr_operand]"),
  clearAllBtnElement = document.querySelector("[ data-clear_all]"),
  deleteBtnEl = document.querySelector("[data-delete]"),
  operatorBtnElements = document.querySelectorAll("[data-operator]"),
  numberBtnElements = document.querySelectorAll("[data-number]"),
  equalsBtnEl = document.querySelector("[data-equals]");

const calculator = new Calculator(prevOperandTextEl, currOperandTextEl);

clearAllBtnElement.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtnEl.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

numberBtnElements.forEach((numberBtn) => {
  numberBtn.addEventListener("click", () => {
    calculator.appendNumber(numberBtn.textContent);
    calculator.updateDisplay();
  });
});

operatorBtnElements.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", () => {
    calculator.operate(operatorBtn.textContent);
    calculator.updateDisplay();
  });
});

equalsBtnEl.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});
