import api from "./axios";

export const getOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);

  return response.data;
};

export const createOrder = async (order) => {
  const response = await api.post("/orders", order);

  return response.data;
};

export const cancelOrder = async (orderId) => {
  const response = await api.patch(`/orders/${orderId}`, {
    status: "Cancelled",
  });

  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await api.patch(`/orders/${orderId}`, {
    status,
  });

  return response.data;
};