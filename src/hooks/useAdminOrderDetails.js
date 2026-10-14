import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../services/orderService";

const useAdminOrderDetails = (id) => {
  return useQuery({
    queryKey: ["admin", "order", id],
    queryFn: () => getOrderById(id),
    enabled: Boolean(id),
  });
};

export default useAdminOrderDetails;