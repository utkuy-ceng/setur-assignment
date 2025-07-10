import { unstable_setRequestLocale } from "next-intl/server";
import React from "react";
import ProductList from "@/components/organisms/ProductList";
import Pagination from "@/components/molecules/Pagination";
import FilterBar from "@/components/organisms/FilterBar";
import SortByPrice from "@/components/molecules/SortByPrice";
import FilterByCategory from "@/components/molecules/FilterByCategory";
import FilterByPriceRange from "@/components/molecules/FilterByPriceRange";
import Search from "@/components/molecules/Search";
import { Product } from "@/types";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

interface SearchParams {
  page?: string;
  q?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}

async function getProducts(
  page: number,
  searchParams: SearchParams = {}
): Promise<{ products: Product[]; total: number }> {
  const offset = (page - 1) * PAGE_SIZE;
  const res = await fetch(`https://fakestoreapi.com/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  let products: Product[] = await res.json();

  const q = searchParams?.q;
  const category = searchParams?.category;
  const minPrice = searchParams?.minPrice;
  const maxPrice = searchParams?.maxPrice;
  const sort = searchParams?.sort;

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
  const total = products.length;

  if (sort) {
    products.sort((a, b) => {
      if (sort === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }

  const paginatedProducts = products.slice(offset, offset + PAGE_SIZE);

  return { products: paginatedProducts, total };
}

interface HomeProps {
  params: { locale: string };
  searchParams: SearchParams;
}

export default async function Home({ params, searchParams }: HomeProps) {
  unstable_setRequestLocale(params.locale);
  const locale = params.locale;
  const page = parseInt(searchParams?.page || "1", 10);
  const { products, total } = await getProducts(page, searchParams);

  return (
    <main>
      <FilterBar>
        <Search />
        <FilterByCategory />
        <SortByPrice />
        <FilterByPriceRange />
      </FilterBar>
      <ProductList products={products} locale={locale} />
      <Pagination total={total} pageSize={PAGE_SIZE} currentPage={page} />
    </main>
  );
}
