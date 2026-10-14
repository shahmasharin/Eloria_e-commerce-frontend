import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="py-24 text-center">

      <p className="text-xs uppercase tracking-[0.4em] text-[#b89b72]">
        Your Bag
      </p>

      <h1 className="mt-5 font-serif text-4xl text-[#eee6dc]">
        Your bag is empty.
      </h1>

      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#817970]">
        Discover a fragrance and begin your ÉLORIA collection.
      </p>

      <Link
        to="/shop"
        className="mt-8 inline-block rounded-xl bg-[#b89b72] px-7 py-4 text-sm uppercase tracking-[0.18em] text-black"
      >
        Explore Collection
      </Link> 

    </div>
  );
};

export default EmptyCart;