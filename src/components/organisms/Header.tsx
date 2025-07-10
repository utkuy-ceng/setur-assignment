"use client";

import { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { CartContext } from "@/contexts/CartContext";
import ThemeToggleButton from "../atoms/ThemeToggleButton";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "../atoms/LanguageSwitcher";

const HeaderWrapper = styled.header`
  padding: 1rem 1.5rem;
  background-color: var(--cardBg);
  border-bottom: 1px solid var(--border);
  color: var(--text);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.5s linear, color 0.5s linear;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: var(--text);
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

const CartContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CartIcon = styled.div`
  width: 24px;
  height: 24px;
  fill: var(--text);
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--primary);
  color: var(--buttonText);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  min-width: 20px;
`;

export default function Header() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  const cartContext = useContext(CartContext);
  const totalItems =
    cartContext?.cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <HeaderWrapper>
      <LeftSection>
        <Logo href={`/${locale}`}>{t("title")}</Logo>
      </LeftSection>
      <RightSection>
        <CartContainer>
          <CartIcon>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </CartIcon>
          {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
        </CartContainer>
        <ThemeToggleButton />
        <LanguageSwitcher />
      </RightSection>
    </HeaderWrapper>
  );
}
