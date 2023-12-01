# HOC(고차 컴포넌트) Pattern

여러 컴포넌트에 동일한 로직을 사용하고자 하는 경우 사용

- e.g. 컴포넌트에 특정 스타일 적용, 권한 부여 필요, 전역 상태 추가

## Higher Order Component(고차 컴포넌트)

- 다른 컴포넌트를 받는 컴포넌트
- 특정 로직을 포함하고 있으며, 인수로 전달받는 컴포넌트에 이 로직을 적용한 후 반환
- e.g. 여러 컴포넌트에 특정 스타일을 추가하고 싶을 때, 매번 로컬에서 스타일 객체를 만드는 대신, 전달한 컴포넌트에 스타일 객체를 추가해주는 HOC 만들 수 있음
- 예시

```tsx
function WithStyles(Component: React.ComponentType) {
  return (props: any) => {
    const style = { padding: "0.2rem", margin: "1rem" };
    return <Component style={style} {...props} />;
  };
}

const Button = () => <button>Click me!</button>;
const TextElement = () => <p>Hello World!</p>;

const StyledButton = WithStyles(Button);
const StyledTextElement = WithStyles(TextElement);
```

## 데이터 로드중일 때 로딩중 UI를 표시해주는 WithLoader HOC 컴포넌트 만들기

- DogImages.tsx : url을 props로 받아 이미지를 표시해주는 컴포넌트
- WithLoader.tsx : HOC 컴포넌트로 DogImages 컴포넌트를 props로 받아 데이터 페칭, Loading UI 표시 등의 기능을 수행

고차 컴포넌트 패턴으로 얻은 효과

- 모든 로직을 한 곳(WithLoader.tsx)에 유지하면서 여러 컴포넌트에 동일한 로직 제공 가능

## 고차 컴포넌트 합성

DogImages 컴포넌트가 호버링되면 텍스트 띄우기 기능을 추가

- WithHover HOC 컴포넌트를 생성
- 이미 WithLoader 컴포넌트로 래핑된 DogImages 컴포넌트를 WithHover 컴포넌트로 래핑한다 (합성)

WithHover HOC 컴포넌트

- mouse enter, leave 등의 이벤트 등에 따라 hovering(boolean) 값을 props로 받을 컴포넌트(DogImages)에 전달해줌
- DogImages 에서 hovering props 에 따라 text element 를 조건부 렌더링

## Hooks

- HOC 컴포넌트를 Hooks로 대체할 수도 있다

WithHover 컴포넌트를 useHover 훅으로 대체하기

- useHover 훅에서 ref 객체(DogImages 컴포넌트의 가장 바깥 div 엘리먼트)를 만든다
- ref 객체에 mouseOver, mouseOut 이벤트에 따라 hovering 상태를 변경하는 이벤트 핸들러를 부착한다
- useHover 훅을 DogImages 컴포넌트 내부에서 호출한다

Hooks가 HOC보다 좋은 점

- 컴포넌트 트리가 깊어지는 것을 막을 수 있다
- 예시: HOC 컴포넌트로 인해 트리가 깊어지는 현상

```
<withAuth>
  <withLayout>
    <withLogging>
      <Component />
    </withLogging>
  </withLayout>
</withAuth>
```

HOC가 Hooks보다 좋은 점

- Hooks는 HOC 패턴에 비해 버그가 발생할 위험이 높다 (Hook을 쓰면 커스텀이 더 자유로워서)

## Case Study: Apollo Client

- GraphQL의 라이브러리 중 하나인 Apollo 에서 기존 HOC 컴포넌트의 불편함을 해결하고자 useMutation Hook을 추가

InputHOC.js

- 컴포넌트가 여러 리졸버에 접근해야 하는 경우, 이를 위해 여러 개의 graphql() 고차 컴포넌트를 작성해야함
- 이는 데이터 전달을 이해하기 힘들게 할 수 있음 (순서를 따져야 할 수도 있음)

```js
import React from "react";
import "./styles.css";

import { graphql } from "react-apollo";
import { ADD_MESSAGE } from "./resolvers";

class Input extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
  }

  handleChange = (e) => {
    this.setState({ message: e.target.value });
  };

  handleClick = () => {
    this.props.mutate({ variables: { message: this.state.message } });
  };

  render() {
    return (
      <div className="input-row">
        <input onChange={this.handleChange} type="text" placeholder="Type something..." />
        <button onClick={this.handleClick}>Add</button>
      </div>
    );
  }
}

export default graphql(ADD_MESSAGE)(Input);
```

InputHook.js

- 여러개의 hook을 추가하기만 하면 되서 여러 리졸버를 사용하기 편함

```js
import React, { useState } from "react";
import "./styles.css";

import { useMutation } from "@apollo/react-hooks";
import { ADD_MESSAGE } from "./resolvers";

export default function Input() {
  const [message, setMessage] = useState("");
  const [addMessage] = useMutation(ADD_MESSAGE, {
    variables: { message },
  });

  return (
    <div className="input-row">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type something..."
      />
      <button onClick={addMessage}>Add</button>
    </div>
  );
}
```

## HOC의 장점과 단점

- 재사용하려는 로직을 모두 한 곳에 보관할 수 있음
- 이는 관심사의 분리를 쉽게 실현할 수 있을 뿐만 아니라 새로운 버그의 발생 위험을 줄일 수 있음
- 단, 컴포넌트 트리가 너무 깊어질 수 있음