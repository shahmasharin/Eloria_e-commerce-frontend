import { Link } from "react-router-dom";

const EmptyWishlist = () => {
  return (
    <div className="py-24 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-[#b89b72]">
        Your Collection
      </p>

      <h1 className="mt-5 font-serif text-4xl text-[#eee6dc]">
        Your wishlist is empty.
      </h1>

      <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#817970]">
        Save fragrances that catch your attention and
        return to them whenever you like.
      </p>

      <Link
        to="/shop"
        className="mt-8 inline-block bg-[#b89b72] px-7 py-4 text-sm uppercase tracking-[0.18em] text-black"
      >
        Explore Collection
      </Link>
    </div>
  );
};

export default EmptyWishlist;