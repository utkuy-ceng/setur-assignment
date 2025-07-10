"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px 0 0 4px;
  background-color: var(--cardBg);
  color: var(--text);
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary);
  border-left: none;
  background-color: var(--primary);
  color: var(--buttonText);
  cursor: pointer;
  border-radius: 0 4px 4px 0;
`;

export default function Search() {
  const t = useTranslations("FilterBar");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setQuery(urlQuery);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }

    // Always reset to page 1 when searching
    params.delete("page");

    const newParamsString = params.toString();
    const newUrl = `${pathname}${newParamsString ? `?${newParamsString}` : ""}`;

    // Force navigation even if URL is the same
    router.replace(newUrl);
    router.refresh();
  };

  return (
    <SearchWrapper>
      <Label htmlFor="search">{t("search")}</Label>
      <InputWrapper>
        <Input
          id="search"
          type="text"
          placeholder={t("search")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>{t("search")}</SearchButton>
      </InputWrapper>
    </SearchWrapper>
  );
}
