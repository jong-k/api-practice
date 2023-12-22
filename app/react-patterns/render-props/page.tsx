"use client";
// import BasicRenderProps from "./BasicRenderProps";
import TemperatureConverter from "./TemperatureConverter";

export default function RenderPropsPage() {
  return (
    <div>
      <h1>Render Props Page!</h1>
      {/* render props가 호출되면서 화면에 렌더링됨 */}
      {/* <BasicRenderProps /> */}
      <TemperatureConverter />
    </div>
  );
}
