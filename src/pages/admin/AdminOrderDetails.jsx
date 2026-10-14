import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import useAdminOrderDetails from "../../hooks/useAdminOrderDetails";
import useUpdateOrderStatus from "../../hooks/useUpdateOrderStatus";

const cardStyle =
  "rounded-xl border border-[#3a3028] bg-[#120f0d] p-5 sm:p-6";

const titleStyle = "font-serif text-xl text-[#f5efe6]";
const mutedText = "text-sm text-[#8e8175]";
const valueText = "text-sm text-[#a79d93]";

const orderStatuses = [
  "Placed",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const updateStatus = useUpdateOrderStatus();

  const {
    data: order,
    isLoading,
    isError,
  } = useAdminOrderDetails(id);

  useEffect(() => {
    if (order?.status) {
      setStatus(order.status);
    }
  }, [order]);

  const goBack = () => navigate("/admin/orders");

  const items = order?.items || [];

  const itemCount = items.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const orderDate = new Date(order?.created_at);

  const formattedDate = Number.isNaN(orderDate.getTime())
    ? "Unknown date"
    : orderDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

  const handleStatusUpdate = () => {
    if (!order || updateStatus.isPending) return;

    if (!status || status === order.status) return;

    updateStatus.mutate({
      orderId: order.id,
      status,
    });
  };

  return (
    <section className="flex h-full min-h-0 flex-col">

      {/* Fixed Back Button */}
      <div className="mb-6 shrink-0">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-2 text-sm text-[#8e8175] transition hover:text-[#f5efe6]"
        >
          <ArrowLeft size={17} />
          Back to Orders
        </button>
      </div>

      {/* Only Order Details Scroll */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 pb-6">

        {isLoading ? (
          <div className="flex min-h-75 items-center justify-center">
            <p className={mutedText}>
              Loading order...
            </p>
          </div>
        ) : isError || !order ? (
          <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-6">
            <p className="text-sm text-red-400">
              Unable to load this order.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Order Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-serif text-2xl text-[#f5efe6] sm:text-3xl">
                  Order #{order.id}
                </h1>

                <p className={`mt-2 ${mutedText}`}>
                  {formattedDate}
                </p>
              </div>

              {/* Status Update */}
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={updateStatus.isPending}
                  className="rounded-lg border border-[#3a3028] bg-[#120f0d] px-4 py-2.5 text-sm text-[#f5efe6] outline-none focus:border-[#b99a63] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {orderStatuses.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-[#120f0d]"
                    >
                      {item}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={
                    updateStatus.isPending ||
                    !status ||
                    status === order.status
                  }
                  onClick={handleStatusUpdate}
                  className="rounded-lg bg-[#b99a63] px-4 py-2.5 text-sm font-medium text-[#120f0d] transition hover:bg-[#c9ac78] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updateStatus.isPending
                    ? "Updating..."
                    : "Update Status"}
                </button>

              </div>
            </div>

            {/* Order Items */}
            <div className="rounded-xl border border-[#3a3028] bg-[#120f0d]">

              <div className="border-b border-[#3a3028] p-5 sm:p-6">
                <h2 className={titleStyle}>
                  Order Items
                </h2>

                <p className={`mt-1 ${mutedText}`}>
                  {itemCount}{" "}
                  {itemCount === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="divide-y divide-[#2a241f]">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-5 sm:p-6"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#f5efe6]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#8e8175]">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-xs text-[#8e8175]">
                        ₹{" "}
                        {Number(item.price || 0).toFixed(2)}{" "}
                        each
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium text-[#f5efe6]">
                        ₹{" "}
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 0)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary and Payment */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

              <div className={cardStyle}>
                <h2 className={titleStyle}>
                  Order Summary
                </h2>

                <div className="mt-5 space-y-3">

                  <div className="flex justify-between text-sm">
                    <span className="text-[#8e8175]">
                      Subtotal
                    </span>

                    <span className="text-[#a79d93]">
                      ₹{" "}
                      {Number(order.subtotal || 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#8e8175]">
                      Shipping
                    </span>

                    <span className="text-[#a79d93]">
                      ₹{" "}
                      {Number(order.shipping || 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="border-t border-[#3a3028] pt-3">
                    <div className="flex justify-between">

                      <span className="text-sm font-medium text-[#f5efe6]">
                        Total
                      </span>

                      <span className="text-lg font-medium text-[#c9ac78]">
                        ₹{" "}
                        {Number(order.total || 0).toFixed(2)}
                      </span>

                    </div>
                  </div>

                </div>
              </div>

              <div className={cardStyle}>
                <h2 className={titleStyle}>
                  Payment
                </h2>

                <p className={`mt-4 ${valueText}`}>
                  {order.paymentMethod || "Unknown"}
                </p>
              </div>

            </div>

            {/* Shipping Address */}
            <div className={cardStyle}>
              <h2 className={titleStyle}>
                Shipping Address
              </h2>

              <div className="mt-4 space-y-1 text-sm text-[#a79d93]">
                <p>
                  {order.shippingAddress?.fullName}
                </p>

                <p>
                  {order.shippingAddress?.address}
                </p>

                <p>
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state}
                </p>

                <p>
                  {order.shippingAddress?.pincode}
                </p>

                <p>
                  {order.shippingAddress?.phone}
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

export default AdminOrderDetails;
