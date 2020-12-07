import React from "react";
// import { Switch, Redirect, Route } from "react-router-dom";
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(themes.light);

export const MainApp = () => {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <div>React App</div>
    </ThemeContext.Provider>
  );
};
