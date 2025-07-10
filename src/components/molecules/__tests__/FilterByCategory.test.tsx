import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FilterByCategory from "../FilterByCategory";

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/en",
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(["electronics", "jewelery"]),
  })
) as jest.Mock;

describe("FilterByCategory", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
    mockRouter.replace.mockClear();
    mockRouter.refresh.mockClear();
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

    expect(mockRouter.replace).toHaveBeenCalledWith("/en?category=electronics");
  });
});
