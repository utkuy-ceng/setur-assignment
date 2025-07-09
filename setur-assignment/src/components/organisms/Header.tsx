"use client";

import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { CartContext } from "@/contexts/CartContext";

const HeaderWrapper = styled.header`
  padding: 1rem 1.5rem;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;
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
      <Logo href="/">SeturStore</Logo>
      <CartInfo>Cart: {totalItems} item(s)</CartInfo>
    </HeaderWrapper>
  );
}
