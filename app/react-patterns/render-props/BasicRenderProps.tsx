import Title from "./Title";

export default function BasicRenderProps() {
  return (
    <Title
      renderFirstComponent={() => <h2>✨ First render prop! ✨</h2>}
      renderSecondComponent={() => <h2>🔥 Second render prop! 🔥</h2>}
      renderThirdComponent={() => <h2>🚀 Third render prop! 🚀</h2>}
    />
  );
}
