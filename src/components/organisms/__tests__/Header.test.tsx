import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../../../contexts/ThemeContext";
import Header from "../Header";
import { CartContext } from "../../../contexts/CartContext";

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/en",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Header", () => {
  it("displays the correct number of items in the cart", () => {
    const cartItems = [
      {
        id: 1,
        title: "Product 1",
        price: 10,
        quantity: 2,
        image: "",
        description: "",
        category: "",
        rating: { rate: 0, count: 0 },
      },
      {
        id: 2,
        title: "Product 2",
        price: 20,
        quantity: 3,
        image: "",
        description: "",
        category: "",
        rating: { rate: 0, count: 0 },
      },
    ];
    render(
      <ThemeProvider>
        <CartContext.Provider value={{ cartItems, addToCart: () => {} }}>
          <Header />
        </CartContext.Provider>
      </ThemeProvider>
    );
    // Check for cart count (2 + 3 = 5 items total)
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("displays cart icon when the cart is empty", () => {
    render(
      <ThemeProvider>
        <CartContext.Provider value={{ cartItems: [], addToCart: () => {} }}>
          <Header />
        </CartContext.Provider>
      </ThemeProvider>
    );
    // Check for cart SVG presence by looking for the path element
    const cartPath = screen
      .getByRole("banner")
      .querySelector('svg path[d*="M7 18c-1.1"]');
    expect(cartPath).toBeInTheDocument();
    // Ensure no badge is shown for empty cart
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
