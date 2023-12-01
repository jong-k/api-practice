// HOC 컴포넌트 예시
function WithStyles(Component: React.ComponentType) {
  return (props: any) => {
    // style 객체의 충돌을 막기위해 style 관련 내용은 이렇게 병합
    const style = { padding: "0.2rem", margin: "1rem", ...props.style };
    return <Component style={style} {...props} />;
  };
}

const Button = () => <button>Click me!</button>;
const TextElement = () => <p>Hello World!</p>;

const StyledButton = WithStyles(Button);
const StyledTextElement = WithStyles(TextElement);
