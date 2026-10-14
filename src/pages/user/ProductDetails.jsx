import { useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import useProduct from "../../hooks/useProduct";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";
import useAuth from "../../hooks/useAuth";

import toast from "react-hot-toast";

const ProductDetails = () => {
  const { slug } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(slug);

  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0d0b09] px-6 py-20 text-[#f4efe7]">
        <div className="mx-auto grid max-w-7xl animate-pulse gap-10 lg:grid-cols-2">
          <div className="aspect-4/5 rounded-xl bg-[#181512]" />

          <div className="space-y-6 py-10">
            <div className="h-4 w-32 rounded bg-[#181512]" />
            <div className="h-12 w-2/3 rounded bg-[#181512]" />
            <div className="h-8 w-32 rounded bg-[#181512]" />
            <div className="h-24 rounded-xl bg-[#181512]" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-6 text-center text-[#f4efe7]">
        <div>
          <h1 className="font-serif text-3xl">
            {isError
              ? "Unable to load fragrance"
              : "Fragrance not found"}
          </h1>

          <p className="mt-4 text-sm text-[#817970]">
            {isError
              ? "Something went wrong while loading this product."
              : "The fragrance you are looking for does not exist."}
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-xl bg-[#b89b72] px-6 py-3 text-xs uppercase tracking-[0.15em] text-black hover:bg-[#d1b78f]"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const outOfStock = product.count <= 0;
  const saved = isInWishlist(product.id);

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) =>
      Math.min(product.count, current + 1)
    );
  };

  const goToLogin = () => {
    navigate("/login", {
      state: {
        from: location,
      },
    });
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      goToLogin();
      return;
    }

    if (outOfStock) {
      toast.error("Product is out of stock");
      return;
    }

    addToCart(product.id, quantity);

    toast.success("Added to cart");

    navigate("/cart");
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      goToLogin();
      return;
    }

    toggleWishlist(product.id);

    if (saved) {
      toast("Removed from wishlist");
    } else {
      toast.success("Added to wishlist");
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0b09] text-[#f4efe7]">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Product Image */}
          <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-[#181512]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition duration-500"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                No Image Available
              </div>
            )}

            {outOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="rounded-xl border border-white/30 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#b89b72]">
              {product.brand}
            </p>

            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              {product.name}
            </h1>

            {product.size && (
              <p className="mt-3 text-sm uppercase tracking-[0.15em] text-[#817970]">
                {product.size}
              </p>
            )}

            <p className="mt-6 text-2xl text-[#b89b72]">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            <div className="my-7 border-y border-[#2d2925] py-6">
              <p className="text-sm leading-7 text-[#a69d94]">
                {product.description}
              </p>
            </div>

            <div className="flex gap-3 text-sm">
              <span className="text-[#6f6962]">
                Family
              </span>

              <span>
                {product.category}
              </span>
            </div>

            <div className="mt-4">
              {outOfStock ? (
                <p className="text-sm text-red-400">
                  Currently out of stock
                </p>
              ) : product.count <= 5 ? (
                <p className="text-sm text-[#d1a46e]">
                  Only {product.count} left in stock
                </p>
              ) : (
                <p className="text-sm text-[#8f9a83]">
                  In stock
                </p>
              )}
            </div>

            {/* Quantity */}
            {!outOfStock && (
              <div className="mt-7">
                <p className="mb-3 text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                  Quantity
                </p>

                <div className="flex w-fit items-center overflow-hidden rounded-xl border border-[#2d2925]">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-12 w-12 items-center justify-center text-[#d8d0c7] hover:text-[#b89b72] disabled:opacity-30"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="flex h-12 w-14 items-center justify-center border-x border-[#2d2925] text-sm">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.count}
                    className="flex h-12 w-12 items-center justify-center text-[#d8d0c7] hover:text-[#b89b72] disabled:opacity-30"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-7 flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={outOfStock}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#b89b72] px-5 py-4 text-xs uppercase tracking-[0.15em] text-black hover:bg-[#d1b78f] disabled:cursor-not-allowed disabled:bg-[#3a3530] disabled:text-[#6f6962]"
              >
                <ShoppingBag size={18} />

                {outOfStock
                  ? "Out of Stock"
                  : "Add to Bag"}
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-4 text-xs uppercase tracking-[0.15em] ${
                  saved
                    ? "border-[#b89b72] text-[#b89b72]"
                    : "border-[#2d2925] text-[#d8d0c7] hover:border-[#b89b72] hover:text-[#b89b72]"
                }`}
              >
                <Heart
                  size={18}
                  fill={saved ? "currentColor" : "none"}
                />

                {saved ? "Saved" : "Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetails;