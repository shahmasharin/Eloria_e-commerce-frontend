import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import useAllProducts from "../../hooks/useAllProducts";
import useWishlist from "../../hooks/useWishlist";
import useCart from "../../hooks/useCart";

const Wishlist = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useAllProducts();

  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const wishlistProducts = products.filter((product) =>
    isInWishlist(product.id)
  );

  const handleRemove = (productId) => {
    toggleWishlist(productId);
    toast("Removed from wishlist");
  };

  const handleMoveToCart = (product) => {
    if (product.count <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    addToCart(product.id, 1);
    toggleWishlist(product.id);

    toast.success("Moved to cart");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0d0b09] text-[#f4efe7]">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="h-4 w-32 animate-pulse rounded bg-[#181512]" />

          <div className="mt-5 h-12 w-52 animate-pulse rounded bg-[#181512]" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-4/5 animate-pulse rounded-xl bg-[#181512]" />
                <div className="mt-4 h-4 w-24 animate-pulse rounded bg-[#181512]" />
                <div className="mt-3 h-6 w-32 animate-pulse rounded bg-[#181512]" />
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-6 text-center text-[#f4efe7]">
        <div>
          <h1 className="font-serif text-3xl">
            Unable to load wishlist
          </h1>

          <p className="mt-4 text-sm text-[#817970]">
            Something went wrong while loading your saved fragrances.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0b09] text-[#f4efe7]">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#b89b72]">
          Your Collection
        </p>

        <h1 className="mt-4 font-serif text-5xl">
          Wishlist
        </h1> 

        <p className="mt-3 text-sm text-[#817970]">
          {wishlistProducts.length}{" "}
          {wishlistProducts.length === 1
            ? "fragrance"
            : "fragrances"}{" "}
          saved
        </p>
      </section>

      {wishlistProducts.length === 0 ? (
        <section className="mx-auto max-w-xl px-6 pb-28 text-center">
          <Heart
            size={40}
            strokeWidth={1}
            className="mx-auto text-[#b89b72]"
          />

          <h2 className="mt-6 font-serif text-3xl">
            Your wishlist is empty
          </h2>

          <p className="mt-4 text-sm leading-7 text-[#817970]">
            Save fragrances you like and come back to them later.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-xl bg-[#b89b72] px-6 py-3 text-xs uppercase tracking-[0.15em] text-black transition hover:bg-[#d1b78f]">
            Explore Fragrances
          </Link>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 pb-28">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistProducts.map((product) => {
              const outOfStock = product.count <= 0;

              return (
                <article key={product.id}>
                  <div className="group relative aspect-4/5 overflow-hidden rounded-xl bg-[#181512]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover "
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.2em] text-[#6f6962]">
                        No Image
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemove(product.id)}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-black hover:text-[#b89b72]"
                      aria-label="Remove from wishlist"
                    >
                      <Heart
                        size={21}
                        strokeWidth={1}
                        fill="black"
                      />
                    </button>

                    {outOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                        <span className="rounded-xl border border-white/30 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-5">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#6f6962]">
                      {product.brand}
                    </p>

                    <Link
                      to={`/product/${product.id}`}
                      className="mt-2 block font-serif text-xl text-[#f4efe7] hover:text-[#b89b72]"
                    >
                      {product.name}
                    </Link>

                    {product.size && (
                      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#817970]">
                        {product.size}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-[#b89b72]">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </p>

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleMoveToCart(product)}
                        disabled={outOfStock}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#b89b72] px-4 py-3 text-xs uppercase tracking-[0.12em] text-black transition hover:bg-[#d1b78f] disabled:cursor-not-allowed disabled:bg-[#3a3530] disabled:text-[#6f6962]"
                      >
                        <ShoppingBag size={16} />

                        {outOfStock
                          ? "Out of Stock"
                          : "Move to Cart"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemove(product.id)}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2d2925] text-[#d8d0c7] hover:border-[#b89b72] hover:text-[#b89b72]"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default Wishlist;  