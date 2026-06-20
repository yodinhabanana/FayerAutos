import { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <div>Imagem</div>
      <h3>{product.productName}</h3>
      <p>R$ {product.price}</p>
    </div>
  );
}