"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const SortByPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
`;

const SortByPriceSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #999;
  }

  &:focus {
    outline: none;
    border-color: #666;
  }
`;

export default function SortByPrice() {
  const t = useTranslations("FilterBar");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sort = searchParams.get("sort") || "";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    params.delete("page");
    const newParamsString = params.toString();
    router.push(`${pathname}${newParamsString ? `?${newParamsString}` : ""}`);
  };

  return (
    <SortByPriceContainer>
      <label htmlFor="sort-by-price">{t("sortByPrice")}:</label>
      <SortByPriceSelect
        id="sort-by-price"
        value={sort}
        onChange={handleSortChange}
      >
        <option value="">{t("defaultSort")}</option>
        <option value="price_asc">{t("priceLowToHigh")}</option>
        <option value="price_desc">{t("priceHighToLow")}</option>
      </SortByPriceSelect>
    </SortByPriceContainer>
  );
}
