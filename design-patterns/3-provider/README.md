# 프로바이더 패턴

- 다수의 자식 컴포넌트가 데이터를 공유할 수 있게 함
- 전역 상태를 공유하는데 매우 유용

## 1. props로 데이터를 자식 컴포넌트에 전달하는 기존 구조의 문제

- props를 통해 모든 컴포넌트가 같은 데이터를 참조할 수 있게 하는 것은 어렵다
  - `props drilling`을 유발할 수 있으며 이는 리팩토링 및 데이터의 출처를 파악하기 힘들게 만든다

예시 이미지

![Alt text](image.png)

코드 예시

```js
function App() {
  const data = { ... }

  return (
    <div>
      <SideBar data={data} />
      <Content data={data} />
    </div>
  )
}

const SideBar = ({ data }) => <List data={data} />
const List = ({ data }) => <ListItem data={data} />
const ListItem = ({ data }) => <span>{data.listItem}</span>

const Content = ({ data }) => (
  <div>
    <Header data={data} />
    <Block data={data} />
  </div>
)
const Header = ({ data }) => <div>{data.title}</div>
const Block = ({ data }) => <Text data={data} />
const Text = ({ data }) => <h1>{data.text}</h1>
```

- 데이터를 사용하지 않는 컴포넌트 레이어도 props로 data를 가져야 하는 문제가 있다
- provider 패턴을 사용하여 하위 레이어에 props를 전달하는 대신 모든 컴포넌트를 provider로 래핑할 수 있다

## 2. Context API를 활용한 Provider 패턴

- Provider : Context 객체가 제공하는 HOC(high order component)
- createContext 메서드를 사용하여 Context 객체 생성 가능
- Provider 컴포넌트는 value props를 받기 때문에 여기에 전달할 data를 부여하면 된다

```js
const DataContext = React.createContext()

function App() {
  const data = { ... }

  return (
    <DataContext.Provider value={data}>
      <SideBar />
      <Content />
    </DataContext.Provider>
  )
}
```

- 이제 자식 컴포넌트(SideBar, Content)들은 data에 접근할 수 있다
- data consumer는 useContext 훅을 사용하여 데이터를 전달받는다
  - useContext 훅에 context 객체를 전달하면 전역 상태를 컴포넌트에서 읽고 쓸 수 있다

```js
const DataContext = React.createContext();

function App() {
  const data = { ... }

  return (
    <DataContext.Provider value={data}>
      <SideBar />
      <Content />
    </DataContext.Provider>
  )
}

const SideBar = () => <List />
const List = () => <ListItem />
const Content = () => <div><Header /><Block /></div>


function ListItem() {
  const { data } = React.useContext(DataContext);
  return <span>{data.listItem}</span>;
}

function Text() {
  const { data } = React.useContext(DataContext);
  return <h1>{data.text}</h1>;
}

function Header() {
  const { data } = React.useContext(DataContext);
  return <div>{data.title}</div>;
}
```

## 3. 다크모드 구현하기
### Provider
- 모든 컴포넌트에 현재 theme 데이터를 전달하는 대신, ThemeProvider 컴포넌트로 theme이 필요한 컴포넌트들을 래핑한다
- ThemeProvider 컴포넌트에서 theme 파일과 객체를 context에 보관

### CSS
- toggle switch를 클릭하면 theme state가 "dark" | "light" 사이에서 변화
- 그에 따라 동적으로 클래스네임도 변경되며 CSS도 다르게 적용됨

### custom hook 으로 더 간단하게 만들기
- useThemeContext 커스텀 훅을 만들어서 context 객체와 useContext 훅을 묶어서 더욱 간단하게 만든다

### 결과
https://codesandbox.io/s/determined-bohr-l6ncv6?file=/src/styles.css

## 4. 케이스 스터디
### Styled-components에서 Provider 패턴 찾기
- styled-components 라이브러리에서는 ThemeProvider 래퍼를 제공하여 Context API를 사용하지 않고도 편하게 theme을 사용할 수 있게 해준다
- 특별히 훅을 사용할 필요도 없음

https://codesandbox.io/embed/divine-platform-gbuls

Provider
```js
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import "./styles.css";

import List from "./List";
import Toggle from "./Toggle";

export const themes = {
  light: {
    background: "#fff",
    color: "#000"
  },
  dark: {
    background: "#171717",
    color: "#fff"
  }
};

export default function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className={`App theme-${theme}`}>
      <ThemeProvider theme={themes[theme]}>
        <>
          <Toggle toggleTheme={toggleTheme} />
          <List />
        </>
      </ThemeProvider>
    </div>
  );
}

```

Consumer
```js
import React from "react";
import styled from "styled-components";

export default function ListItem() {
  return (
    <Li>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Li>
  );
}

const Li = styled.li`
  ${({ theme }) => `
    background-color: ${theme.backgroundColor};
    color: ${theme.color};
  `}
`;

```

## 5. 트레이드 오프
### 장점
- 각 컴포넌트 레이어에 데이터를 직접 전달할 필요 없이 간편하게 데이터 전달 가능
- props drilling을 막을 수 있음

### 단점
- 전역 데이터가 변경되면 모든 하위 컴포넌트들이 리렌더링되어 성능 문제를 초래할 수 있음
  - 예) 다크모드 구현에서 스위치 토글할 때마다 전역 상태를 참조하지 않는 List 컴포넌트도 리렌더링됨
- 이를 막으려면 프로바이더를 여러 개로 나누어야 함

## 참고

https://www.patterns.dev/posts/provider-pattern
