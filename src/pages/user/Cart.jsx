import { useMemo } from "react";

import useCart from "../../hooks/useCart";
import useAllProducts from "../../hooks/useAllProducts";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import EmptyCart from "../../components/cart/EmptyCart";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
  } = useCart();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useAllProducts();

  const cartProducts = useMemo(() => {
     return cartItems
      .map((cartItem) => {
        const product = products.find(
          (item) =>
            String(item.id) ===
            String(cartItem.productId)
        );

        if (!product) {
          return null;
        }

        return {
          product,
          quantity: cartItem.quantity,
        };
      })
      .filter(Boolean);
  }, [cartItems, products]);

  /*
   * Calculate subtotal
   */
  const subtotal = cartProducts.reduce(
    (total, item) =>
      total +
      Number(item.product.price) *
        Number(item.quantity),
    0
  );

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#0d0b09] px-6 py-32">
        <div className="mx-auto max-w-7xl">

          <p className="text-[#817970]">
            Loading your bag...
          </p>

        </div>
      </section>
    );
  }
/* Error */
  if (isError) {
    return (
      <section className="min-h-screen bg-[#0d0b09] px-6 py-32 text-center">

        <h1 className="font-serif text-3xl text-[#eee6dc]">
          Unable to load your bag
        </h1>

        <p className="mt-4 text-sm text-red-400">
          {error?.message ||
            "Something went wrong."}
        </p>

      </section>
    );
  }

  /* Empty cart*/
  if (!cartProducts.length) {
    return (
      <section className="min-h-screen bg-[#0d0b09] px-6">
        <div className="mx-auto max-w-7xl">
          <EmptyCart />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0d0b09] px-6 py-20">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#b89b72]">
            Your Selection
          </p>

          <h1 className="mt-4 font-serif text-5xl text-[#eee6dc]">
            Your Bag
          </h1>

          <p className="mt-3 text-sm text-[#817970]">
            {cartProducts.length}{" "}
            {cartProducts.length === 1
              ? "fragrance"
              : "fragrances"}{" "}
            selected
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

          {/* Cart items */}
          <div>

            {cartProducts.map(
              ({ product, quantity }) => (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onIncrease={() =>
                    updateQuantity(
                      product.id,
                      quantity + 1
                    )
                  }
                  onDecrease={() =>
                    updateQuantity(
                      product.id,
                      quantity - 1
                    )
                  }
                  onRemove={() =>
                    removeFromCart(product.id)
                  }
                />
              )
            )}

          </div>

          {/* Summary */}
          <div>
            <CartSummary subtotal={subtotal} />
          </div>

        </div>

      </div>

    </section>
  );
};

export default Cart;