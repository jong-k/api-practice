# Render Props 패턴

컴포넌트 재사용성을 높일 수 있는 방법

## Render Props는?

- 컴포넌트의 props 이며 JSX 엘리먼트를 반환하는 함수
- render props 를 가진 컴포넌트 (렌더링 컴포넌트)는 render props 이외의 것은 렌더링하지 않고, render props 를 호출해주면 됨

render props 예시

```tsx
interface TitleProps {
  // render props
  render: () => JSX.Element;
}

// Title 컴포넌트는 props를 렌더링하는 역할만 수행
const Title = (props: TitleProps) => props.render();

export default function RenderPropsPage() {
  return (
    <div>
      <h1>Render Props Page!</h1>
      {/* render props가 호출되면서 화면에 렌더링됨 */}
      <Title render={() => <h2>✨ First render prop! ✨</h2>} />
      <Title render={() => <h2>🔥 Second render prop! 🔥</h2>} />
      <Title render={() => <h2>🚀 Third render prop! 🚀</h2>} />
    </div>
  );
}
```

여러 props를 지정할 수도 있다

- Title 컴포넌트 (render props 를 갖는 컴포넌트)

```tsx
interface TitleProps {
  renderFirstComponent: () => JSX.Element;
  renderSecondComponent: () => JSX.Element;
  renderThirdComponent: () => JSX.Element;
}

// Title 컴포넌트는 props를 렌더링하는 역할만 수행
// 이 컴포넌트의 props 가 render props
export default function Title({
  renderFirstComponent,
  renderSecondComponent,
  renderThirdComponent,
}: TitleProps) {
  return (
    <>
      {renderFirstComponent()}
      {renderSecondComponent()}
      {renderThirdComponent()}
    </>
  );
}
```

- page.tsx

```tsx
import Title from "./Title";

export default function RenderPropsPage() {
  return (
    <div>
      <h1>Render Props Page!</h1>
      {/* render props가 호출되면서 화면에 렌더링됨 */}
      <Title
        renderFirstComponent={() => <h2>✨ First render prop! ✨</h2>}
        renderSecondComponent={() => <h2>🔥 Second render prop! 🔥</h2>}
        renderThirdComponent={() => <h2>🚀 Third render prop! 🚀</h2>}
      />
    </div>
  );
}
```

## render props 에 데이터 전달

추가적으로 렌더링 컴포넌트가 data를 받아 컴포넌트를 렌더링하게 하는 형태로 자주 사용된다

- 예시

```jsx
function Component(props) {
  const data = { ... }

  return props.render(data)
}

<Component render={data => <ChildComponent data={data} />}
```

## 상태 끌어올리기

render props로 리렌더링 줄이기

- 일반적으로 여러 컴포넌트들이 동일한 상태를 공유하게 하려면, 부모 컴포넌트의 공통된 상태를 props로 받아 렌더링하게 만든다.
- 하지만, 대규모 프로젝트에서는 상태를 필요로 하지 않는 자식 컴포넌트까지 불필요하게 리렌더링을 유발할 수 있다

상태 끌어올리기

- 일반적으로 상태는 부모 컴포넌트에 위치하여 자식 컴포넌트쪽으로 내려주지만, render props를 활용하여 자식 컴포넌트 레벨에서 부모 컴포넌트로 상태가 끌어올려지는 것처럼 활용할 수 있다

부모 컴포넌트(TemperatureConverter.tsx)

- render props 를 정의하여 넣어줌

```tsx
import CelsiusInput from "./CelsiusInput";

interface Temperature {
  value: string;
}

export default function TemperatureConverter() {
  return (
    <div>
      <h1>☃️ Temperature Converter 🌞</h1>
      <CelsiusInput
        render={(temperature: string) => (
          <>
            <KelvinTemperature value={temperature} />
            <FahrenheitTemperature value={temperature} />
          </>
        )}
      />
    </div>
  );
}

function KelvinTemperature({ value }: Temperature) {
  return <div>{(parseInt(value) || 0) + 273.15}K</div>;
}

function FahrenheitTemperature({ value }: Temperature) {
  return <div>{((parseInt(value) || 0) * 9) / 5 + 32}°F</div>;
}
```

자식 컴포넌트 (CelsiusInput.tsx)

- 상태를 가짐

```tsx
import { useState } from "react";

interface CelsiusInputProps {
  render: (temperature: string) => JSX.Element;
}

export default function CelsiusInput({ render }: CelsiusInputProps) {
  // 끌어올려질 상태
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {/* data를 받는 render props가 실행 */}
      {render(value)}
    </>
  );
}
```

## 프로퍼티 대신 자식 노드로 render props 전달하기

render 프로퍼티를 만들고 여기에 `() => JSX.Element` 함수를 전달하는 것 대신, children 에 이 함수를 전달할 수 도 있다
