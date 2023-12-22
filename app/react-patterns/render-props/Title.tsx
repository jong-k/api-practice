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
