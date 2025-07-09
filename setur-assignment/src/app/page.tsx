import ProductList from "@/components/organisms/ProductList";
import Pagination from "@/components/molecules/Pagination";
import FilterBar from "@/components/organisms/FilterBar";
import SortByPrice from "@/components/molecules/SortByPrice";
import FilterByCategory from "@/components/molecules/FilterByCategory";
import FilterByPriceRange from "@/components/molecules/FilterByPriceRange";
import Search from "@/components/molecules/Search";
import { Product } from "@/types";

const PAGE_SIZE = 10;

// This function will be updated to handle filtering and sorting
async function getProducts(
  page: number,
  searchParams: HomeProps["searchParams"] = {}
): Promise<Product[]> {
  const offset = (page - 1) * PAGE_SIZE;
  const res = await fetch(`https://fakestoreapi.com/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  let products: Product[] = await res.json();

  const { q, category, minPrice, maxPrice, sort } = searchParams;

  if (q) {
    products = products.filter((p) =>
      p.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  if (minPrice) {
    products = products.filter((p) => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    products = products.filter((p) => p.price <= parseFloat(maxPrice));
  }

  if (sort === "asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    products.sort((a, b) => b.price - a.price);
  }

  return products.slice(offset, offset + PAGE_SIZE);
}

interface HomeProps {
  searchParams?: {
    page?: string;
    sort?: "asc" | "desc";
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    q?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = parseInt(searchParams?.page || "1", 10);
  const products = await getProducts(page, searchParams);

  return (
    <main>
      <FilterBar>
        <Search />
        <FilterByCategory />
        <SortByPrice />
        <FilterByPriceRange />
      </FilterBar>
      <ProductList products={products} />
      <Pagination />
    </main>
  );
}
