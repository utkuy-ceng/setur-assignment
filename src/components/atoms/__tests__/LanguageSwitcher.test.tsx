import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSwitcher from "../LanguageSwitcher";

const mockRouter = {
  replace: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  usePathname: () => "/en/some-page",
  useSearchParams: () => new URLSearchParams("q=test"),
}));

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    mockRouter.replace.mockClear();
    localStorage.clear();
  });

  it("updates the URL and localStorage when a new language is selected", () => {
    render(<LanguageSwitcher />);
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "tr" } });

    expect(localStorage.getItem("locale")).toBe("tr");
    expect(mockRouter.replace).toHaveBeenCalledWith("/tr/some-page?q=test");
  });
});
