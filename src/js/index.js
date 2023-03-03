class Calculator {
  constructor() {
    this.value = 0;
  }
  sum(num1, num2) {
    this.validate(num1, num2);
    this.value = Math.floor(num1 + num2);
    console.log(this.value);
  }
  subtract(num1, num2) {
    this.validate(num1, num2);
    this.value = Math.floor(num1 - num2);
    console.log(this.value);
  }
  multiply(num1, num2) {
    this.value = Math.floor(num1 * num2);
    console.log(this.value);
  }
  divide(num1, num2) {
    this.validate(num1, num2);
    this.value = Math.floor(num1 / num2);
    console.log(this.value);
  }
  clear() {
    this.value = 0;
    console.log(this.value);
  }
  validate(num1, num2) {
    if (num1 > 999 || num2 > 999) throw new Error("3자리 수 이하를 입력하세요");
  }
}

const calculator = new Calculator();
calculator.sum(1, 2); // 3
calculator.subtract(1, 2); // -1
calculator.multiply(1, 2); // 2
calculator.divide(1, 2); // 0.5
calculator.clear(); // 0
calculator.sum(1234, 1234); // Error
