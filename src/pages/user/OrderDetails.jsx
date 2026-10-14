import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import useOrder from "../../hooks/useOrder";

const OrderDetails = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useOrder(id);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0d0b09] px-6 py-16 text-[#f4efe7]">
        <div className="mx-auto max-w-4xl">
          <div className="h-5 w-28 animate-pulse rounded bg-[#181715]" />

          <div className="mt-6 h-12 w-64 animate-pulse rounded bg-[#181715]" />

          <div className="mt-10 h-80 animate-pulse rounded-xl bg-[#181715]" />
        </div>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-6 text-center text-[#f4efe7]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#b89b72]">
            Order
          </p>

          <h1 className="mt-4 font-serif text-4xl">
            Order Not Found
          </h1>

          <p className="mt-4 text-sm text-[#817970]">
            {error?.message || "Unable to find this order."}
          </p>

          <Link
            to="/orders"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#b89b72] px-6 py-3 text-sm uppercase tracking-[0.15em] text-black transition hover:bg-[#d0b58d]"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0b09] px-6 py-16 text-[#f4efe7]">
      <div className="mx-auto max-w-4xl">

        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm text-[#b89b72] transition hover:text-[#d0b58d]"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b89b72]">
            Order Details
          </p>

          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
            Order #{order.id}
          </h1>

          <p className="mt-3 text-sm text-[#817970]">
            {order.created_at
              ? new Date(order.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Date unavailable"}
          </p>
        </div>

        <section className="mt-10 rounded-xl border border-[#2d2925] bg-[#11100e] p-6 sm:p-8">

          {/* Order Summary */}

          <div className="grid gap-6 border-b border-[#2d2925] pb-6 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                Status
              </p>

              <p className="mt-2 text-sm text-[#b89b72]">
                {order.status || "Placed"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                Payment
              </p>

              <p className="mt-2 text-sm text-[#d8cec2]">
                {order.paymentMethod || "Cash on Delivery"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                Order Total
              </p>

              <p className="mt-2 text-lg text-[#d8cec2]">
                ₹{Number(order.total || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Ordered Items */}

          <div className="mt-8">
            <h2 className="font-serif text-2xl">
              Ordered Items
            </h2>

            <div className="mt-6 space-y-5">
              {order.items?.map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex gap-4 border-b border-[#2d2925] pb-5"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                  )}

                  <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-[#eee6dc]">
                        {item.name}
                      </p>

                      <p className="mt-2 text-xs text-[#817970]">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-xs text-[#817970]">
                        ₹{Number(item.price || 0).toLocaleString("en-IN")} each
                      </p>
                    </div>

                    <p className="shrink-0 text-sm text-[#d8cec2]">
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}

          {order.shippingAddress && (
            <div className="mt-8 border-t border-[#2d2925] pt-8">
              <h2 className="font-serif text-2xl">
                Delivery Address
              </h2>

              <div className="mt-4 rounded-xl border border-[#2d2925] bg-[#181715] p-5">
                <p className="text-sm leading-7 text-[#d8cec2]">
                  {order.shippingAddress.fullName}
                  <br />
                  {order.shippingAddress.address}
                  <br />
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.state}
                  <br />
                  {order.shippingAddress.pincode}
                  <br />
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          )}

          {/* Price Summary */}

          <div className="mt-8 border-t border-[#2d2925] pt-8">
            <h2 className="font-serif text-2xl">
              Price Summary
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex justify-between text-sm">
                <span className="text-[#817970]">
                  Subtotal
                </span>

                <span>
                  ₹{Number(order.subtotal || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#817970]">
                  Shipping
                </span>

                <span>
                  ₹{Number(order.shipping || 0).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between border-t border-[#2d2925] pt-5">
                <span className="text-base">
                  Total
                </span>

                <span className="text-lg text-[#b89b72]">
                  ₹{Number(order.total || 0).toLocaleString("en-IN")}
                </span>
              </div>

            </div>
          </div>

        </section>
      </div>
    </main>
  );
};

export default OrderDetails;