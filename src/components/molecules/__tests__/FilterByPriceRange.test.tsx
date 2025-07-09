import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterByPriceRange from "../FilterByPriceRange";

const mockRouter = {
  push: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
}));

describe("FilterByPriceRange", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
  });

  it("updates URL with min and max price when Apply is clicked", () => {
    render(<FilterByPriceRange />);
    const minInput = screen.getByPlaceholderText("min");
    const maxInput = screen.getByPlaceholderText("max");
    const applyButton = screen.getByText("apply");

    fireEvent.change(minInput, { target: { value: "10" } });
    fireEvent.change(maxInput, { target: { value: "50" } });
    fireEvent.click(applyButton);

    expect(mockRouter.push).toHaveBeenCalledWith("?minPrice=10&maxPrice=50");
  });

  it("only updates min price if max is empty", () => {
    render(<FilterByPriceRange />);
    const minInput = screen.getByPlaceholderText("min");
    const applyButton = screen.getByText("apply");

    fireEvent.change(minInput, { target: { value: "20" } });
    fireEvent.click(applyButton);

    expect(mockRouter.push).toHaveBeenCalledWith("?minPrice=20");
  });

  it("removes price params if inputs are cleared", () => {
    jest
      .spyOn(require("next/navigation"), "useSearchParams")
      .mockReturnValue(new URLSearchParams("minPrice=10&maxPrice=50"));
    render(<FilterByPriceRange />);
    const minInput = screen.getByPlaceholderText("min");
    const maxInput = screen.getByPlaceholderText("max");
    const applyButton = screen.getByText("apply");

    fireEvent.change(minInput, { target: { value: "" } });
    fireEvent.change(maxInput, { target: { value: "" } });
    fireEvent.click(applyButton);

    expect(mockRouter.push).toHaveBeenCalledWith("?");
  });
});
