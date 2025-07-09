import React, { useContext } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CartProvider, CartContext, CartItem } from "../CartContext";
import { Product } from "@/types";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 100,
  description: "Desc",
  category: "cat",
  image: "img",
  rating: { rate: 5, count: 10 },
};

const TestConsumer = () => {
  const context = useContext(CartContext);
  if (!context) return null;
  const { cartItems, addToCart } = context;

  return (
    <div>
      <button onClick={() => addToCart(mockProduct)}>Add to Cart</button>
      <div data-testid="cart-items">
        {cartItems.map((item) => (
          <div key={item.id}>
            {item.title} - {item.quantity}
          </div>
        ))}
      </div>
      <div data-testid="total-items">
        {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      </div>
    </div>
  );
};

describe("CartContext", () => {
  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("adds a new item to the cart", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText("Add to Cart"));
    });

    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      "Test Product - 1"
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("1");
  });

  it("increments quantity of an existing item", () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText("Add to Cart"));
    });
    act(() => {
      fireEvent.click(screen.getByText("Add to Cart"));
    });

    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      "Test Product - 2"
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("2");
  });

  it("initializes cart from localStorage", () => {
    const mockCart: CartItem[] = [{ ...mockProduct, quantity: 5 }];
    localStorage.setItem("cart", JSON.stringify(mockCart));

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId("cart-items")).toHaveTextContent(
      "Test Product - 5"
    );
    expect(screen.getByTestId("total-items")).toHaveTextContent("5");
  });
});
