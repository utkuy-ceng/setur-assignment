import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortByPrice from "../SortByPrice";

const mockRouter = {
  push: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
}));

describe("SortByPrice", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
  });

  it('calls router.push with "asc" when "Low to High" is selected', () => {
    render(<SortByPrice />);
    const select = screen.getByLabelText("sortByPrice");
    fireEvent.change(select, { target: { value: "asc" } });
    expect(mockRouter.push).toHaveBeenCalledWith("?sort=asc");
  });

  it('calls router.push with "desc" when "High to Low" is selected', () => {
    render(<SortByPrice />);
    const select = screen.getByLabelText("sortByPrice");
    fireEvent.change(select, { target: { value: "desc" } });
    expect(mockRouter.push).toHaveBeenCalledWith("?sort=desc");
  });

  it('removes the sort parameter when "Default" is selected', () => {
    jest
      .spyOn(require("next/navigation"), "useSearchParams")
      .mockReturnValue(new URLSearchParams("sort=asc"));
    render(<SortByPrice />);
    const select = screen.getByLabelText("sortByPrice");
    fireEvent.change(select, { target: { value: "" } });
    expect(mockRouter.push).toHaveBeenCalledWith("?");
  });
});
