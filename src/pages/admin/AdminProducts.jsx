import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import useProducts from "../../hooks/useProducts";

const PRODUCTS_PER_PAGE = 8;

const categories = ["Oud", "Amber", "Musk", "Spicy"];

const brands = [
  "Ahmed Al Maghribi",
  "Ajmal",
  "Arabian Oud",
  "Afnan",
  "Swiss Arabian",
];

const filterStyle =
  "rounded-lg border border-[#3a3028] bg-[#0f0c0a] px-4 py-2.5 text-sm text-[#f5efe6] outline-none focus:border-[#b99a63]";

const headingStyle =
  "px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[#8e8175]";

const cellStyle = "px-6 py-5";

const pageButtonStyle =
  "rounded-lg border border-[#3a3028] px-4 py-2 text-sm text-[#a79d93] transition hover:border-[#b99a63] hover:text-[#f5efe6] disabled:cursor-not-allowed disabled:opacity-40";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const filters = useMemo(
    () => ({
      page,
      perPage: PRODUCTS_PER_PAGE,
      search,
      category,
      brand,
    }),
    [page, search, category, brand]
  );

  const { data, isLoading, isError } = useProducts(filters);

  const products = data?.data ?? data ?? [];
  const totalItems = data?.items ?? data?.total ?? 0;
  const totalPages = Math.ceil(totalItems / PRODUCTS_PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [search, category, brand]);

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 sm:gap-8">

      {/* Fixed Page Header */}
      <div className="shrink-0">
        <h1 className="font-serif text-2xl text-[#f5efe6] sm:text-3xl">
          Products
        </h1>

        <p className="mt-2 text-sm text-[#8e8175]">
          Manage your store products and inventory.
        </p>
      </div>

      {/* Fixed Search, Filters and Add Product */}
      <div className="flex shrink-0 flex-col gap-4 rounded-xl border border-[#3a3028] bg-[#120f0d] p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8175]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-lg border border-[#3a3028] bg-[#0f0c0a] py-2.5 pl-10 pr-4 text-sm text-[#f5efe6] outline-none placeholder:text-[#6f6257] focus:border-[#b99a63]"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={filterStyle}
          >
            <option value="" className="bg-[#120f0d]">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
                className="bg-[#120f0d]"
              >
                {item}
              </option>
            ))}
          </select>

          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className={filterStyle}
          >
            <option value="" className="bg-[#120f0d]">
              All Brands
            </option>

            {brands.map((item) => (
              <option
                key={item}
                value={item}
                className="bg-[#120f0d]"
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/products/new")}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#b99a63] px-4 py-2.5 text-sm font-medium text-[#120f0d] transition hover:bg-[#c9ac78] lg:w-auto"
        >
          <span className="text-lg leading-none">+</span>
          Add Product
        </button>
      </div>

      {/* Only This Product Table Scrolls */}
      <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-[#3a3028] bg-[#120f0d]">

        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-[#8e8175]">
              Loading products...
            </p>
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-red-400">
              Unable to load products.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex h-full items-center justify-center px-6">
            <div className="text-center">
              <p className="text-sm text-[#f5efe6]">
                No products found.
              </p>

              <p className="mt-2 text-xs text-[#8e8175]">
                Try changing your search or filters.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto overscroll-contain">
            <table className="w-full min-w-212.5">

              {/* Sticky Table Headings */}
              <thead className="sticky top-0 z-10 bg-[#120f0d]">
                <tr className="border-b border-[#3a3028] text-left">
                  {[
                    "Product",
                    "Brand",
                    "Category",
                    "Price",
                    "Stock",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th key={heading} className={headingStyle}>
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {products.map((product) => {
                  const stock = Number(product.count || 0);
                  const isActive = product.isActive;

                  const stockColor =
                    stock === 0
                      ? "text-red-400"
                      : stock <= 5
                        ? "text-[#c9ac78]"
                        : "text-[#a79d93]";

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-[#2a241f] last:border-b-0"
                    >
                      <td className={cellStyle}>
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />

                          <div className="min-w-0">
                            <p className="max-w-55 truncate text-sm font-medium text-[#f5efe6]">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-[#8e8175]">
                              {product.size}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className={cellStyle}>
                        <p className="text-sm text-[#a79d93]">
                          {product.brand}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <p className="text-sm text-[#a79d93]">
                          {product.category}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <p className="text-sm font-medium text-[#f5efe6]">
                          ₹{" "}
                          {Number(product.price || 0).toLocaleString(
                            "en-IN",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <p className={`text-sm font-medium ${stockColor}`}>
                          {stock}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                            isActive
                              ? "border-[#4a3d2e] bg-[#211b16] text-[#c9ac78]"
                              : "border-red-900/40 bg-red-950/20 text-red-400"
                          }`}
                        >
                          {isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className={cellStyle}>
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/admin/products/${product.id}`)
                          }
                          className="rounded-lg border border-[#3a3028] px-3 py-2 text-sm text-[#a79d93] transition hover:border-[#b99a63] hover:text-[#c9ac78]"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Fixed Pagination */}
      {totalPages > 1 && (
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#8e8175]">
            Page {page} of {totalPages}
          </p>

          <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => Math.max(prev - 1, 1))
              }
              className={pageButtonStyle}
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`h-9 min-w-9 rounded-lg px-3 text-sm transition ${
                  pageNumber === page
                    ? "bg-[#b99a63] text-[#120f0d]"
                    : "border border-[#3a3028] text-[#a79d93] hover:border-[#b99a63] hover:text-[#f5efe6]"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              className={pageButtonStyle}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminProducts;
