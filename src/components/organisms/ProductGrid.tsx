"use client";

import styled from "styled-components";

export const ProductGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  padding: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
