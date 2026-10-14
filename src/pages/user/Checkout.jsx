import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Lock } from "lucide-react";
import toast from "react-hot-toast";

import useAllProducts from "../../hooks/useAllProducts";
import useCart from "../../hooks/useCart";
import useCreateOrder from "../../hooks/useCreateOrder";
import { getUserId } from "../../utils/localStorage";
import { checkoutSchema } from "../../validations/checkoutSchema";

const Checkout = () => {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useAllProducts();
  const { cartItems = [], clearCart } = useCart();
  const createOrder = useCreateOrder();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const cartProducts = cartItems
    .map((item) => {
      const product = products.find(
        (product) => String(product.id) === String(item.productId)
      );

      if (!product) return null;

      return {
        product,
        quantity: Number(item.quantity),
      };
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce(
    (total, item) =>
      total + Number(item.product.price) * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      form: "",
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const userId = getUserId();

    if (!userId) {
      navigate("/login");
      return;
    }

    if (!cartProducts.length) return;

    try {
      await checkoutSchema.validate(formData, {
        abortEarly: false,
      });

      setErrors({});
    } catch (validationError) {
      const newErrors = {};

      validationError.inner?.forEach((item) => {
        if (!newErrors[item.path]) {
          newErrors[item.path] = item.message;
        }
      });

      setErrors(newErrors);
      return;
    }

    const stockError = cartProducts.find(
      ({ product, quantity }) => Number(product.count) < quantity
    );

    if (stockError) {
      const message = `Not enough stock for ${stockError.product.name}.`;

      setErrors({ form: message });
      toast.error(message);
      return;
    }

    const order = {
      userId: String(userId),

      items: cartProducts.map(({ product, quantity }) => ({
        productId: String(product.id),
        name: product.name,
        quantity,
        price: Number(product.price),
        image: product.image || "",
      })),

      subtotal,
      shipping,
      total,

      shippingAddress: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
      },

      paymentMethod: "Cash on Delivery",
      status: "Placed",
      created_at: new Date().toISOString(),
    };

    createOrder.mutate(
     {
       order,
       products,
     },
     {
       onSuccess: () => {
         clearCart();
   
         toast.success("Order placed successfully");
   
         navigate("/order-success", {
           replace: true,
         });
       },
   
       onError: () => {
         setErrors({
           form: "Unable to place your order. Please try again.",
         });
   
         toast.error("Unable to place your order");
       },
     });
   
   
     };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0d0b09] px-6 py-20 text-[#f4efe7]">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-10 w-60 rounded-xl bg-[#181512]" />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_430px]">
            <div className="space-y-5">
              <div className="h-14 rounded-xl bg-[#181512]" />
              <div className="h-14 rounded-xl bg-[#181512]" />
              <div className="h-32 rounded-xl bg-[#181512]" />
            </div>

            <div className="h-96 rounded-xl bg-[#181512]" />
          </div>
        </div>
      </main>
    );
  }

  if (!cartProducts.length) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#0d0b09] px-6 text-center text-[#f4efe7]">
        <h1 className="font-serif text-4xl">
          Your cart is empty
        </h1>

        <p className="mt-4 max-w-md text-sm leading-7 text-[#817970]">
          Add some fragrances to your bag before checking out.
        </p>

        <Link
          to="/shop"
          className="mt-8 rounded-xl bg-[#b89b72] px-7 py-4 text-xs uppercase tracking-[0.15em] text-black hover:bg-[#d1b78f]"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0b09] text-[#f4efe7]">
      <section className="border-b border-[#2d2925]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#817970] hover:text-[#b89b72]"
          >
            <ArrowLeft size={15} />
            Back to Cart
          </Link>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[#b89b72]">
            ÉLORIA Checkout
          </p>

          <h1 className="mt-4 font-serif text-5xl">
            Complete Your Order
          </h1>
        </div>
      </section>

      <form
        onSubmit={handlePlaceOrder}
        className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_430px]"
      >
        <section>
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#b89b72] text-xs text-[#b89b72]">
              1
            </span>

            <h2 className="font-serif text-3xl">
              Shipping Information
            </h2>
          </div>

          {errors.form && (
            <div className="mt-6 rounded-xl border border-red-900/50 bg-red-950/20 px-5 py-4 text-sm text-red-300">
              {errors.form}
            </div>
          )}

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#817970]">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-xl border border-[#2d2925] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#b89b72]"
              />

              {errors.fullName && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#817970]">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full rounded-xl border border-[#2d2925] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#b89b72]"
              />

              {errors.phone && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#817970]">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full rounded-xl border border-[#2d2925] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#b89b72]"
              />

              {errors.pincode && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.pincode}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#817970]">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                placeholder="Street address"
                className="w-full resize-none rounded-xl border border-[#2d2925] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#b89b72]"
              />

              {errors.address && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#817970]">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full rounded-xl border border-[#2d2925] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#b89b72]"
              />

              {errors.city && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-[#817970]">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full rounded-xl border border-[#2d2925] bg-transparent px-4 py-4 text-sm outline-none focus:border-[#b89b72]"
              />

              {errors.state && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.state}
                </p>
              )}
            </div>
          </div>

          <div className="mt-14 border-t border-[#2d2925] pt-10">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#b89b72] text-xs text-[#b89b72]">
                2
              </span>

              <h2 className="font-serif text-3xl">
                Payment
              </h2>
            </div>

            <div className="mt-7 flex items-center gap-4 rounded-xl border border-[#b89b72] bg-[#11100e] p-5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[#b89b72]">
                <div className="h-2.5 w-2.5 rounded-full bg-[#b89b72]" />
              </div>

              <div>
                <p className="text-sm">
                  Cash on Delivery
                </p>

                <p className="mt-1 text-xs text-[#817970]">
                  Pay when your order is delivered.
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="h-fit overflow-hidden rounded-xl border border-[#2d2925] bg-[#11100e]">
          <div className="border-b border-[#2d2925] px-7 py-6">
            <h2 className="font-serif text-2xl">
              Order Summary
            </h2>
          </div>

          <div className="max-h-500px overflow-y-auto px-7 py-6">
            <div className="space-y-6">
              {cartProducts.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#181512]">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[8px] uppercase tracking-[0.15em] text-[#6f6962]">
                        ÉLORIA
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-[#6f6962]">
                      {product.brand}
                    </p>

                    <p className="mt-1 truncate font-serif text-lg">
                      {product.name}
                    </p>

                    {product.size && (
                      <p className="mt-1 text-xs text-[#817970]">
                        {product.size} × {quantity}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-[#b89b72]">
                      ₹
                      {(
                        Number(product.price) * quantity
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#2d2925] px-7 py-6">
            <div className="flex justify-between text-sm">
              <span className="text-[#817970]">
                Subtotal
              </span>

              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm">
              <span className="text-[#817970]">
                Shipping
              </span>

              <span>Free</span>
            </div>

            <div className="mt-5 border-t border-[#2d2925] pt-5">
              <div className="flex justify-between">
                <span className="font-serif text-xl">
                  Total
                </span>

                <span className="text-xl text-[#b89b72]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={createOrder.isPending}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#b89b72] px-6 py-4 text-xs uppercase tracking-[0.15em] text-black hover:bg-[#d1b78f] disabled:cursor-not-allowed disabled:bg-[#3a3530] disabled:text-[#6f6962]"
            >
              {createOrder.isPending ? (
                "Placing Order..."
              ) : (
                <>
                  <Check size={17} />
                  Place Order
                </>
              )}
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.12em] text-[#6f6962]">
              <Lock size={13} />
              Secure Checkout
            </div>
          </div>
        </aside>
      </form> 
    </main>
  );
};

export default Checkout;