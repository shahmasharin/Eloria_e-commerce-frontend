import WishlistItem from "./WishlistItem";

const WishlistGrid = ({
  products,
  onRemove,
  onMoveToCart,
}) => {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <WishlistItem
          key={product.id}
          product={product}
          onRemove={() => onRemove(product.id)}
          onMoveToCart={() => onMoveToCart(product)}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;