import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeScript from "@/lib/ThemeScript";
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/lib/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Setur Assignment",
  description: "E-commerce platform for Setur frontend assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeScript />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
