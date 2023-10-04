let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("오직 하나의 인스턴스만 만들 수 있습니다!");
    }
    instance = this;
  }
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

// 프로퍼티를 추가하거나 변경 불가
// 단, 얕은 동결이므로 프로퍼티가 객체라면 손자 프로퍼티 수정 가능
const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
