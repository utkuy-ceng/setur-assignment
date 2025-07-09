"use client";

import React from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { useTheme } from "../../contexts/ThemeContext";

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1.5rem;
`;

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations("ThemeToggleButton");

  return (
    <Button onClick={toggleTheme}>
      {theme === "light" ? t("dark") : t("light")}
    </Button>
  );
}
