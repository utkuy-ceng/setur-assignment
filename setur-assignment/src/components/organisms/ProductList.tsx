"use client";

import { Product } from "@/types";
import ProductCard from "@/components/molecules/ProductCard";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import styled from "styled-components";

const NoProductsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #666;
`;

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (!products || products.length === 0) {
    return <NoProductsWrapper>No products found.</NoProductsWrapper>;
  }
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  );
}
