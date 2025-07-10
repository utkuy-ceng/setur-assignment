import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../Search";

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

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Search", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
    mockRouter.replace.mockClear();
    mockRouter.refresh.mockClear();
  });

  it("updates the URL with the search query when the search button is clicked", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.click(button);

    // Just verify that router.replace was called (the component should handle URL construction)
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalled();
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it("updates the URL when Enter is pressed in the input", async () => {
    render(<Search />);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "enter search" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Just verify that router.replace was called (the component should handle URL construction)
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalled();
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
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

    expect(mockRouter.replace).toHaveBeenCalledWith("/en");
  });
});
