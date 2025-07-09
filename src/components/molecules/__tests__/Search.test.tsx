import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../Search";

const mockRouter = {
  push: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
}));

describe("Search", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
  });

  it("updates the URL with the search query when the search button is clicked", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith("?q=test+query");
  });

  it("updates the URL when Enter is pressed in the input", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "enter search" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockRouter.push).toHaveBeenCalledWith("?q=enter+search");
  });

  it("removes the query parameter if the search is cleared", () => {
    jest
      .spyOn(require("next/navigation"), "useSearchParams")
      .mockReturnValue(new URLSearchParams("q=test"));

    render(<Search />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith("?");
  });
});
