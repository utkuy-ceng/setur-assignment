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

const CartInfo = styled.div`
  font-size: 1rem;
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
        <CartInfo>{t("cart", { count: totalItems })}</CartInfo>
        <ThemeToggleButton />
        <LanguageSwitcher />
      </RightSection>
    </HeaderWrapper>
  );
}
