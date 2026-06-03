// src/app/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <main>
      <h1>FayerAutos</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.productName}</h3>
          <p>R$ {product.price}</p>
        </div>
      ))}
    </main>
  );
}