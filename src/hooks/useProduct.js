import { useQuery } from "@tanstack/react-query";

import { productQueries } from "../queries/productQueries";

const useProduct = (slug) => {
  return useQuery({
    ...productQueries.detail(slug),
    enabled: Boolean(slug),
  });
};

export default useProduct;