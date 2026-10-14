import {
  PRODUCT_CATEGORIES,
  PRODUCT_BRANDS,
  PRODUCT_SORT_OPTIONS,
} from "../../constants/productConstants";

const ProductFilters = ({
  search,
  category,
  brand,
  sort,
  onSearchChange,
  onCategoryChange,
  onBrandChange,
  onSortChange,
}) => {
  return (
    <div className="mb-12 border-y border-[#2d2925] py-7">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#b89b72]">
          Refine the collection
        </p>

        <h2 className="mt-2 font-serif text-2xl text-[#eee6dc]">
          Find your fragrance
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {/* Search */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-[#817970]">
            Search
          </label>

          <input
            type="text"
            value={search}
            placeholder="Search fragrances..."
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            className="w-full rounded-xl border border-[#3a342e] bg-[#11100e] px-4 py-3 text-sm text-[#eee6dc] outline-none placeholder:text-[#6f6962] focus:border-[#b89b72]"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-[#817970]">
            Category
          </label>

          <select
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value)
            }
            className="w-full rounded-xl border border-[#3a342e] bg-[#11100e] px-4 py-3 text-sm text-[#eee6dc] outline-none focus:border-[#b89b72]"
          >
            <option value="">All Categories</option>

            {PRODUCT_CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-[#817970]">
            Brand
          </label>

          <select
            value={brand}
            onChange={(event) =>
              onBrandChange(event.target.value)
            }
            className="w-full rounded-xl border border-[#3a342e] bg-[#11100e] px-4 py-3 text-sm text-[#eee6dc] outline-none focus:border-[#b89b72]"
          >
            <option value="">All Brands</option>

            {PRODUCT_BRANDS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-[#817970]">
            Sort
          </label>

          <select
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value)
            }
            className="w-full rounded-xl border border-[#3a342e] bg-[#11100e] px-4 py-3 text-sm text-[#eee6dc] outline-none focus:border-[#b89b72]"
          >
            {PRODUCT_SORT_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

      </div>
    </div>
  );
};

export default ProductFilters;