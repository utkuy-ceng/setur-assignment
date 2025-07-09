import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div data-testid="theme-name">{theme}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeContext", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("provides the light theme by default", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-name")).toHaveTextContent("light");
  });

  it("toggles from light to dark theme", () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const toggleButton = screen.getByText("Toggle Theme");
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(screen.getByTestId("theme-name")).toHaveTextContent("dark");
  });

  it("toggles from dark to light theme", () => {
    localStorage.setItem("theme", "dark");
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    const toggleButton = screen.getByText("Toggle Theme");
    act(() => {
      fireEvent.click(toggleButton);
    });
    expect(screen.getByTestId("theme-name")).toHaveTextContent("light");
  });

  it("loads the theme from localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme-name")).toHaveTextContent("dark");
  });
});
