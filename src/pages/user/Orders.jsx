import { Link } from "react-router-dom";

import useOrders from "../../hooks/useOrders";
import useCancelOrder from "../../hooks/useCancelOrder";

const Orders = () => {
  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useOrders();

  const cancelOrderMutation = useCancelOrder();

  const handleCancelOrder = (orderId) => {
    cancelOrderMutation.mutate(orderId);
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0d0b09] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="h-4 w-28 animate-pulse rounded bg-[#181512]" />

          <div className="mt-5 h-12 w-52 animate-pulse rounded bg-[#181512]" />

          <div className="mt-10 h-40 animate-pulse rounded-xl bg-[#181512]" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-6 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#b89b72]">
            My Orders
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#eee6dc]">
            Unable to load your orders
          </h1>

          <p className="mt-4 text-sm text-red-400">
            {error?.message || "Something went wrong."}
          </p>
        </div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-6">
        <div className="max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b89b72]">
            My Orders
          </p>

          <h1 className="mt-4 font-serif text-4xl text-[#eee6dc]">
            No orders yet
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#817970]">
            Your completed purchases will appear here.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block rounded-xl bg-[#b89b72] px-6 py-3 text-sm uppercase tracking-[0.15em] text-black transition hover:bg-[#d0b58d]"
          >
            Explore Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0b09] px-6 py-16 text-[#f4efe7]">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b89b72]">
            Purchase History
          </p>

          <h1 className="mt-4 font-serif text-5xl">
            My Orders
          </h1>

          <p className="mt-3 text-sm text-[#817970]">
            {orders.length}{" "}
            {orders.length === 1 ? "order" : "orders"} placed
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-xl border border-[#2d2925] bg-[#11100e] p-6"
            >

              <div className="grid gap-5 border-b border-[#2d2925] pb-5 sm:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                    Order ID
                  </p>

                  <p className="mt-1 text-sm text-[#d8cec2]">
                    #{order.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                    Date
                  </p>

                  <p className="mt-1 text-sm text-[#d8cec2]">
                    {order.created_at
                      ? new Date(
                          order.created_at
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                    Status
                  </p>

                  <p className="mt-1 text-sm text-[#b89b72]">
                    {order.status || "Placed"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                    Total
                  </p>

                  <p className="mt-1 text-lg text-[#d8cec2]">
                    ₹
                    {Number(order.total || 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {order.items?.map((item, index) => (
                  <div
                    key={`${order.id}-${item.productId}-${index}`}
                    className="flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm text-[#eee6dc]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#817970]">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm text-[#d8cec2]">
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>

              {order.shippingAddress && (
                <div className="mt-6 border-t border-[#2d2925] pt-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#6f6962]">
                    Delivery Address
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#817970]">
                    {order.shippingAddress.fullName}
                    <br />
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.state}{" "}
                    {order.shippingAddress.pincode}
                    <br />
                    {order.shippingAddress.phone}
                  </p>

                  <div className="mt-6 flex justify-end gap-3">
                    <Link
                      to={`/orders/${order.id}`}
                      className="rounded-xl border border-[#3a3733] px-5 py-3 text-sm text-[#d8cec2] transition hover:border-[#b89b72] hover:text-[#b89b72]"
                    >
                      View Details
                    </Link>
                  
                    {order.status === "Placed" && (
                      <button
                        type="button"
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancelOrderMutation.isPending}
                        className="rounded-xl border border-[#5a4039] px-5 py-3 text-sm text-[#c98f81] transition hover:border-[#b89b72] hover:text-[#b89b72] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {cancelOrderMutation.isPending
                          ? "Cancelling..."
                          : "Cancel Order"}
                      </button>
                    )}
                  </div>
                </div>
              )}

            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Orders;