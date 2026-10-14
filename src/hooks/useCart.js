
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getUserId } from "../utils/localStorage";
import { getUserById, updateUser } from "../services/userService";

const useCart = () => {
  const userId = getUserId();
  const queryClient = useQueryClient();

  const queryKey = ["shopping-user", userId];

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn: () => getUserById(userId),
    enabled: Boolean(userId),
  });

  const cartItems = Array.isArray(user?.cart) ? user.cart : [];

  const cartMutation = useMutation({
    mutationKey: ["cart", userId],
    scope: { id: `cart-${userId}` },

    mutationFn: async (changeCart) => {
      const latestUser = await getUserById(userId);
      const currentCart = latestUser.cart || [];

      const updatedCart = changeCart(currentCart);

      return updateUser(userId, {
        cart: updatedCart,
      });
    },

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKey, (old) =>
        old
          ? { ...old, cart: updatedUser.cart || [] }
          : updatedUser
      );

      queryClient.invalidateQueries({ queryKey });
    },

    onError: () => {
      toast.error("Unable to update cart");
    },
  });

  const addToCart = (productId, quantity = 1) => {
    if (!userId) return false;

    const id = String(productId);
    const qty = Number(quantity);

    if (!Number.isFinite(qty) || qty <= 0) return false;

    cartMutation.mutate((currentCart) => {
      const existing = currentCart.find(
        (item) => String(item.productId) === id
      );

      if (existing) {
        return currentCart.map((item) =>
          String(item.productId) === id
            ? {
                ...item,
                quantity: Number(item.quantity) + qty,
              }
            : item
        );
      }

      return [...currentCart, { productId: id, quantity: qty }];
    });

    return true;
  };

  const updateQuantity = (productId, quantity) => {
    if (!userId) return false;

    const qty = Number(quantity);

    if (!Number.isFinite(qty)) return false;

    if (qty <= 0) {
      return removeFromCart(productId);
    }

    const id = String(productId);

    cartMutation.mutate((currentCart) =>
      currentCart.map((item) =>
        String(item.productId) === id
          ? { ...item, quantity: qty }
          : item
      )
    );

    return true;
  };

  const removeFromCart = (productId) => {
    if (!userId) return false;

    const id = String(productId);

    cartMutation.mutate((currentCart) =>
      currentCart.filter(
        (item) => String(item.productId) !== id
      )
    );

    return true;
  };

  const clearCart = () => {
    if (!userId) return false;

    cartMutation.mutate(() => []);
    return true;
  };

  const getCartQuantity = (productId) => {
    const item = cartItems.find(
      (item) => String(item.productId) === String(productId)
    );

    return Number(item?.quantity || 0);
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartQuantity,
    totalQuantity,
    isLoading,
    isError,
    isUpdating: cartMutation.isPending,
  };
};

export default useCart;
