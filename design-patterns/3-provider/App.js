import ThemeProvider from "./ThemeProvider";
import Toggle from "./Toggle";
import List from "./List";
import "./styles.css";

export default function App() {
  return (
    <ThemeProvider>
      <Toggle />
      <List />
    </ThemeProvider>
  );
}
