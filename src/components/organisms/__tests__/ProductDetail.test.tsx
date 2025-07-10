import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetail from "../ProductDetail";
import { CartContext } from "../../../contexts/CartContext";
import { ThemeProvider } from "../../../contexts/ThemeContext";
import { lightTheme } from "../../../styles/theme";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 100,
  description: "Test description",
  image: "/test.jpg",
  rating: {
    rate: 4.5,
    count: 10,
  },
  category: "test",
};

describe("ProductDetail", () => {
  it("renders product details correctly", () => {
    const addToCart = jest.fn();
    render(
      <ThemeProvider>
        <CartContext.Provider value={{ cartItems: [], addToCart }}>
          <ProductDetail product={mockProduct} />
        </CartContext.Provider>
      </ThemeProvider>
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("calls addToCart when the button is clicked", () => {
    const addToCart = jest.fn();
    render(
      <ThemeProvider>
        <CartContext.Provider value={{ cartItems: [], addToCart }}>
          <ProductDetail product={mockProduct} />
        </CartContext.Provider>
      </ThemeProvider>
    );

    const button = screen.getByText("addToCart");
    fireEvent.click(button);
    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("displays an error if not wrapped in CartProvider", () => {
    render(
      <ThemeProvider>
        <ProductDetail product={mockProduct} />
      </ThemeProvider>
    );
    expect(
      screen.getByText("Error: Cart context not found.")
    ).toBeInTheDocument();
  });
});
