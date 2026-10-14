import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createOrder } from "../services/orderService";
import { updateProduct } from "../services/productService";
import { getUserId } from "../utils/localStorage";

const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ order, products }) => {
      // 1. Create the order
      const createdOrder = await createOrder(order);

      // 2. Reduce stock for every ordered product
      for (const item of order.items) {
        const product = products.find(
          (product) =>
            String(product.id) === String(item.productId)
        );

        if (!product) {
          throw new Error(
            `Product ${item.productId} could not be found.`
          );
        }

        const currentStock = Number(product.count || 0);
        const quantityOrdered = Number(item.quantity || 0);

        const newStock = currentStock - quantityOrdered;

        await updateProduct(product.id, {
          count: newStock,
        });
      }

      return createdOrder;
    },

    onSuccess: async () => {
      const userId = getUserId();

      await queryClient.invalidateQueries({
        queryKey: ["orders", userId],
      });

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export default useCreateOrder;