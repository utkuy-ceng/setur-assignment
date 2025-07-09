"use client";

import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { CartContext } from "@/contexts/CartContext";
import ThemeToggleButton from "../atoms/ThemeToggleButton";

const HeaderWrapper = styled.header`
  padding: 1rem 1.5rem;
  background-color: ${({ theme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.5s linear, color 0.5s linear;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const CartInfo = styled.div`
  font-size: 1rem;
`;

export default function Header() {
  const cartContext = useContext(CartContext);
  const totalItems =
    cartContext?.cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <HeaderWrapper>
      <LeftSection>
        <Logo href="/">SeturStore</Logo>
        <ThemeToggleButton />
      </LeftSection>
      <RightSection>
        <CartInfo>Cart: {totalItems} item(s)</CartInfo>
      </RightSection>
    </HeaderWrapper>
  );
}
