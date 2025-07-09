import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../Pagination";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Pagination", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('disables the "Previous" button on the first page', () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=1")
    );
    render(<Pagination />);
    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it('enables the "Previous" button on subsequent pages', () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=2")
    );
    render(<Pagination />);
    expect(screen.getByText("Previous")).not.toBeDisabled();
  });

  it('calls router.push with the correct page when "Next" is clicked', () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=1")
    );
    render(<Pagination />);
    fireEvent.click(screen.getByText("Next"));
    expect(mockRouter.push).toHaveBeenCalledWith("?page=2");
  });

  it('calls router.push with the correct page when "Previous" is clicked', () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=3")
    );
    render(<Pagination />);
    fireEvent.click(screen.getByText("Previous"));
    expect(mockRouter.push).toHaveBeenCalledWith("?page=2");
  });
});
