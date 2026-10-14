import { useQuery } from "@tanstack/react-query";

import { getAllProducts } from "../services/productService";

const useAllProducts = () => {
  return useQuery({
    queryKey: ["products", "all"],
    queryFn: getAllProducts,
  });
};

export default useAllProducts;