import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import useProducts from "../../hooks/useProducts";

import ProductGrid from "../../components/products/ProductGrid";
import ProductLoading from "../../components/products/ProductLoading";
import ProductFilters from "../../components/products/ProductFilters";
import ProductPagination from "../../components/products/ProductPagination";

const Shop = () => {
  const [searchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory);
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const perPage = 8;

  useEffect(() => {
    setSearch(urlSearch);
    setCategory(urlCategory);
    setCurrentPage(1);
  }, [urlSearch, urlCategory]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleBrandChange = (value) => {
    setBrand(value);
    setCurrentPage(1);
  }; 

  const handleSortChange = (value) => {
    setSort(value);
    setCurrentPage(1);
  };


  const filters = useMemo(
    () => ({
      page: currentPage,
      perPage,
      search,
      category,
      brand,
      sort,
      activeOnly: true,
    }),
    [currentPage, perPage, search, category, brand, sort]
  );
  

  const {
    data: productResponse,
    isLoading,
    isError,
    error,
    isFetching,
  } = useProducts(filters);

  const products = productResponse?.data || [];
  const totalPages = productResponse?.pages || 1;
  const totalItems = productResponse?.items || 0;

  return (
    <main className="min-h-screen bg-[#0d0b09] text-[#f4efe7]">

      {/* SHOP HEADER */}

      <section className="border-b border-[#2d2925]">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <p className="text-xs uppercase tracking-[0.45em] text-[#b89b72]">
            ÉLORIA Collection
          </p>

          <h1 className="mt-4 font-serif text-5xl sm:text-6xl">
            Shop Fragrances
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#817970]">
            Explore oud, amber, musk and spicy fragrances
            curated for the ÉLORIA collection.
          </p>

        </div>

      </section>


      {/*FILTERS*/}

      <section className="mx-auto max-w-7xl px-6 pt-10">

        <ProductFilters
          search={search}
          category={category}
          brand={brand}
          sort={sort}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          onSortChange={handleSortChange}
        />

      </section>


      {/*RESULTS INFO */}

      <section className="mx-auto max-w-7xl px-6 pt-8">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <p className="text-sm text-[#817970]">
            {totalItems}{" "}
            {totalItems === 1 ? "fragrance" : "fragrances"} found
          </p>

          {isFetching && !isLoading && (
            <p className="text-xs uppercase tracking-[0.15em] text-[#b89b72]">
              Updating...
            </p>
          )}

        </div>

      </section>


      {/* PRODUCTS*/}

      <section className="mx-auto max-w-7xl px-6 py-10">

        {isLoading ? (
          <ProductLoading />
        ) : isError ? (
          <div className="py-20 text-center">

            <p className="text-sm text-red-400">
              Unable to load fragrances.
            </p>

            <p className="mt-2 text-xs text-[#817970]">
              {error?.message || "Something went wrong."}
            </p>

          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="py-24 text-center">

            <p className="font-serif text-3xl">
              No fragrances found.
            </p>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#817970]">
              Try another search term or change your filters
              to discover more fragrances.
            </p>

          </div>
        )}

      </section>


      {/*PAGINATION*/}

      <section className="pb-20">

        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </section>

    </main>
  );
};

export default Shop; 