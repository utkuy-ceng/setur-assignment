"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

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
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #333;
  border-left: none;
  background-color: #333;
  color: white;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
`;

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <SearchWrapper>
      <Label htmlFor="search">Search by Title</Label>
      <InputWrapper>
        <Input
          id="search"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </InputWrapper>
    </SearchWrapper>
  );
}
