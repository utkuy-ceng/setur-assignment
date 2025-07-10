"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const CardWrapper = styled.div`
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  background-color: var(--cardBg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImageContainer = styled.div`
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin: 0.5rem 0;
  line-height: 1.5rem;
  height: 3rem; /* 1.5rem * 2 lines */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Price = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: var(--text);
`;

const Rating = styled.p`
  font-size: 0.9rem;
  color: var(--secondary);
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductCardProps {
  product: Product;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  return (
    <StyledLink href={`/${locale}/product/${product.id}`}>
      <CardWrapper>
        <ProductImageContainer>
          <Image
            src={product.image}
            alt={product.title}
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
          />
        </ProductImageContainer>
        <div>
          <Title title={product.title}>{product.title}</Title>
          <Price>${product.price.toFixed(2)}</Price>
          <Rating>
            ⭐️ {product.rating.rate.toFixed(1)} ({product.rating.count})
          </Rating>
        </div>
      </CardWrapper>
    </StyledLink>
  );
}
