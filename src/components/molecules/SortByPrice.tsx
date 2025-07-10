"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background-color: var(--cardBg);
  color: var(--text);
`;

export default function SortByPrice() {
  const t = useTranslations("FilterBar");
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <SelectWrapper>
      <Label htmlFor="sort">{t("sortByPrice")}</Label>
      <Select id="sort" onChange={handleSortChange} value={sort}>
        <option value="">{t("defaultSort")}</option>
        <option value="asc">{t("lowToHigh")}</option>
        <option value="desc">{t("highToLow")}</option>
      </Select>
    </SelectWrapper>
  );
}
