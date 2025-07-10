import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import ProductCard from "../ProductCard";
import { Product } from "../../../types";
import { lightTheme } from "../../../styles/theme";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "A test product description.",
  category: "test",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 4.5,
    count: 120,
  },
};

describe("ProductCard", () => {
  it("renders product details correctly", () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <ProductCard product={mockProduct} locale="en" />
      </ThemeProvider>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("⭐️ 4.5 (120)")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/en/product/1");
  });
});
