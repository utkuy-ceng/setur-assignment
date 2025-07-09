import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FilterByCategory from "../FilterByCategory";

const mockRouter = {
  push: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(["electronics", "jewelery"]),
  })
) as jest.Mock;

describe("FilterByCategory", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
    (global.fetch as jest.Mock).mockClear();
  });

  it("fetches categories and updates the URL on selection", async () => {
    render(<FilterByCategory />);

    await waitFor(() => {
      expect(screen.getByText("electronics")).toBeInTheDocument();
      expect(screen.getByText("jewelery")).toBeInTheDocument();
    });

    const select = screen.getByLabelText("filterByCategory");
    fireEvent.change(select, { target: { value: "electronics" } });

    expect(mockRouter.push).toHaveBeenCalledWith("?category=electronics");
  });
});
