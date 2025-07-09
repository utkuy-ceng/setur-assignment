"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  width: 80px;
  background-color: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
`;

const ApplyButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;
  border-radius: 4px;
  margin-left: 0.5rem;
`;

export default function FilterByPriceRange() {
  const t = useTranslations("FilterBar");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    router.push(`?${params.toString()}`);
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
