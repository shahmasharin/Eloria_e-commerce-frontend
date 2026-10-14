import { Minus, Plus, Trash2 } from "lucide-react";

const CartItem = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex gap-5 border-b border-[#2d2925] py-6">
      {/* Image */}
      <div className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#15120f]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-serif text-xs tracking-widest text-[#5f574e]">
              ÉLORIA
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#817970]">
            {product.brand}
          </p>

          <h3 className="mt-1 font-serif text-xl text-[#eee6dc]">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-[#817970]">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center overflow-hidden rounded-xl border border-[#3a342e]">
            <button
              type="button"
              onClick={onDecrease}
              className="px-3 py-2 text-[#d8cec2] hover:text-[#b89b72]"
            >
              <Minus size={14} />
            </button>

            <span className="min-w-10 text-center text-sm">
              {quantity}
            </span>

            <button
              type="button"
              onClick={onIncrease}
              disabled={quantity >= product.count}
              className="px-3 py-2 text-[#d8cec2] hover:text-[#b89b72] disabled:opacity-30"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={onRemove}
            className="rounded-xl p-2 text-[#6f6962] hover:text-red-400"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="hidden text-right sm:block">
        <p className="text-sm text-[#d8cec2]">
          ₹
          {(
            Number(product.price) * Number(quantity)
          ).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default CartItem;