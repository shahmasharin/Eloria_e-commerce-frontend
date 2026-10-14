import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  LogOut,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import useWishlist from "../../hooks/useWishlist";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Shop",
    path: "/shop",
  },
  {
    name: "Oud",
    path: "/shop?category=Oud",
  },
  {
    name: "Amber",
    path: "/shop?category=Amber",
  },
  {
    name: "Musk",
    path: "/shop?category=Musk",
  },
  {
    name: "Spicy",
    path: "/shop?category=Spicy",
  },
];

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems = [] } = useCart();
  const { wishlistItems = [] } = useWishlist();

  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/shop");
    } else {
      navigate(`/shop?search=${encodeURIComponent(value)}`);
    }

    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const userName =
    user?.fullName ||
    user?.name ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "";

  const wishlistCount = wishlistItems.length;

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="w-full rounded-xl border border-[#2d2925] bg-[#0d0b09] px-5 shadow-lg md:px-10">
        <div className="flex h-20 items-center justify-between gap-5">

          <Link
            to="/"
            className="shrink-0 font-serif text-3xl tracking-[0.12em] text-[#f4efe7]"
          >
            ÉLORIA
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-l text-[#d8d0c7] transition hover:text-[#b89b72]"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">

            <div className="flex items-center">
              {isSearchOpen && (
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    autoFocus
                    placeholder="Search..."
                    className="mr-2 w-36 rounded-xl border border-[#3a342d] bg-[#15120f] px-3 py-2 text-sm text-[#f4efe7] outline-none placeholder:text-[#6f6962] focus:border-[#b89b72]"
                  />
                </form>
              )}

              <button
                type="button"
                onClick={() =>
                  setIsSearchOpen((prev) => !prev)
                }
                className="rounded-xl p-2 text-[#d8d0c7] transition hover:bg-[#181512] hover:text-[#b89b72]"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>

            <Link
              to="/wishlist"
              className="relative rounded-xl p-2 text-[#d8d0c7] transition hover:bg-[#181512] hover:text-[#b89b72]"
              aria-label="Wishlist"
            >
              <Heart size={20} />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b89b72] px-1 text-[10px] font-semibold leading-none text-black">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative rounded-xl p-2 text-[#d8d0c7] transition hover:bg-[#181512] hover:text-[#b89b72]"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b89b72] px-1 text-[10px] font-semibold leading-none text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">

                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-[#d8d0c7] transition hover:bg-[#181512] hover:text-[#b89b72]"
                >
                  <User size={18} />

                  <span>{userName}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl p-2 text-[#d8d0c7] transition hover:bg-[#181512] hover:text-[#b89b72]"
                  aria-label="Logout"
                >
                  <LogOut size={18} />
                </button>

              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-xl px-3 py-2 text-sm text-[#d8d0c7] transition hover:bg-[#181512] hover:text-[#b89b72]"
              >
                Sign In
              </Link>
            )}

          </div>

          <div className="flex items-center gap-2 lg:hidden">

            <button
              type="button"
              onClick={() =>
                setIsSearchOpen((prev) => !prev)
              }
              className="rounded-xl p-2 text-[#d8d0c7] hover:bg-[#181512] hover:text-[#b89b72]"
              aria-label="Search"
            >
              <Search size={21} />
            </button>

            <Link
              to="/cart"
              className="relative rounded-xl p-2 text-[#d8d0c7] hover:bg-[#181512] hover:text-[#b89b72]"
              aria-label="Cart"
            >
              <ShoppingBag size={21} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b89b72] px-1 text-[10px] font-semibold leading-none text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen(true)
              }
              className="rounded-xl p-2 text-[#d8d0c7] hover:bg-[#181512] hover:text-[#b89b72]"
              aria-label="Open menu"
            >
              <Menu size={23} />
            </button>

          </div>
        </div>

        {isSearchOpen && (
          <form
            onSubmit={handleSearch}
            className="border-t border-[#2d2925] px-5 py-4 lg:hidden"
          >
            <div className="flex items-center rounded-xl border border-[#3a342d] bg-[#15120f] px-3">

              <Search
                size={18}
                className="text-[#b89b72]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                autoFocus
                placeholder="Search fragrances..."
                className="w-full bg-transparent px-3 py-3 text-sm text-[#f4efe7] outline-none placeholder:text-[#6f6962]"
              />

            </div>
          </form>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-100 bg-black/70 lg:hidden">

          <aside className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col rounded-l-xl border-l border-[#2d2925] bg-[#0d0b09]">

            <div className="flex items-center justify-between border-b border-[#2d2925] px-6 py-6">

              <Link
                to="/"
                className="font-serif text-xl tracking-[0.12em] text-[#f4efe7]"
              >
                ÉLORIA
              </Link>

              <button
                type="button"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="rounded-xl p-2 text-[#d8d0c7] hover:bg-[#181512] hover:text-[#b89b72]"
                aria-label="Close menu"
              >
                <X size={23} />
              </button>

            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-6">

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block border-b border-[#211e1b] py-4 text-sm text-[#d8d0c7] hover:text-[#b89b72]"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/wishlist"
                className="flex items-center justify-between border-b border-[#211e1b] py-4 text-sm text-[#d8d0c7] hover:text-[#b89b72]"
              >
                <span className="flex items-center gap-3">
                  <Heart size={18} />
                  Wishlist
                </span>

                {wishlistCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b89b72] px-1 text-[10px] font-semibold text-black">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="flex items-center justify-between border-b border-[#211e1b] py-4 text-sm text-[#d8d0c7] hover:text-[#b89b72]"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag size={18} />
                  Cart
                </span>

                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#b89b72] px-1 text-[10px] font-semibold text-black">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated && (
                <Link
                  to="/profile"
                  className="flex items-center gap-3 border-b border-[#211e1b] py-4 text-sm text-[#d8d0c7] hover:text-[#b89b72]"
                >
                  <User size={18} />
                  Profile
                </Link>
              )}

            </nav>

            <div className="border-t border-[#2d2925] px-6 py-6">

              {isAuthenticated ? (
                <div>

                  <Link
                    to="/profile"
                    className="mb-4 block text-sm text-[#8f877f] hover:text-[#b89b72]"
                  >
                    {userName}
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-[#d8d0c7] hover:bg-[#181512] hover:text-[#b89b72]"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>
              ) : (
                <Link
                  to="/login"
                  className="block rounded-xl border border-[#b89b72] px-5 py-3 text-center text-sm text-[#b89b72] hover:bg-[#b89b72] hover:text-black"
                >
                  Sign In
                </Link>
              )}

            </div>

          </aside>
        </div>
      )}
    </header>
  );
};

export default Navbar;