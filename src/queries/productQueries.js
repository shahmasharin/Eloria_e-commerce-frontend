import {
  getProducts,
  getProductBySlug,
} from "../services/productService";

export const productQueries = {
  all: (filters = {}) => ({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  }),

  detail: (slug) => ({
    queryKey: ["products", slug],
    queryFn: () => getProductBySlug(slug),
  }),
};