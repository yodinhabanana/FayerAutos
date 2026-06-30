"use client";

import { useEffect, useState } from "react";
import { addToCart } from "@/services/cartService";
import { Product } from "@/types/Product";

import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "@/types/Auth";
import Link from "next/dist/client/link";
import AlterProduct from "@/components/product/EditProductModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState<MyJwtPayload | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode<MyJwtPayload>(token));
    }
  }, []);

  async function handleAddToCart() {
    try {
      await addToCart(1, product.id, quantity);
      alert("Produto adicionado!");
    } catch {
      alert("Erro ao adicionar produto");
    }
  }

  async function handleDeleteProduct() {
    try {
      await fetch(`http://localhost:8080/api/products/deleteLogic/${product.id}`, {
        method: "PUT",
      });
      alert("Produto deletado!");
      setOpen(false);
    } catch (err) {
      alert("Erro ao deletar pedido!");
    }
  }

  async function handleUpdateProduct(updatedBody: any) {
    try {
      await fetch(`http://localhost:8080/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBody),
      });

      alert("Produto updated!");
      setOpen(false);
    } catch (err) {
      alert("Erro ao atualizar produto");
    }
  }

  return (
    <div 
      className={`w-full max-w-[330px] rounded-xl bg-[#ececec] p-7 flex flex-col justify-between shadow-sm transition-all ${
        user?.role === 1 ? "h-[580px]" : "h-[520px]"
      }`}
    >
      
      {/* Container Superior */}
      <div>
        {/* Imagem */}
        {/* Bloco da Imagem */}
      <div className="w-full h-48 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center relative">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.productName} 
            className="w-full h-full object-cover" 
          />
        ) : (
          // Imagem padrão caso o produto não tenha nenhuma cadastrada
          <span className="text-gray-400 text-xs">Sem imagem</span>
        )}
      </div>

        {/* Nome */}
        <div className="min-h-[56px] flex items-start">
          <h3 className="text-[22px] font-bold text-black leading-tight line-clamp-2">
            {product.productName}
          </h3>
        </div>

        {/* Preço */}
        <p className="mt-5 text-[28px] font-bold text-[#B31212]">
          R$ {product.price.toFixed(2)}
        </p>
      </div>

      {/* Container Inferior */}
      <div className="mt-auto">
        {/* Quantidade */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-12 w-12 items-center justify-center rounded-md bg-[#cfcfcf] text-4xl leading-none text-black"
          >
            −
          </button>

          <span className="w-8 text-center text-[24px] text-black">
            {quantity}
          </span>

          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-12 w-12 items-center justify-center rounded-md bg-[#cfcfcf] text-4xl leading-none text-black"
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
        
        {/* Admin */}
        {user?.role === 1 && (
          <div className="mt-4">
            <button 
              className="bg-white px-10 py-2 rounded align-self-center border border-gray-300 hover:bg-gray-100 w-full text-black font-medium text-sm transition-colors" 
              onClick={() => setOpen(true)}
            >
              Alterar produto
            </button>
              
            <AlterProduct 
              isOpen={open}
              onClose={() => setOpen(false)}
              product={product}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        )}
      </div>
      
    </div>
  );
}