import { useQuery } from "@tanstack/react-query";

import { productQueries } from "../queries/productQueries";

const useProducts = (filters = {}) => {
  return useQuery({
    ...productQueries.all(filters),
    placeholderData: (previousData) => previousData,
  });
};

export default useProducts;