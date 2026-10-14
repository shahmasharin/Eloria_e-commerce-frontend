import { Link, useLocation } from "react-router-dom";
import { Check } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-6 text-[#f4efe7]">
      <div className="w-full max-w-lg rounded-xl border border-[#2d2925] bg-[#11100e] px-6 py-12 text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#b89b72]">
          <Check
            size={30}
            className="text-[#b89b72]"
          />
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#b89b72]">
          ÉLORIA
        </p>

        <h1 className="mt-4 font-serif text-4xl">
          Order Confirmed
        </h1>

        {orderId && (
          <p className="mt-4 text-sm text-[#b89b72]">
            Order #{orderId}
          </p>
        )}

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#817970]">
          Thank you for your order. Your fragrance is on its way.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/orders"
            className="rounded-xl bg-[#b89b72] px-6 py-3 text-sm text-black hover:bg-[#d1b78f]"
          >
            View Orders
          </Link>

          <Link
            to="/shop"
            className="rounded-xl border border-[#b89b72] px-6 py-3 text-sm text-[#b89b72] hover:bg-[#b89b72] hover:text-black"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </main>
  );
};

export default OrderSuccess;