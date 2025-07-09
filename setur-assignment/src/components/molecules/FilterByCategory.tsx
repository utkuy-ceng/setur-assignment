"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

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
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function FilterByCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    if (e.target.value) {
      params.set("category", e.target.value);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <SelectWrapper>
      <Label htmlFor="category">Filter by Category</Label>
      <Select id="category" onChange={handleCategoryChange} value={category}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
}
