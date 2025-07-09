import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";
import { CartContext, CartItem } from "@/contexts/CartContext";
import { Product } from "@/types";

const mockProduct: Product = {
  id: 1,
  title: "p1",
  price: 10,
  description: "d1",
  category: "c1",
  image: "i1",
  rating: { rate: 1, count: 1 },
};

describe("Header", () => {
  it("displays the correct number of items in the cart", () => {
    const mockCartItems: CartItem[] = [
      { ...mockProduct, quantity: 2 },
      { ...mockProduct, id: 2, quantity: 3 },
    ];

    render(
      <CartContext.Provider
        value={{ cartItems: mockCartItems, addToCart: () => {} }}
      >
        <Header />
      </CartContext.Provider>
    );

    expect(screen.getByText("Cart: 5 item(s)")).toBeInTheDocument();
  });

  it("displays 0 items when the cart is empty", () => {
    render(
      <CartContext.Provider value={{ cartItems: [], addToCart: () => {} }}>
        <Header />
      </CartContext.Provider>
    );

    expect(screen.getByText("Cart: 0 item(s)")).toBeInTheDocument();
  });
});
