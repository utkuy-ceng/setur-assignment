"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
`;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = pathname.split("/")[1] || "en";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // Replace the current locale in the pathname with the new locale
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "") || "/";
    let newPath = `/${newLocale}${pathWithoutLocale}`;

    // Handle case where path is just '/'
    if (newPath.endsWith("/") && newPath.length > 1) {
      newPath = newPath.slice(0, -1);
    }

    const currentSearchParams = searchParams.toString();
    if (currentSearchParams) {
      newPath += `?${currentSearchParams}`;
    }

    window.localStorage.setItem("locale", newLocale);
    router.replace(newPath);
  };

  return (
    <Select onChange={handleChange} value={currentLocale}>
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
    </Select>
  );
}
