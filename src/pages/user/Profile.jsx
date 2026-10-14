import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Heart,
  ShoppingBag,
  Package,
  ChevronRight,
  LogOut,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0d0b09] px-6 text-[#f4efe7]">
        <div className="text-center">
          <h1 className="font-serif text-3xl">
            Please Sign In
          </h1>

          <p className="mt-4 text-sm text-[#817970]">
            Sign in to view your profile.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-block rounded-xl bg-[#b89b72] px-7 py-4 text-xs uppercase tracking-[0.15em] text-black transition hover:bg-[#d1b78f]"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  const name =
    user.fullName ||
    user.name ||
    user.username ||
    "ÉLORIA Customer";

  const email = user.email || "Not available";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-[#0d0b09]  py-16 text-[#f4efe7] sm:py-20">
      <div className="mx-auto max-w-2xl">

        {/* PAGE HEADING */}

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#b89b72]">
            ÉLORIA
          </p>

          <h1 className="mt-4 font-serif text-2xl sm:text-5xl">
            My Account
          </h1>
        </div>


        {/* PROFILE */}

        <section className="mt-12 text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#4a4035] bg-[#181512]">
            <span className="font-serif text-2xl text-[#f4efe7]">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>

          <h2 className="mt-5 font-serif text-2xl sm:text-3xl">
            {name}
          </h2>

          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-[#817970]">
            <Mail
              size={15}
              strokeWidth={1.4}
            />

            <span className="break-all">
              {email}
            </span>
          </div>

        </section>


        {/* ACCOUNT MENU */}

        <section className="mt-12 border-t border-[#302a24]">

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="group flex items-center justify-between border-b border-[#302a24] py-5"
          >
            <div className="flex items-center gap-4">

              <Heart
                size={20}
                strokeWidth={1.4}
                className="shrink-0 text-[#b89b72]"
              />

              <div>
                <p className="text-sm text-[#f4efe7]">
                  Wishlist
                </p>

                <p className="mt-1 text-xs text-[#817970]">
                  Your saved fragrances
                </p>
              </div>

            </div>

            <ChevronRight
              size={18}
              strokeWidth={1.4}
              className="text-[#817970] transition group-hover:text-[#b89b72]"
            />
          </Link>


          {/* SHOPPING BAG */}

          <Link
            to="/cart"
            className="group flex items-center justify-between border-b border-[#302a24] py-5"
          >
            <div className="flex items-center gap-4">

              <ShoppingBag
                size={20}
                strokeWidth={1.4}
                className="shrink-0 text-[#b89b72]"
              />
  
              <div>
                <p className="text-sm text-[#f4efe7]">
                  Cart
                </p>

                <p className="mt-1 text-xs text-[#817970]">
                  Items ready for purchase
                </p>
              </div>

            </div>

            <ChevronRight
              size={18}
              strokeWidth={1.4}
              className="text-[#817970] transition group-hover:text-[#b89b72]"
            />
          </Link>


          {/* ORDERS */}

          <Link
            to="/orders"
            className="group flex items-center justify-between border-b border-[#302a24] py-5"
          >
            <div className="flex items-center gap-4">

              <Package
                size={20}
                strokeWidth={1.4}
                className="shrink-0 text-[#b89b72]"
              />

              <div>
                <p className="text-sm text-[#f4efe7]">
                  My Orders
                </p>

                <p className="mt-1 text-xs text-[#817970]">
                  View your purchases
                </p>
              </div>

            </div>

            <ChevronRight
              size={18}
              strokeWidth={1.4}
              className="text-[#817970] transition group-hover:text-[#b89b72]"
            />
          </Link>

        </section>


        {/* LOGOUT */}

        <section className="mt-8">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#b89b72] px-6 py-4 text-xs uppercase tracking-[0.15em] text-black transition hover:bg-[#d1b78f]"
          >
            <LogOut
              size={16}
              strokeWidth={1.5}
            />

            Logout
          </button>

        </section>

      </div>
    </main>
  );
};

export default Profile;