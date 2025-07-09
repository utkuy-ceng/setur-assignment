import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/organisms/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Setur Assignment",
  description: "A project for the Setur frontend assignment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
