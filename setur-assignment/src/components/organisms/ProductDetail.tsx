"use client";

import styled from "styled-components";
import Image from "next/image";
import { Product } from "@/types";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { useTranslations } from "next-intl";

const DetailWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1000px;
  margin: 2rem auto;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.cardBg};
  padding: 2rem;
  border-radius: 8px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const Price = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Rating = styled.p`
  margin-bottom: 1.5rem;
`;

const AddToCartButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  max-width: 200px;

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations("ProductDetail");
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    // This can happen if the component is not wrapped in CartProvider
    return <div>Error: Cart context not found.</div>;
  }

  const { addToCart } = cartContext;

  return (
    <DetailWrapper>
      <ImageWrapper>
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          style={{ objectFit: "contain" }}
        />
      </ImageWrapper>
      <InfoWrapper>
        <Title>{product.title}</Title>
        <Description>{product.description}</Description>
        <Rating>
          ⭐️ {product.rating.rate.toFixed(1)}{" "}
          {t("reviews", { count: product.rating.count })}
        </Rating>
        <Price>${product.price.toFixed(2)}</Price>
        <AddToCartButton onClick={() => addToCart(product)}>
          {t("addToCart")}
        </AddToCartButton>
      </InfoWrapper>
    </DetailWrapper>
  );
}
