
import api from "./axios";

export const getProducts = async ({
  page = 1,
  perPage = 8,
  search = "",
  category = "",
  brand = "",
  sort = "",
  activeOnly = false,
} = {}) => {
  const params = {
    _page: page,
    _per_page: perPage,
  };

  if (activeOnly) {
    params["isActive:eq"] = true;
  }

  if (search.trim()) {
    params["name:contains"] = search.trim();
  }

  if (category) {
    params["category:eq"] = category;
  }

  if (brand) {
    params["brand:eq"] = brand;
  }

  if (sort === "price-low") {
    params._sort = "price";
  }

  if (sort === "price-high") {
    params._sort = "-price";
  }

  if (sort === "name") {
    params._sort = "name";
  }

  const response = await api.get("/products", {
    params,
  });

  return response.data;
};

// Used by Cart, Wishlist and Checkout
export const getAllProducts = async () => {
  const response = await api.get("/products", {
    params: {
      _page: 1,
      _per_page: 1000,
    },
  });

  return response.data?.data ?? response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get("/products", {
    params: {
      slug,
    },
  });

  return response.data?.data?.[0] ?? response.data?.[0];
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const updateProduct = async (productId, data) => {
  const response = await api.patch(
    `/products/${productId}`,
    data
  );

  return response.data;
};
