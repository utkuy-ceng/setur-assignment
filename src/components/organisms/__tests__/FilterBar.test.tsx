import React from "react";
import { render, screen } from "@testing-library/react";
import FilterBar from "../FilterBar";
import { ThemeProvider } from "../../../contexts/ThemeContext";

describe("FilterBar", () => {
  it("renders its children", () => {
    render(
      <ThemeProvider>
        <FilterBar>
          <div>Child 1</div>
          <div>Child 2</div>
        </FilterBar>
      </ThemeProvider>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
