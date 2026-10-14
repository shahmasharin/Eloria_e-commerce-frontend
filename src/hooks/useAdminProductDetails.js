import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productService";

const useAdminProductDetails = (id) => {
  return useQuery({
    queryKey: ["admin", "product", id],
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
  });
};

export default useAdminProductDetails;