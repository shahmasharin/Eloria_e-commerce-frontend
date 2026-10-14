import { Heart, ShoppingBag, Trash2 } from "lucide-react";

const WishlistItem = ({
  product,
  onRemove,
  onMoveToCart,
}) => {
  return (
    <div className="group">
      <div className="relative aspect-4/5 overflow-hidden bg-[#15120f]">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-serif text-2xl tracking-[0.15em] text-[#5f574e]">
              ÉLORIA
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={onRemove}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffff1a] bg-black/40 text-[#eee6dc] backdrop-blur transition hover:text-red-400"
        >
          <Heart
            size={18}
            fill="currentColor"
          />
        </button>
      </div>

      <div className="pt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#817970]">
          {product.brand}
        </p>

        <h3 className="mt-2 font-serif text-xl text-[#eee6dc]">
          {product.name}
        </h3>

        <p className="mt-2 text-sm text-[#817970]">
          {product.category}
        </p>

        <p className="mt-3 text-sm text-[#d8cec2]">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onMoveToCart}
            disabled={product.count <= 0}
            className="flex flex-1 items-center justify-center gap-2 bg-[#b89b72] px-4 py-3 text-xs uppercase tracking-widest text-black transition hover:bg-[#d0b58d] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag size={15} />
            Add to Bag
          </button>

          <button
            type="button"
            onClick={onRemove}
            className="flex items-center justify-center border border-[#3a342e] px-4 text-[#817970] transition hover:text-red-400"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;