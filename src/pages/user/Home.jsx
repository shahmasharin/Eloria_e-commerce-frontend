import { Link } from "react-router-dom";
import useAllProducts from "../../hooks/useAllProducts";
import ProductCard from "../../components/products/ProductCard";

const families = [
  ["Oud", "Deep and woody."],
  ["Amber", "Warm and smooth."],
  ["Musk", "Soft and clean."],
  ["Spicy", "Warm and bold."],
];

const Home = () => {
  const { data: products = [], isLoading, isError } = useAllProducts();

  const activeProducts = products.filter((product) => product.isActive);
  const featured = activeProducts
    .filter((product) => product.isFeatured)
    .slice(0, 4);
  const trending = activeProducts
    .filter((product) => product.isTrending)
    .slice(0, 4);

  return (
    <main className="bg-[#0d0b09] text-[#f4efe7]">
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/Perfume_film_for_ELOIR_20260924123732.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-[#b89b72]">
              ÉLORIA — The Art of Oud
            </p>

            <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
              Find a fragrance
              <br />
              that feels right.
            </h1>

            <p className="mt-6 max-w-lg leading-7 text-[#d0c8bf]">
              Explore oud, amber, musk and spicy fragrances from some of the
              best-known fragrance houses.
            </p>

            <Link
              to="/shop"
              className="mt-8 inline-block bg-[#b89b72] px-8 py-3 text-sm uppercase tracking-wider text-black rounded-xl hover:bg-[#d1b78f]"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#b89b72]">
              Collection
            </p>
            <h2 className="mt-2 font-serif text-4xl">Featured</h2>
          </div>

          <Link
            to="/shop"
            className="text-sm text-[#b89b72] hover:text-[#d1b78f]"
          >
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-4/5 animate-pulse rounded-xl bg-[#181512]" />
                <div className="mt-4 h-4 w-24 animate-pulse rounded bg-[#181512]" />
                <div className="mt-3 h-5 w-32 animate-pulse rounded bg-[#181512]" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="text-sm text-red-400">Could not load products.</p>
        ) : featured.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#817970]">No featured products yet.</p>
        )}
      </section>

      <section className="border-y border-[#2d2925]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#b89b72]">
              Browse by type
            </p>
            <h2 className="mt-2 font-serif text-4xl">Fragrance Families</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ">
            {families.map(([name, description]) => (
              <Link
                key={name}
                to={`/shop?category=${name}`}
                className="border border-[#2d2925] bg-[#11100e] p-6 rounded-xl hover:border-[#b89b72]"
              >
                <h3 className="font-serif text-3xl">{name}</h3>
                <p className="mt-2 text-sm text-[#817970]">{description}</p>
                <span className="mt-5 inline-block text-sm text-[#b89b72]">
                  Browse →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#b89b72]">
              Popular
            </p>
            <h2 className="mt-2 font-serif text-4xl">Trending</h2>
          </div>

          <Link
            to="/shop"
            className="text-sm text-[#b89b72] hover:text-[#d1b78f]"
          >
            Shop all →
          </Link>
        </div>

        {trending.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#817970]">No trending products yet.</p>
        )}
      </section>

      <section className="border-t border-[#2d2925] px-6 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#b89b72]">
          ÉLORIA
        </p>

        <h2 className="mt-3 font-serif text-4xl">
          Explore your next fragrance.
        </h2>

        <Link
          to="/shop"
          className="mt-6 inline-block bg-[#b89b72] px-6 py-3 text-sm uppercase tracking-wider text-black rounded-xl hover:bg-[#d1b78f]"
        >
          Explore Collection
        </Link>
      </section>
    </main>
  );
};

export default Home;
