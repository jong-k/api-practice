import { useThemeContext } from "./useThemeContext.js";

export default function Toggle() {
  const theme = useThemeContext();

  return (
    <label className="switch">
      <input type="checkbox" onClick={theme.toggleTheme} />
      <span className="slider round"></span>
    </label>
  );
}
