import "@testing-library/jest-dom";

jest.mock("next-intl", () => ({
  useTranslations: (namespace) => (key) => {
    const translations = {
      Header: {
        title: "SeturMağaza",
        cart: "Cart: {count} items",
      },
      ProductList: {
        noProducts: "No products found.",
      },
      Search: {
        search: "Search",
        placeholder: "Search...",
      },
      FilterByCategory: {
        filterByCategory: "Filter by Category",
        allCategories: "All Categories",
      },
      SortByPrice: {
        sortByPrice: "Sort by Price",
        defaultSort: "Default",
        lowToHigh: "Low to High",
        highToLow: "High to Low",
      },
      FilterByPriceRange: {
        filterByPrice: "Filter by Price",
        min: "Min",
        max: "Max",
        apply: "Apply",
      },
      Pagination: {
        previous: "Previous",
        next: "Next",
      },
    };
    return translations[namespace]?.[key] || key;
  },
  useLocale: () => "en",
}));
