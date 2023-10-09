import { useState, createContext } from "react";
import "./styles.css";
import List from "./List.jsx";
import Toggle from "./Toggle.jsx";

export const THEMES = {
  light: {
    background: "#fff",
    color: "#000",
  },
  dark: {
    background: "#171717",
    color: "#fff",
  },
};

export const ThemeContext = createContext(null);

export default function Provider() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={`Provider theme-${theme}`}>
      <ThemeContext.Provider value={{ theme: THEMES[theme], toggleTheme }}>
        <>
          <Toggle />
          <List />
        </>
      </ThemeContext.Provider>
    </div>
  );
}
