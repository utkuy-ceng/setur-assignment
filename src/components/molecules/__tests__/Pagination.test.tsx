import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

const mockRouter = {
  push: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
}));

describe("Pagination", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
  });

  it('disables the "Previous" button on the first page', () => {
    render(<Pagination total={100} pageSize={10} currentPage={1} />);
    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).toBeDisabled();
  });

  it('enables the "Previous" button on subsequent pages', () => {
    render(<Pagination total={100} pageSize={10} currentPage={2} />);
    const previousButton = screen.getByRole("button", { name: /previous/i });
    expect(previousButton).not.toBeDisabled();
  });

  it('calls router.push with the correct page when "Next" is clicked', () => {
    render(<Pagination total={100} pageSize={10} currentPage={1} />);
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    expect(mockRouter.push).toHaveBeenCalledWith("?page=2");
  });

  it('calls router.push with the correct page when "Previous" is clicked', () => {
    render(<Pagination total={100} pageSize={10} currentPage={3} />);
    const previousButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(previousButton);
    expect(mockRouter.push).toHaveBeenCalledWith("?page=2");
  });
});
