import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../services/orderService";
import useAuth from "./useAuth";

const useOrder = (id) => {
  const { user } = useAuth();

  const userId = user?.id;

  return useQuery({
    queryKey: ["order", id, userId],

    queryFn: async () => {
      const order = await getOrderById(id);

      if (String(order.userId) !== String(userId)) {
        throw new Error("You are not authorized to view this order.");
      }

      return order;
    },

    enabled: Boolean(id && userId),
  });
};

export default useOrder;