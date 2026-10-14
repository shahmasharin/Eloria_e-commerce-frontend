
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getUserId } from "../utils/localStorage";
import { getUserById, updateUser } from "../services/userService";

const useWishlist = () => {
  const userId = getUserId();
  const queryClient = useQueryClient();

  const queryKey = ["shopping-user", userId];

  const { data: user, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => getUserById(userId),
    enabled: Boolean(userId),
  });

  const wishlistItems = Array.isArray(user?.wishlist)
    ? user.wishlist.map(String)
    : [];

  const wishlistMutation = useMutation({
    mutationKey: ["wishlist", userId],
    scope: { id: `wishlist-${userId}` },

    mutationFn: async (changeWishlist) => {
      const latestUser = await getUserById(userId);

      const currentWishlist = (
        latestUser.wishlist || []
      ).map(String);

      const updatedWishlist = changeWishlist(currentWishlist);

      return updateUser(userId, {
        wishlist: updatedWishlist,
      });
    },

    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKey, (old) =>
        old
          ? { ...old, wishlist: updatedUser.wishlist || [] }
          : updatedUser
      );

      queryClient.invalidateQueries({ queryKey });
    },

    onError: () => {
      toast.error("Unable to update wishlist");
    },
  });

  const updateWishlist = (changeWishlist) => {
    if (!userId) return false;

    wishlistMutation.mutate(changeWishlist);
    return true;
  };

  const addToWishlist = (productId) => {
    const id = String(productId);

    return updateWishlist((current) =>
      current.includes(id) ? current : [...current, id]
    );
  };

  const removeFromWishlist = (productId) => {
    const id = String(productId);

    return updateWishlist((current) =>
      current.filter((item) => item !== id)
    );
  };

  const isInWishlist = (productId) => {
    return wishlistItems.includes(String(productId));
  };

  const toggleWishlist = (productId) => {
    const id = String(productId);

    return updateWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const clearWishlist = () => {
    return updateWishlist(() => []);
  };

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    isLoading,
    isError,
    isUpdating: wishlistMutation.isPending,
  };
};

export default useWishlist;
