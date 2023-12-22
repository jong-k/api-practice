import { useState } from "react";

interface AnotherCelsiusInputProps {
  children: (temperature: string) => JSX.Element;
}

export default function AnotherCelsiusInput({ children }: AnotherCelsiusInputProps) {
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
      {children(value)}
    </>
  );
}
