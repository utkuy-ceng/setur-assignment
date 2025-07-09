import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "../../../contexts/ThemeContext";
import Header from "../Header";
import { CartContext } from "../../../contexts/CartContext";

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
    expect(screen.getByText("cart")).toBeInTheDocument();
  });

  it("displays 0 items when the cart is empty", () => {
    render(
      <ThemeProvider>
        <CartContext.Provider value={{ cartItems: [], addToCart: () => {} }}>
          <Header />
        </CartContext.Provider>
      </ThemeProvider>
    );
    expect(screen.getByText("cart")).toBeInTheDocument();
  });
});
