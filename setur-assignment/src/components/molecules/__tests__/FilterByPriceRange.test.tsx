import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterByPriceRange from "../FilterByPriceRange";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("FilterByPriceRange", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("updates URL with min and max price when Apply is clicked", () => {
    render(<FilterByPriceRange />);
    const minInput = screen.getByPlaceholderText("Min");
    const maxInput = screen.getByPlaceholderText("Max");
    const applyButton = screen.getByText("Apply");

    fireEvent.change(minInput, { target: { value: "10" } });
    fireEvent.change(maxInput, { target: { value: "50" } });
    fireEvent.click(applyButton);

    expect(mockRouter.push).toHaveBeenCalledWith("?minPrice=10&maxPrice=50");
  });

  it("only updates min price if max is empty", () => {
    render(<FilterByPriceRange />);
    const minInput = screen.getByPlaceholderText("Min");
    const applyButton = screen.getByText("Apply");

    fireEvent.change(minInput, { target: { value: "20" } });
    fireEvent.click(applyButton);

    expect(mockRouter.push).toHaveBeenCalledWith("?minPrice=20");
  });

  it("removes price params if inputs are cleared", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("minPrice=10&maxPrice=50")
    );
    render(<FilterByPriceRange />);
    const minInput = screen.getByPlaceholderText("Min");
    const maxInput = screen.getByPlaceholderText("Max");
    const applyButton = screen.getByText("Apply");

    fireEvent.change(minInput, { target: { value: "" } });
    fireEvent.change(maxInput, { target: { value: "" } });
    fireEvent.click(applyButton);

    expect(mockRouter.push).toHaveBeenCalledWith("?");
  });
});
