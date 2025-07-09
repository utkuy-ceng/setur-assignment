import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../ProductCard";
import { Product } from "@/types";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "A test product description.",
  category: "test",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 4.5,
    count: 150,
  },
};

describe("ProductCard", () => {
  it("renders product details correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("⭐️ 4.5 (150)")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/product/1");
  });
});
