import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import StyledComponentsRegistry from "@/lib/registry";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/organisms/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Setur Assignment",
  description: "A project for the Setur frontend assignment.",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StyledComponentsRegistry>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </StyledComponentsRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
