import { createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

const GlobalStyles = createGlobalStyle`
  :root {
    --background: ${lightTheme.background};
    --text: ${lightTheme.text};
    --primary: ${lightTheme.primary};
    --secondary: ${lightTheme.secondary};
    --border: ${lightTheme.border};
    --cardBg: ${lightTheme.cardBg};
    --buttonText: ${lightTheme.buttonText};
  }

  [data-theme='dark'] {
    --background: ${darkTheme.background};
    --text: ${darkTheme.text};
    --primary: ${darkTheme.primary};
    --secondary: ${darkTheme.secondary};
    --border: ${darkTheme.border};
    --cardBg: ${darkTheme.cardBg};
    --buttonText: ${darkTheme.buttonText};
  }
  
  body {
    background-color: var(--background);
    color: var(--text);
    transition: background-color 0.2s linear, color 0.2s linear;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }
`;

export default GlobalStyles;
