import api from "./axios";

export const getUsers = async () => {
  const response = await api.get("/users");

  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);

  return response.data;
};

export const registerUser = async (user) => {
  const response = await api.post("/users", user);

  return response.data;
};


export const updateUser = async (id, data) => {
  const response = await api.patch(`/users/${id}`, data);

  return response.data;
};
