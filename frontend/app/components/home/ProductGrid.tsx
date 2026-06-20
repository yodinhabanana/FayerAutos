"use client"
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/Product";

export default function ProductGrid() {

  const[products, setProducts] = useState<Product[]>();

  useEffect(() => {
    getProducts()
    .then((products) => setProducts(products))
    },
    []
  );
  console.log(products);

  return (
    <div className="product-grid">
      {products?.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}