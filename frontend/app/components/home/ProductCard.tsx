"use client";

import { useState } from "react";
import { addToCart } from "@/services/cartService";
import { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  async function handleAddToCart() {
    try {
      await addToCart(
        1,
        product.id,
        quantity
      );

      alert("Produto adicionado!");
    } catch {
      alert("Erro ao adicionar produto");
    }
  }

  return (
    <div className="w-[330px] rounded-xl bg-[#ececec] p-7">

      {/* Imagem */}
      <div className="mb-6 h-[200px] w-full bg-[#d3d3d3]" />

      {/* Nome */}
      <h3 className="text-[22px] font-bold text-black">
        {product.productName}
      </h3>

      {/* Descrição */}
      <p className="mt-1 text-[18px] text-[#6b6b6b]">
        {product.description ??
          "Descrição do produto"}
      </p>

      {/* Preço */}
      <p className="mt-5 text-[28px] font-bold text-[#B31212]">
        R$ {product.price.toFixed(2)}
      </p>

      {/* Quantidade */}
      <div className="mt-4 flex items-center gap-4">

        <button
          onClick={() =>
            setQuantity((q) =>
              Math.max(1, q - 1)
            )
          }
          className="flex h-12 w-12 items-center justify-center rounded-md bg-[#cfcfcf] text-4xl leading-none"
        >
          −
        </button>

        <span className="w-8 text-center text-[24px]">
          {quantity}
        </span>

        <button
          onClick={() =>
            setQuantity((q) => q + 1)
          }
          className="flex h-12 w-12 items-center justify-center rounded-md bg-[#cfcfcf] text-4xl leading-none"
        >
          +
        </button>

      </div>

      {/* Botão */}
      <button
        onClick={handleAddToCart}
        className="mt-6 w-full rounded-lg bg-[#B31212] py-3 text-lg text-white transition hover:opacity-90"
      >
        Adicionar ao carrinho
      </button>

    </div>
  );
}