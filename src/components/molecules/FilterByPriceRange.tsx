"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const PriceRangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  width: 80px;
  background-color: var(--cardBg);
  color: var(--text);
`;

const ApplyButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: var(--primary);
  color: var(--buttonText);
  cursor: pointer;
  border-radius: 4px;
  margin-left: 0.5rem;
`;

export default function FilterByPriceRange() {
  const t = useTranslations("FilterBar");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const urlMinPrice = searchParams.get("minPrice") || "";
    const urlMaxPrice = searchParams.get("maxPrice") || "";
    setMinPrice(urlMinPrice);
    setMaxPrice(urlMaxPrice);
  }, [searchParams]);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);

    if (minPrice.trim()) params.set("minPrice", minPrice.trim());
    else params.delete("minPrice");

    if (maxPrice.trim()) params.set("maxPrice", maxPrice.trim());
    else params.delete("maxPrice");

    // Always reset to page 1 when applying filters
    params.delete("page");

    const newParamsString = params.toString();
    const newUrl = `${pathname}${newParamsString ? `?${newParamsString}` : ""}`;

    // Force navigation even if URL is the same
    router.replace(newUrl);
    router.refresh();
  };

  return (
    <PriceRangeWrapper>
      <Label>{t("filterByPrice")}</Label>
      <InputsWrapper>
        <Input
          type="number"
          placeholder={t("min")}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <span>-</span>
        <Input
          type="number"
          placeholder={t("max")}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <ApplyButton onClick={handleApply}>{t("apply")}</ApplyButton>
      </InputsWrapper>
    </PriceRangeWrapper>
  );
}
