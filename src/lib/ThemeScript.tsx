import React from "react";

const ThemeScript = () => {
  const script = `
    (function() {
      const theme = window.localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default ThemeScript;
