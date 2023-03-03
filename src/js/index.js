const $ = (selector) => document.querySelector(selector); // 코드를 줄여주는 함수

class Calculator {
  constructor() {
    this.value = 0;
    this.initEventListener(); // 인스턴스 생성과 동시에 initEventListener 메서드 실행
  }
  sum(num1, num2) {
    this.validate(num1, num2);
    this.value = Math.floor(num1 + num2);
    return this.value;
  }
  subtract(num1, num2) {
    this.validate(num1, num2);
    this.value = Math.floor(num1 - num2);
    return this.value;
  }
  multiply(num1, num2) {
    this.value = Math.floor(num1 * num2);
    return this.value;
  }
  divide(num1, num2) {
    this.validate(num1, num2);
    this.value = Math.floor(num1 / num2);
    return this.value;
  }
  clear() {
    this.value = 0;
    return this.value;
  }
  validate(num1, num2) {
    if (num1 > 999 || num2 > 999) throw new Error("3자리 수 이하를 입력하세요");
  }
  initEventListener() {
    $("#submit").addEventListener("click", () => {
      const num1 = parseInt($("#num1").value);
      const num2 = parseInt($("#num2").value);
      $("#result").innerText = this.sum(num1, num2);
    });
  }
}

const calculator = new Calculator();
calculator.sum(1, 2); // 3
calculator.subtract(1, 2); // -1
calculator.multiply(1, 2); // 2
calculator.divide(1, 2); // 0.5
calculator.clear(); // 0
// calculator.sum(1234, 1234); // Error
