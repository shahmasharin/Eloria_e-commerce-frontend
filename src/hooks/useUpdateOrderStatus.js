import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../services/orderService";

const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) =>
      updateOrderStatus(orderId, status),

    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(
        ["admin", "order", updatedOrder.id],
        updatedOrder
      );

      queryClient.invalidateQueries({
        queryKey: ["admin", "orders"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin", "dashboard"],
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};

export default useUpdateOrderStatus;