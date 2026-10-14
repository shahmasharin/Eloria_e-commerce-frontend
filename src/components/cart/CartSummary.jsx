import { Link } from "react-router-dom";

const CartSummary = ({ subtotal }) => {
  return (
    <div className="border border-[#2d2925] bg-[#11100e] p-7 rounded-xl">

      <h2 className="font-serif text-2xl text-[#eee6dc]">
        Order Summary
      </h2>

      <div className="mt-7 space-y-4">

        <div className="flex justify-between text-sm">
          <span className="text-[#817970]">
            Subtotal
          </span>

          <span className="text-[#d8cec2]">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-[#817970]">
            Delivery
          </span>

          <span className="text-[#d8cec2]">
            Calculated at checkout
          </span>
        </div>

      </div>

      <div className="my-6 h-px bg-[#2d2925]" />

      <div className="flex justify-between">
        <span className="text-[#eee6dc]">
          Total
        </span>

        <span className="text-lg text-[#b89b72]">
          ₹{subtotal.toLocaleString("en-IN")}
        </span>
      </div>

      <Link
        to="/checkout"
        className="mt-7 block w-full bg-[#b89b72] px-6 py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-black transition rounded-xl hover:bg-[#d0b58d]"
      >
        Proceed to Checkout
      </Link>

      <Link
        to="/shop"
        className="mt-4 block text-center text-sm text-[#817970] hover:text-[#b89b72]"
      >
        Continue Shopping
      </Link>

    </div>
  );
};

export default CartSummary;