"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import styled from "styled-components";

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
`;

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // Set a cookie to remember the locale preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Create the new path by replacing the current locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    // Navigate to the new locale URL
    window.location.href = newPath;
  };

  return (
    <Select onChange={handleChange} value={locale}>
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
    </Select>
  );
}
