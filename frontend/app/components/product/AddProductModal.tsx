"use client";

import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  // Inicializa os estados completamente vazios para um novo cadastro
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stockQuantity, setStockQuantity] = useState<number | "">("");
  const [description, setDescription] = useState("");

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Busca as categorias ao abrir a modal para alimentar o select scrollable
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!name || !price) {
      alert("Por favor, preencha ao menos o nome e o preço da peça.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: name,
          price: Number(price),
          description: description,
          stockQuantity: Number(stockQuantity || 0),
          productCategoryId: category ? Number(category) : null,
          brand: brand,
          sku: `AUTO-${Math.floor(1000 + Math.random() * 9000)}`, // Gera um SKU aleatório básico interno
        }),
      });

      if (response.ok) {
        alert("Produto criado com sucesso!");
        // Reseta todos os campos após salvar
        setName("");
        setBrand("");
        setCategory("");
        setImageUrl("");
        setPrice("");
        setStockQuantity("");
        setDescription("");
        onClose();
      } else {
        alert("Erro ao criar o produto.");
      }
    } catch (error) {
      console.error("Erro de conexão com a API:", error);
      alert("Não foi possível conectar com o servidor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-[#E5E5E5] p-10 rounded-2xl w-full max-w-[550px] shadow-lg border border-gray-300 relative">
        
        {/* Botão X para fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          ✕
        </button>

        {/* Título idêntico ao protótipo */}
        <h2 className="text-[32px] font-bold text-black mb-6 tracking-tight">
          Criar peça
        </h2> 

        {/* Grid de Inputs de Duas Colunas */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
          {/* Nome */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-medium text-black">Nome</label>
            <input
              type="text"
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black捷 outline-none focus:border-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Marca */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-medium text-black">Marca</label>
            <input
              type="text"
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          {/* Categoria (Scrollable Select) */}
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
                  {loadingCategories ? "Carregando..." : "Selecione"}
                </option>
                {categoriesList.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-black bg-white">
                    {cat.name}
                  </option>
                ))}
              </select>
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
              type="text"
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* Preço */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-medium text-black">Preço (R$)</label>
            <input
              type="number"
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
              value={price}
              onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>

          {/* Estoque */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-medium text-black">Estoque</label>
            <input
              type="number"
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>
        </div>

        {/* Descrição em campo expandido */}
        <div className="flex flex-col gap-1 mb-8">
          <label className="text-[16px] font-medium text-black">Descrição</label>
          <textarea
            rows={4}
            className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none resize-none focus:border-gray-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Botão Vermelho idêntico ao protótipo */}
        <button 
          onClick={handleCreate} 
          className="w-full bg-[#B31212] hover:bg-red-700 text-white font-medium py-3.5 rounded-xl text-lg transition-all shadow-md"
        >
          Criar novo produto
        </button>

      </div>
    </div>
  );
}