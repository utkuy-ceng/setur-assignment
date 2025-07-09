"use client";

import styled from "styled-components";

const FilterBarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  align-items: flex-end;
`;

export default function FilterBar({ children }: { children: React.ReactNode }) {
  return <FilterBarWrapper>{children}</FilterBarWrapper>;
}
