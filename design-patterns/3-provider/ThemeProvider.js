import { createContext, useState } from "react";

const THEME = {
  light: {
    background: "#fff",
    color: "#000"
  },
  dark: {
    background: "#171717",
    color: "#fff"
  }
};

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`App theme-${theme}`}>
      <ThemeContext.Provider value={{ theme: THEME[theme], toggleTheme }}>
        <>{children}</>
      </ThemeContext.Provider>
    </div>
  );
}
