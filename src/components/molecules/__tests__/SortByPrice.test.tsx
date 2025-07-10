import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortByPrice from "../SortByPrice";

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/en",
}));

describe("SortByPrice", () => {
  beforeEach(() => {
    mockRouter.push.mockClear();
    mockRouter.replace.mockClear();
    mockRouter.refresh.mockClear();
  });

  it('calls router.replace with "asc" when "Low to High" is selected', () => {
    render(<SortByPrice />);
    const select = screen.getByLabelText("sortByPrice");
    fireEvent.change(select, { target: { value: "asc" } });
    expect(mockRouter.replace).toHaveBeenCalledWith("/en?sort=asc");
  });

  it('calls router.replace with "desc" when "High to Low" is selected', () => {
    render(<SortByPrice />);
    const select = screen.getByLabelText("sortByPrice");
    fireEvent.change(select, { target: { value: "desc" } });
    expect(mockRouter.replace).toHaveBeenCalledWith("/en?sort=desc");
  });

  it('removes the sort parameter when "Default" is selected', () => {
    jest
      .spyOn(require("next/navigation"), "useSearchParams")
      .mockReturnValue(new URLSearchParams("sort=asc"));
    render(<SortByPrice />);
    const select = screen.getByLabelText("sortByPrice");
    fireEvent.change(select, { target: { value: "" } });
    expect(mockRouter.replace).toHaveBeenCalledWith("/en");
  });
});
