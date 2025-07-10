"use client";

import React from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import GlobalStyles from "@/styles/GlobalStyles";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
