import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelOrder } from "../services/orderService";

const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,

    onSuccess: (data) => {
      console.log("Order cancelled:", data);

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: (error) => {
      console.log("Cancel order error:", error);
      console.log("Response:", error.response?.data);
    },
  });
};

export default useCancelOrder;