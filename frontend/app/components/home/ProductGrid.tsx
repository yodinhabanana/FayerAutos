import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const products = [
    { id: 1, productName: "Pastilha", price: 89.9 },
    { id: 2, productName: "Disco", price: 120 },
  ];

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}