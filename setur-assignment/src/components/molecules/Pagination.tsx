"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  gap: 1rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

interface PaginationProps {
  total: number;
  pageSize: number;
}

export default function Pagination({ total, pageSize }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <PaginationWrapper>
      <PageButton
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </PageButton>
      <span>
        Page {page} of {totalPages}
      </span>
      <PageButton
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </PageButton>
    </PaginationWrapper>
  );
}
