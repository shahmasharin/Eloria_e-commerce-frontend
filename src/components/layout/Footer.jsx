import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-[#2d2925] bg-[#0a0807]">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-[#b89b72]">
              The Art of Oud
            </p>

            <h2 className="font-serif text-3xl tracking-[0.15em]">
              ÉLORIA
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#928a82]">
              A curated fragrance house inspired by the depth,
              warmth and heritage of Middle Eastern perfumery.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-5 text-sm uppercase tracking-[0.2em] text-[#d8d0c6]">
              Explore
            </h3>

            <div className="flex flex-col gap-3 text-sm text-[#8f887f]">
              <Link to="/shop" className="hover:text-[#b89b72]">
                Shop
              </Link>

              <Link
                to="/shop?category=Oud"
                className="hover:text-[#b89b72]"
              >
                Oud
              </Link>

              <Link to="/wishlist" className="hover:text-[#b89b72]">
                Wishlist
              </Link>

              <Link to="/orders" className="hover:text-[#b89b72]">
                My Orders
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-5 text-sm uppercase tracking-[0.2em] text-[#d8d0c6]">
              Account
            </h3>

            <div className="flex flex-col gap-3 text-sm text-[#8f887f]">
              <Link to="/login" className="hover:text-[#b89b72]">
                Sign In
              </Link>

              <Link to="/register" className="hover:text-[#b89b72]">
                Create Account
              </Link>

              <Link to="/profile" className="hover:text-[#b89b72]">
                Profile
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-[#2d2925] pt-6 text-center text-xs text-[#6f6962]">
          © {new Date().getFullYear()} ÉLORIA. The Art of Oud.
        </div>

      </div>
    </footer>
  );
};

export default Footer;