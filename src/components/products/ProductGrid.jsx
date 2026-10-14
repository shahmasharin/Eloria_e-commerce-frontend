import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (!products.length) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-2xl text-[#d8cec2]">
          No fragrances found
        </p>

        <p className="mt-3 text-sm text-[#817970]">
          Try changing your search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;