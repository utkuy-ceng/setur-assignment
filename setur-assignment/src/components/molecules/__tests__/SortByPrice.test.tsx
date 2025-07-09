import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SortByPrice from "../SortByPrice";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SortByPrice", () => {
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

  it('calls router.push with "asc" when "Low to High" is selected', () => {
    render(<SortByPrice />);
    const select = screen.getByLabelText("Sort by Price");
    fireEvent.change(select, { target: { value: "asc" } });
    expect(mockRouter.push).toHaveBeenCalledWith("?sort=asc");
  });

  it('calls router.push with "desc" when "High to Low" is selected', () => {
    render(<SortByPrice />);
    const select = screen.getByLabelText("Sort by Price");
    fireEvent.change(select, { target: { value: "desc" } });
    expect(mockRouter.push).toHaveBeenCalledWith("?sort=desc");
  });

  it('removes the sort parameter when "Default" is selected', () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("sort=asc")
    );
    render(<SortByPrice />);
    const select = screen.getByLabelText("Sort by Price");
    fireEvent.change(select, { target: { value: "" } });
    expect(mockRouter.push).toHaveBeenCalledWith("?");
  });
});
