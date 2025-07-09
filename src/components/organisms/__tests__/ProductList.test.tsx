import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "../ProductList";
import { ThemeProvider } from "../../../contexts/ThemeContext";

const mockProducts = [
  {
    id: 1,
    title: "Test Product 1",
    price: 100,
    image: "/test1.jpg",
    rating: { rate: 4.5, count: 10 },
    category: "test",
    description: "description 1",
  },
  {
    id: 2,
    title: "Test Product 2",
    price: 200,
    image: "/test2.jpg",
    rating: { rate: 4.0, count: 20 },
    category: "test",
    description: "description 2",
  },
];

describe("ProductList", () => {
  it("renders a list of products", () => {
    render(
      <ThemeProvider>
        <ProductList products={mockProducts} locale="en" />
      </ThemeProvider>
    );
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
  });

  it("displays a message when there are no products", () => {
    render(
      <ThemeProvider>
        <ProductList products={[]} locale="en" />
      </ThemeProvider>
    );
    expect(screen.getByText("noProducts")).toBeInTheDocument();
  });
});
