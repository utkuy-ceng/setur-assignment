"use client";

import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "@/contexts/ThemeContext";

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.primary};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
`;

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </ToggleButton>
  );
}
