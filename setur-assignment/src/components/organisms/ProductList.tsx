"use client";

import { Product } from "@/types";
import ProductCard from "@/components/molecules/ProductCard";
import { ProductGrid } from "@/components/organisms/ProductGrid";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  );
}
