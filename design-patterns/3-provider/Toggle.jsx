import { useContext } from "react";
import { ThemeContext } from "./Provider.jsx";

export default function Toggle() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <label className="switch">
      <input type="checkbox" onChange={toggleTheme} />
      <span className="slider round"></span>
    </label>
  );
}
