# 프록시 패턴

- 프록시(Proxy) : 대리인
- 대상 객체와 직접 상호작용 하지 않고 프록시 객체와 상호작용
- 특정 객체와의 상호작용을 더 잘 제어
- 프록시 객체는 값을 가져오거나 값을 설정할 때와 같이 객체와 상호작용할 때마다 동작 결정 가능

### 1. JavaScript 내장 `Proxy` 클래스 사용하기

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};
// Proxy 클래스의 새 인스턴스로 새 프록시 생성
// 생성자의 2번째 인수에 핸들러 객체 전달
//                                     _
const personProxy = new Proxy(person, {});
```

### 2. 핸들러 객체

핸들러 객체는 아래 2가지 프로퍼티 보유

- get() : 프로퍼티에 접근할 때 호출됨
- set() : 프로퍼티를 수정할 때 호출됨

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${obj[prop]}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    obj[prop] = value;
    return true;
  },
});

personProxy.name; // The value of name is John Doe
personProxy.age = 43; // Changed age from 42 to 43
```

핸들러 객체는 유효성 검증에도 유용

```js
const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log(`Hmm.. this property doesn't seem to exist`);
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log(`Sorry, you can only pass numeric values for age.`);
    } else if (prop === "name" && value.length < 2) {
      console.log(`You need to provide a valid name.`);
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
    return true;
  },
});

personProxy.nonExistentProperty; // Hmm.. this property doesn't seem to exist
personProxy.age = "44"; // Sorry, you can only pass numeric values for age.
personProxy.name = ""; // You need to provide a valid name.
```

### 3. Reflect 내장 객체

Reflect 객체를 사용하여 대상 객체를 더 쉽게 조작할 수 있다

- 이전에는 객체[키] 형태의 대괄호 표기법을 사용하여 직접 프로퍼티를 get/set 해야 했음
- Reflect 객체의 메서드를 활용하면 이러한 과정을 간단하게 표현 가능
- Reflect 객체의 메서드는 핸들러 객체의 메서드와 동일한 이름과 매개변수를 가짐
  - e.g. `Reflect.get()` or `Reflect.set()`

```js
const person = {
  name: "John Doe",
  age: 42,
  nationality: "American",
};

const personProxy = new Proxy(person, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  },
});

personProxy.name; // The value of name is John Doe
personProxy.age = 43; // Changed age from 42 to 43
personProxy.name = "Jane Doe"; // Changed name from John Doe to Jane Doe
```

### 4. 트레이드 오프

- 프록시 패턴은 객체의 동작을 제거하는데 유용하며 유효성 검증, 포매팅, 알림(notification), 디버깅 등에 활용 가능
- 단, 프록시 객체를 과용하거나, 핸들러 메서드 호출 시 많은 작업을 수행하게 하면 성능을 저하시킬 수 있음
  - 성능이 중요한 코드에서는 프록시를 사용하지 않는 것이 좋음
