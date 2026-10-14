import { IndianRupee, Package, ShoppingBag, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import useAdminDashboard from "../../hooks/useAdminDashboard";

const cardStyle =
  "rounded-xl border border-[#3a3028] bg-[#120f0d] p-5 sm:p-6";

const mutedText = "text-sm text-[#8e8175]";

const rowStyle =
  "flex items-center justify-between gap-4 border-b border-[#3a3028] pb-4 last:border-b-0 last:pb-0";

const chartColors = [
  "#c9ac78",
  "#8e8175",
  "#6f6257",
  "#a88b5c",
  "#5a4d43",
];

const tooltipStyle = {
  backgroundColor: "#120f0d",
  border: "1px solid #3a3028",
  borderRadius: "8px",
};

const axisStyle = {
  fill: "#8e8175",
  fontSize: 12,
};

const AdminDashboard = () => {
  const { data, isLoading, isError } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className={mutedText}>Loading dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-6">
        <p className="text-sm text-red-400">
          Unable to load dashboard data.
        </p>
      </div>
    );
  }

  const products = data?.products ?? [];
  const users = data?.users ?? [];
  const orders = data?.orders ?? [];
  const totalCustomers = users.filter(
  (user) => user.role !== "admin"
  ).length;

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  const stats = [
    { label: "Products", value: products.length, icon: Package },
    { label: "Users", value: totalCustomers, icon: Users },
    { label: "Orders", value: orders.length, icon: ShoppingBag },
    {
      label: "Revenue",
      value: `₹ ${totalRevenue.toFixed(2)}`,
      icon: IndianRupee,
    },
  ];

  const salesByDate = orders.reduce((sales, order) => {
    const date = new Date(order.created_at);

    if (Number.isNaN(date.getTime())) return sales;

    const dateKey = date.toISOString().split("T")[0];

    sales[dateKey] =
      (sales[dateKey] || 0) + Number(order.total || 0);

    return sales;
  }, {});

  const salesData = Object.entries(salesByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, revenue]) => ({
      date: new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      revenue,
    }));

  const ordersByStatus = orders.reduce((result, order) => {
    const status = order.status || "Unknown";

    result[status] = (result[status] || 0) + 1;

    return result;
  }, {});

  const statusData = Object.entries(ordersByStatus).map(
    ([name, value]) => ({ name, value })
  );

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    )
    .slice(0, 5);

  const lowStockProducts = products
    .filter((product) => Number(product.count || 0) <= 5)
    .sort(
      (a, b) =>
        Number(a.count || 0) - Number(b.count || 0)
    )
    .slice(0, 5);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="mt-2 font-serif text-2xl text-[#f5efe6] sm:text-3xl">
          Dashboard
        </h1>
        <p className={`mt-2 ${mutedText}`}>
          Overview of your store perfomance
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-[#3a3028] bg-[#120f0d] p-5 transition-colors duration-200 hover:border-[#b99a63]"
          >
            <div className="flex items-center gap-3">
              <Icon
                size={20}
                strokeWidth={1.8}
                className="text-[#c9ac78]"
              />
              <p className={mutedText}>{label}</p>
            </div>

            <p className="mt-3 text-2xl font-medium text-[#f5efe6]">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className={cardStyle}>
          <div className="mb-6">
            <h2 className="font-serif text-xl text-[#f5efe6]">
              Sales Overview
            </h2>
            <p className={`mt-1 ${mutedText}`}>
              Revenue generated from orders over time.
            </p>
          </div>

          {salesData.length === 0 ? (
            <div className="flex h-72 items-center justify-center">
              <p className={mutedText}>No sales data available.</p>
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="#3a3028"
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="date"
                    tick={axisStyle}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={axisStyle}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value}`}
                  />

                  <Tooltip
                    cursor={{ fill: "#1d1814" }}
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: "#c9ac78" }}
                    formatter={(value) => [
                      `₹ ${Number(value).toFixed(2)}`,
                      "Revenue",
                    ]}
                  />

                  <Bar
                    dataKey="revenue"
                    fill="#c9ac78"
                    radius={[4, 4, 0, 0]}
                    barSize={18}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className={cardStyle}>
          <div className="mb-5">
            <h2 className="font-serif text-xl text-[#f5efe6]">
              Orders by Status
            </h2>
            <p className={`mt-1 ${mutedText}`}>
              Current distribution of your orders.
            </p>
          </div>

          {statusData.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <p className={mutedText}>No order data available.</p>
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={3}
                    isAnimationActive={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={chartColors[index % 5]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={{ color: "#c9ac78" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders and Low Stock */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className={cardStyle}>
          <div className="mb-5">
            <h2 className="font-serif text-xl text-[#f5efe6]">
              Recent Orders
            </h2>
            <p className={`mt-1 ${mutedText}`}>
              Latest orders placed in your store.
            </p>
          </div>

          {recentOrders.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <p className={mutedText}>No orders available.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => {
                const customer = users.find(
                  (user) =>
                    String(user.id) === String(order.userId)
                );

                return (
                  <div key={order.id} className={rowStyle}>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#f5efe6]">
                        #{order.id}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#8e8175]">
                        {customer?.name || "Unknown Customer"}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium text-[#f5efe6]">
                        ₹ {Number(order.total || 0).toFixed(2)}
                      </p>
                      <p className="mt-1 text-xs text-[#c9ac78]">
                        {order.status || "Unknown"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className={cardStyle}>
          <div className="mb-5">
            <h2 className="font-serif text-xl text-[#f5efe6]">
              Low Stock Products
            </h2>
            <p className={`mt-1 ${mutedText}`}>
              Products that need your attention.
            </p>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <p className={mutedText}>No low stock products.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {lowStockProducts.map((product) => {
                const stock = Number(product.count || 0);

                return (
                  <div key={product.id} className={rowStyle}>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#f5efe6]">
                        {product.name}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#8e8175]">
                        {product.brand}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-medium text-[#f5efe6]">
                        {stock} {stock === 1 ? "item" : "items"}
                      </p>
                      <p className="mt-1 text-xs text-[#c9ac78]">
                        {stock === 0 ? "Out of Stock" : "Low Stock"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
