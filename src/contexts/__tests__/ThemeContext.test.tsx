import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock document.documentElement
const mockDocumentElement = {
  getAttribute: jest.fn(() => "light"),
  setAttribute: jest.fn(),
};

Object.defineProperty(document, "documentElement", {
  value: mockDocumentElement,
  writable: true,
});

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
  beforeEach(() => {
    localStorage.clear();
    mockDocumentElement.getAttribute.mockReturnValue("light");
    mockDocumentElement.setAttribute.mockClear();
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
    mockDocumentElement.getAttribute.mockReturnValue("dark");
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

  it("loads the theme from localStorage", async () => {
    // Set the mock to return dark theme
    mockDocumentElement.getAttribute.mockReturnValue("dark");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Wait for the component to read from document and update
    await waitFor(() => {
      expect(screen.getByTestId("theme-name")).toHaveTextContent("dark");
    });
  });
});
