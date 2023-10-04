const person1 = {
  name: "Little Boy",
  age: 42,
  nationality: "USA",
};

// Proxy 클래스의 새 인스턴스로 새 프록시 생성
// 생성자의 2번째 인수에 핸들러 객체 전달
//                                     _
const person1Proxy = new Proxy(person1, {});

const person2 = {
  name: "Fat Man",
  age: 25,
  nationality: "USA",
};

// 핸들러 객체는 아래 2가지 프로퍼티 보유
// get() : 프로퍼티에 접근할 때 호출됨
// set() : 프로퍼티를 수정할 때 호출됨

// 프록시 패턴은 유효성 검증에도 유용
// 사용자가 나이(number) 필드를 string으로 변경하면 안됨
// 또한 존재하지 않는 프로퍼티에 엑세스해서도 안됨

const person2Proxy = new Proxy(person2, {
  get: (obj, prop) => {
    if (!obj[prop]) {
      console.log("존재하지 않는 프로퍼티입니다");
    } else {
      console.log(`The value of ${prop} is ${obj[prop]}`);
    }
  },
  set: (obj, prop, value) => {
    if (prop === "age" && typeof value !== "number") {
      console.log("'age' 프로퍼티에는 숫자값만 입력할 수 있습니다");
    } else if (prop === "name" && value.length < 2) {
      console.log("이름은 최소 2글자 이상을 입력해야 합니다");
    } else {
      console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
      obj[prop] = value;
    }
    return true;
  },
});

// person2Proxy["haha"]; // 존재하지 않는 프로퍼티입니다
// person2Proxy.nonono; // 존재하지 않는 프로퍼티입니다
// person2Proxy.age = "30"; // 'age' 프로퍼티에는 숫자값만 입력할 수 있습니다
// person2Proxy.nationality = "KOR"; // Changed nationality from USA to KOR.

const person3 = {
  name: "Big Man",
  age: 28,
  nationality: "USA",
};

const person3Proxy = new Proxy(person3, {
  get: (obj, prop) => {
    console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`);
  },
  set: (obj, prop, value) => {
    console.log(`Changed ${prop} from ${obj[prop]} to ${value}`);
    return Reflect.set(obj, prop, value);
  },
});

person3Proxy.name; // The value of name is Big Man
person3Proxy.age = 82; // Changed age from 28 to 82
person3Proxy.name = "Jane Doe"; // Changed name from Big Man to Jane Doe
