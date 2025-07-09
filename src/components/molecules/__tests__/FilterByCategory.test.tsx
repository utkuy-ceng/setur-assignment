import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterByCategory from "../FilterByCategory";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

global.fetch = jest.fn();

describe("FilterByCategory", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches categories and updates the URL on selection", async () => {
    const mockCategories = ["electronics", "jewelery"];
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockCategories,
    });

    render(<FilterByCategory />);

    await waitFor(() => {
      expect(screen.getByText("electronics")).toBeInTheDocument();
      expect(screen.getByText("jewelery")).toBeInTheDocument();
    });

    const select = screen.getByLabelText("Filter by Category");
    fireEvent.change(select, { target: { value: "electronics" } });

    expect(mockRouter.push).toHaveBeenCalledWith("?category=electronics");
  });
});
