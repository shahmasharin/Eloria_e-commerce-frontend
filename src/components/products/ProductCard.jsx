import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";

import useWishlist from "../../hooks/useWishlist";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";


const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isOutOfStock = product.count <= 0;
  const saved = isInWishlist(product.id);

const handleWishlist = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!isAuthenticated) {
    navigate("/login", {
      state: {
        from: {
          pathname: `/product/${product.slug}`,
        },
      },
    });

    return;
  }

  toggleWishlist(product.id);

  if (saved) {
    toast("Removed from wishlist");
  } else {
    toast.success("Added to wishlist");
  }
};
const handleAddToCart = (e) => {
  e.preventDefault();
  e.stopPropagation();

  if (!isAuthenticated) {
    navigate("/login", {
      state: {
        from: {
          pathname: `/product/${product.slug}`,
        },
      },
    });

    return;
  }

  if (isOutOfStock) {
    toast.error("Product is out of stock");
    return;
  }

  addToCart(product.id, 1);

  toast.success("Added to cart");

  navigate("/cart");
};

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block"
    >

      {/*  PRODUCT IMAGE*/}

      <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-[#181512]">

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.2em] text-[#6f6962]">
            No Image
          </div>
        )}

        {/* OUT OF STOCK */}

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="border border-white/30 bg-black/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white">
              Out of Stock
            </span>
          </div>
        )}

        {/* WISHLIST */}
        <button
          type="button"
          onClick={handleWishlist}
          className="heart absolute right-4 top-4 flex h-10 w-10 items-center justify-center"
          aria-label={
            saved
              ? "Remove from wishlist"
              : "Add to wishlist"
          }>
          <Heart
            size={21}
            strokeWidth={1}
            stroke="black"
            fill={saved ? "black" : "none"}
            />
            </button>
        {/*  ADD TO BAG*/}

        {!isOutOfStock && (
          <button
            type="button"
            onClick={handleAddToCart}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 bg-[#b89b72] px-4 py-3 text-xs uppercase tracking-[0.15em] text-black opacity-0 transition duration-300 group-hover:opacity-100 hover:bg-[#d1b78f] rounded-xl"
          >
            <ShoppingBag
              size={16}
              strokeWidth={1.5}
            />

            Add to Bag
          </button>
        )}
      </div>
      {/* PRODUCT INFORMATION */}
 
      <div className="pt-5">

        <p className="text-[10px] uppercase tracking-[0.25em] text-[#6f6962]">
          {product.brand}
        </p>

        <h3 className="mt-2 font-serif text-xl text-[#f4efe7] transition ">
          {product.name}
        </h3>

        {product.size && (
          <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#817970]">
            {product.size}
          </p>
        )}

        <p className="mt-3 text-sm text-[#b89b72]">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

      </div>
    </Link>
  );
};

export default ProductCard;