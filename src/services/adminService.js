import api from "./axios";

export const getAdminDashboardData = async () => {
  const [productsResponse, usersResponse, ordersResponse] =
    await Promise.all([
      api.get("/products"),
      api.get("/users"),
      api.get("/orders"),
    ]);

  return {
    products: productsResponse.data,
    users: usersResponse.data,
    orders: ordersResponse.data,
  }
} 