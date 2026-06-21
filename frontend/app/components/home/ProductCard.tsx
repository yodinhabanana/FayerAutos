"use client";

import { useEffect, useState } from "react";
import { addToCart } from "@/services/cartService";
import { Product } from "@/types/Product";

import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "@/types/Auth";
import Link from "next/dist/client/link";

// 1. Criamos uma interface para tipar a sua categoria (ajuste as propriedades conforme sua API)
interface Category {
  id: number; // ou string, dependendo da sua API
  name: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState<MyJwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser(jwtDecode<MyJwtPayload>(token));
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(product.productName);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description ?? "");
  const [stockQuantity, setStockQuantity] = useState(product.stockQuantity ?? 0);

  const [brand, setBrand] = useState(product.brand ?? "");
  const [category, setCategory] = useState(product.productCategoryId ?? "");
  const [imageUrl, setImageUrl] = useState(""); 

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    if (open) {
      async function fetchCategories() {
        try {
          setLoadingCategories(true);
          const response = await fetch("http://localhost:8080/api/categories");
          if (response.ok) {
            const data = await response.json();
            setCategoriesList(data);
          }
        } catch (error) {
          console.error("Erro ao buscar categorias:", error);
        } finally {
          setLoadingCategories(false);
        }
      }

      fetchCategories();
    }
  }, [open]);

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

  async function handleUpdateProduct() {
    try {
      await fetch(`http://localhost:8080/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: name,
          price: Number(price),
          description: description,
          stockQuantity: stockQuantity,
          productCategoryId: category, // Envia o ID selecionado no scrollable
          brand: brand,
          sku: product.sku,
        }),
      });

      alert("Produto atualizado!");
      setOpen(false);
    } catch (err) {
      alert("Erro ao atualizar produto");
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

      {/* Preço */}
      <p className="mt-5 text-[28px] font-bold text-[#B31212]">
        R$ {product.price.toFixed(2)}
      </p>

      {/* Quantidade */}
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="flex h-12 w-12 items-center justify-center rounded-md bg-[#cfcfcf] text-4xl leading-none"
        >
          −
        </button>

        <span className="w-8 text-center text-[24px]">
          {quantity}
        </span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
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

      {user?.role === 1 && (
        <button className="bg-white px-10 py-2 rounded align-self-center mt-4 border border-gray-300 hover:bg-gray-100 w-full" onClick={() => setOpen(true)}>
          Alterar produto
        </button>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-[#E5E5E5] p-10 rounded-2xl w-full max-w-[550px] shadow-lg border border-gray-300 relative">
            
            <button 
              onClick={() => setOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold"
            >
              ✕
            </button>

            <h2 className="text-[28px] font-bold text-black mb-6">
              Editar peça
            </h2> 

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
              
              {/* Nome */}
              <div className="flex flex-col gap-1">
                <label className="text-[16px] font-medium text-black">Nome</label>
                <input
                  className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Marca */}
              <div className="flex flex-col gap-1">
                <label className="text-[16px] font-medium text-black">Marca</label>
                <input
                  className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              {/* Categoria - Corrigido para garantir a leitura do texto */}
              <div className="flex flex-col gap-1">
                <label className="text-[16px] font-medium text-black">Categoria</label>
                <div className="relative">
                  <select
                    className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400 cursor-pointer appearance-none pr-10"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    disabled={loadingCategories}
                  >
                    <option value="" className="text-black bg-white">
                      {loadingCategories ? "Carregando..." : "Selecione uma categoria"}
                    </option>
                    
                    {categoriesList.map((cat) => (
                      <option key={cat.id} value={cat.id} className="text-black bg-white">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  
                  {/* Ícone de seta customizado para o select já que usamos 'appearance-none' */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Imagem URL */}
              <div className="flex flex-col gap-1">
                <label className="text-[16px] font-medium text-black">Imagem (URL)</label>
                <input
                  className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              {/* Preço */}
              <div className="flex flex-col gap-1">
                <label className="text-[16px] font-medium text-black">Preço (R$)</label>
                <input
                  className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
                  value={price ?? 0}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              {/* Estoque */}
              <div className="flex flex-col gap-1">
                <label className="text-[16px] font-medium text-black">Estoque</label>
                <input
                  className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                />
              </div>

            </div>

            <div className="flex flex-col gap-1 mb-8">
              <label className="text-[16px] font-medium text-black">Descrição</label>
              <textarea
                rows={4}
                className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none resize-none focus:border-gray-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button 
              onClick={handleUpdateProduct} 
              className="w-full bg-[#991212] hover:bg-[#800f0f] text-white font-medium py-3 rounded-lg text-lg transition-all"
            >
              Salvar alterações
            </button>

          </div>
        </div>
      )}
      
    </div>
  );
}