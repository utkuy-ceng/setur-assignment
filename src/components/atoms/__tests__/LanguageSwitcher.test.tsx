import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSwitcher from "../LanguageSwitcher";

// Mock window.location.href
Object.defineProperty(window, "location", {
  value: {
    href: jest.fn(),
  },
  writable: true,
});

// Mock document.cookie
Object.defineProperty(document, "cookie", {
  writable: true,
  value: "",
});

jest.mock("next/navigation", () => ({
  usePathname: () => "/en/some-page",
}));

jest.mock("next-intl", () => ({
  useLocale: () => "en",
}));

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    // Reset the mocks before each test
    (window.location.href as any) = jest.fn();
    document.cookie = "";
  });

  it("sets cookie and navigates to the correct URL when a new language is selected", () => {
    render(<LanguageSwitcher />);
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "tr" } });

    // Check if cookie was set (this is a simplified check)
    expect(document.cookie).toContain("NEXT_LOCALE=tr");
    expect(window.location.href).toBe("/tr/some-page");
  });
});
