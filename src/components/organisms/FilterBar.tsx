"use client";

import styled from "styled-components";

const FilterBarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  background-color: var(--background);
  border-bottom: 1px solid var(--border);
  align-items: flex-end;
  transition: background-color 0.5s linear, border-bottom 0.5s linear;
`;

export default function FilterBar({ children }: { children: React.ReactNode }) {
  return <FilterBarWrapper>{children}</FilterBarWrapper>;
}
