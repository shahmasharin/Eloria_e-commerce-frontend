const getWishlistKey = (userId) => {
  return `eloriaWishlist_${userId}`;
};

export const getWishlist = (userId) => {
  if (!userId) {
    return [];
  }

  const key = getWishlistKey(userId);

  const storedWishlist = localStorage.getItem(key);

  if (!storedWishlist) {
    return []
  }

  try {
    const parsedWishlist = JSON.parse(storedWishlist);

    if (!Array.isArray(parsedWishlist)) {
      return [];
    }

    return parsedWishlist.map((id) => String(id));
  } catch (error) {
    console.error("Failed to read wishlist:", error);

    return [];
  }
}

export const saveWishlist = (userId, wishlist) => {
  if (!userId) {
    return
  }

  const key = getWishlistKey(userId);

  localStorage.setItem(
    key,
    JSON.stringify(
      wishlist.map((id) => String(id))
    )
  );
};

export const removeWishlist = (userId) => {
  if (!userId) {
    return
  }

  localStorage.removeItem(
    getWishlistKey(userId)
  )
}