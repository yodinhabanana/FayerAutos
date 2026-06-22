"use client"
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/Product";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    getProducts().then((products) => setProducts(products))
  }, []);

  return (
    // Container principal centralizado e com espaçamento interno nas laterais (px-6) e vertical (py-12)
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-x-8 gap-y-12 justify-items-center">
        {products?.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}