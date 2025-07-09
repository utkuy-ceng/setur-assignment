import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "../Search";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Search", () => {
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

  it("updates the URL with the search query when the search button is clicked", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search...");
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith("?q=test+query");
  });

  it("updates the URL when Enter is pressed in the input", () => {
    render(<Search />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "enter search" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockRouter.push).toHaveBeenCalledWith("?q=enter+search");
  });

  it("removes the query parameter if the search is cleared", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("q=test")
    );
    render(<Search />);
    const input = screen.getByPlaceholderText("Search...");
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith("?");
  });
});
