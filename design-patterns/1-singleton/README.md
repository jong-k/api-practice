# 싱글턴 패턴

- 클래스들이 하나의 인스턴스만 가짐
- 인스턴스는 앱 전역에서 참조됨 => 전역 상태 관리에 효과적

### 1. Counter class 만들기

`counter-class.js`

```js
let counter = 0;

class Counter {
  // 인스턴스를 반환
  getInstance() {
    return this;
  }
  // 현재 counter 변수 값을 반환
  getCount() {
    return counter;
  }
  // counter 1 증가
  increment() {
    return ++counter;
  }
  // counter 1 감소
  decrement() {
    return --counterl;
  }
}

// 현재는 여러 인스턴스를 만들 수 있으며 각기 다르기 때문에 싱글턴 패턴이 아니다
const counter1 = new Counter();
const counter2 = new Counter();
```

### 2. 오직 1개의 인스턴스만 갖는 Counter class 만들기

`counter-class.js`

```js
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
    return --counterl;
  }
}

const counter1 = new Counter();
// 에러 발생
const counter2 = new Counter();
```

### 3. 싱글턴 인스턴스를 export 하기 전에 다른 곳에서 수정하지 못하게 하기

`counter-class.js`

```js
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
    return --counterl;
  }
}

// 프로퍼티를 추가하거나 변경 불가
// 단, 얕은 동결이므로 프로퍼티가 객체라면 손자 프로퍼티 수정 가능
const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

### 4. 트레이드오프

- 인스턴스를 1개로 제한하면 추가 인스턴스 생성에 따른 메모리를 아낄 수 있다
- 단, JavaScript에서 싱글턴 패턴은 안티패턴이므로 쓰지 않는 것이 좋다
- 다른 OOP 언어들과 달리, JS는 객체를 직접 생성할 수 있으므로 굳이 클래스를 사용할 필요는 없다

### 5. 클래스 대신 일반 객체 사용해서 카운터 구현하기

`counter-object.js`

```js
let count = 0;

export const counter = {
  increment() {
    return ++count;
  },

  decrement() {
    return --count;
  },
};

Object.freeze(counter);
```

### 6. React에서의 싱글턴 패턴

- 일반적으로 싱글턴 패턴을 사용해 전역 상태를 사용하면 전역 상태가 오염될 위험이 있음
- React에서는 싱글턴 대신 Redux, Context 을 활용해 전역 상태에 의존
- 이러한 도구를 사용하면, 전역 상태가 오염될 위험을 줄이면서 전역 상태를 관리할 수 있음
