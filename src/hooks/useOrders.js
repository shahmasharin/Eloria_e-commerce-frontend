import { useQuery } from "@tanstack/react-query";

import { getOrders } from "../services/orderService";
import { getUserId } from "../utils/localStorage";

const useOrders = () => {
  const userId = getUserId();

  return useQuery({
    queryKey: ["orders", userId],

    queryFn: async () => {
      const orders = await getOrders();

      return orders.filter(
        (order) =>
          String(order.userId) === String(userId)
      );
    },

    enabled: Boolean(userId),
  });
};

export default useOrders;