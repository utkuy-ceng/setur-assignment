"use client";

import { Product } from "@/types";
import ProductCard from "@/components/molecules/ProductCard";
import { ProductGrid } from "@/components/organisms/ProductGrid";
import styled from "styled-components";
import { useTranslations } from "next-intl";

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
  locale: string;
}

export default function ProductList({ products, locale }: ProductListProps) {
  const t = useTranslations("ProductList");
  if (!products || products.length === 0) {
    return <NoProductsWrapper>{t("noProducts")}</NoProductsWrapper>;
  }
  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} locale={locale} />
      ))}
    </ProductGrid>
  );
}
