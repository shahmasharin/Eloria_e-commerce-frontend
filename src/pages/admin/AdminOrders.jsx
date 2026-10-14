import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import useAdminOrders from "../../hooks/useAdminOrders";
import useAdminDashboard from "../../hooks/useAdminDashboard";

const headingStyle =
  "px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[#8e8175]";

const cellStyle = "px-6 py-5";

const statusStyle =
  "inline-flex rounded-full border border-[#4a3d2e] bg-[#211b16] px-3 py-1 text-xs text-[#c9ac78]";

const formatPrice = (price) =>
  Number(price || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const AdminOrders = () => {
  const navigate = useNavigate();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useAdminOrders();

  const { data: dashboardData } = useAdminDashboard();

  const users = dashboardData?.users ?? [];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = [
    "All",
    ...new Set(orders.map((order) => order.status || "Unknown")),
  ];

  const searchValue = search.trim().toLowerCase();

  const filteredOrders = orders
    .filter((order) => {
      const customer = users.find(
        (user) =>
          String(user.id) === String(order.userId)
      );

      const customerName =
        customer?.name || "Unknown Customer";

      const matchesSearch =
        !searchValue ||
        String(order.id).toLowerCase().includes(searchValue) ||
        customerName.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        (order.status || "Unknown") === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    )
    .map((order) => {
      const customer = users.find(
        (user) =>
          String(user.id) === String(order.userId)
      );

      const itemCount = (order.items || []).reduce(
        (total, item) =>
          total + Number(item.quantity || 0),
        0
      );

      const date = new Date(order.created_at);

      return {
        ...order,
        customerName:
          customer?.name || "Unknown Customer",
        itemCount,
        formattedDate: Number.isNaN(date.getTime())
          ? "Unknown"
          : date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
        formattedTotal: formatPrice(order.total),
      };
    });

  const openOrder = (id) =>
    navigate(`/admin/orders/${id}`);

  return (
    <section className="flex h-full min-h-0 flex-col gap-6 sm:gap-8">

      {/* Fixed Page Header */}
      <div className="shrink-0">
        <h1 className="font-serif text-2xl text-[#f5efe6] sm:text-3xl">
          Orders
        </h1>

        <p className="mt-2 text-sm text-[#8e8175]">
          Manage and track customer orders.
        </p>
      </div>

      {/* Fixed Search and Status Filter */}
      <div className="flex shrink-0 flex-col gap-3 rounded-xl border border-[#3a3028] bg-[#120f0d] p-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="relative w-full sm:max-w-sm">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8e8175]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order or customer..."
            className="w-full rounded-lg border border-[#3a3028] bg-[#0f0c0a] py-2.5 pl-10 pr-4 text-sm text-[#f5efe6] outline-none placeholder:text-[#6f6257] focus:border-[#b99a63]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-[#3a3028] bg-[#0f0c0a] px-4 py-2.5 text-sm text-[#f5efe6] outline-none focus:border-[#b99a63]"
        >
          {statuses.map((status) => (
            <option
              key={status}
              value={status}
              className="bg-[#120f0d]"
            >
              {status === "All" ? "All Statuses" : status}
            </option>
          ))}
        </select>
      </div>

      {/* Only Orders Section Scrolls */}
      <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-[#3a3028] bg-[#120f0d]">

        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-[#8e8175]">
              Loading orders...
            </p>
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-red-400">
              Unable to load orders.
            </p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="flex h-full items-center justify-center px-6">
            <div className="text-center">
              <p className="text-sm text-[#f5efe6]">
                No orders found.
              </p>

              <p className="mt-2 text-xs text-[#8e8175]">
                Try changing your search or status filter.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-auto overscroll-contain">

            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="w-full min-w-225">

                {/* Sticky Table Headings */}
                <thead className="sticky top-0 z-10 bg-[#120f0d]">
                  <tr className="border-b border-[#3a3028] text-left">
                    {[
                      "Order",
                      "Customer",
                      "Date",
                      "Items",
                      "Total",
                      "Payment",
                      "Status",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className={headingStyle}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => openOrder(order.id)}
                      className="cursor-pointer border-b border-[#2a241f] transition-colors hover:bg-[#18130f] last:border-b-0"
                    >
                      <td className={cellStyle}>
                        <p className="text-sm font-medium text-[#f5efe6]">
                          #{order.id}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <p className="text-sm text-[#f5efe6]">
                          {order.customerName}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <p className="text-sm text-[#a79d93]">
                          {order.formattedDate}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <p className="text-sm text-[#a79d93]">
                          {order.itemCount}{" "}
                          {order.itemCount === 1
                            ? "item"
                            : "items"}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <p className="text-sm font-medium text-[#f5efe6]">
                          ₹ {order.formattedTotal}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <p className="text-sm text-[#a79d93]">
                          {order.paymentMethod || "Unknown"}
                        </p>
                      </td>

                      <td className={cellStyle}>
                        <span className={statusStyle}>
                          {order.status || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-[#2a241f] lg:hidden">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => openOrder(order.id)}
                  className="cursor-pointer p-5 transition-colors hover:bg-[#18130f]"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#f5efe6]">
                        #{order.id}
                      </p>

                      <p className="mt-1 truncate text-xs text-[#8e8175]">
                        {order.customerName}
                      </p>
                    </div>

                    <span className={`${statusStyle} shrink-0`}>
                      {order.status || "Unknown"}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-xs text-[#6f6257]">
                        Date
                      </p>

                      <p className="mt-1 text-sm text-[#a79d93]">
                        {order.formattedDate}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#6f6257]">
                        Items
                      </p>

                      <p className="mt-1 text-sm text-[#a79d93]">
                        {order.itemCount}{" "}
                        {order.itemCount === 1
                          ? "item"
                          : "items"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#6f6257]">
                        Total
                      </p>

                      <p className="mt-1 text-sm font-medium text-[#f5efe6]">
                        ₹ {order.formattedTotal}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-[#6f6257]">
                        Payment
                      </p>

                      <p className="mt-1 text-sm text-[#a79d93]">
                        {order.paymentMethod || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminOrders;
