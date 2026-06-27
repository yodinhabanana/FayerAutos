"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/Product";

interface Category {
  id: number;
  categoryName: string;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onUpdate: (updatedData: any) => Promise<void>;
  onDelete: () => Promise<void>;
}

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onUpdate,
  onDelete,
}: EditProductModalProps) {
  // Inicializa os estados com os dados do produto (ou fallback se nulo)
  const [name, setName] = useState(product?.productName ?? "");
  const [price, setPrice] = useState<string | number>(product?.price ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [stockQuantity, setStockQuantity] = useState(product?.stockQuantity ?? 0);
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [category, setCategory] = useState<string | number>(product?.productCategoryId ?? "");
  
  // Ajustado para iniciar como string vazia se for null, evitando erros de input controlado
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? ""); 

  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Efeito para atualizar os campos do formulário sempre que o produto selecionado mudar
  useEffect(() => {
    if (product) {
      setName(product.productName);
      setPrice(product.price);
      setDescription(product.description ?? "");
      setStockQuantity(product.stockQuantity ?? 0);
      setBrand(product.brand ?? "");
      setCategory(product.productCategoryId ?? "");
      setImageUrl(product.imageUrl ?? ""); // Sincroniza a imagem de forma segura aqui também
    }
  }, [product]);

  // Busca as categorias apenas quando a modal for aberta
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

  const handleSave = () => {
    onUpdate({
      productName: name,
      price: Number(price), // Converte para número na hora de salvar
      description: description,
      stockQuantity: Number(stockQuantity),
      productCategoryId: category ? Number(category) : null,
      brand: brand,
      sku: product.sku,
      url: imageUrl || null, // Garante o envio correto da nova URL ou null se apagada
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-[#E5E5E5] p-10 rounded-2xl w-full max-w-[550px] shadow-lg border border-gray-300 relative">
        
        <button 
          onClick={onClose} 
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

          {/* Categoria */}
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
                    {/* Mantido com cat.categoryName para sincronizar com seu banco */}
                    {cat.categoryName}
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
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          {/* Preço */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-medium text-black">Preço (R$)</label>
            <input
              type="text"
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
              value={price ?? ""}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Estoque */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-medium text-black">Estoque</label>
            <input
              type="number"
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Descrição */}
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
          onClick={handleSave} 
          className="w-full bg-[#21B584] hover:bg-[#1a936b] text-white font-medium py-4 rounded-lg text-lg transition-all"
        >
          Salvar alterações
        </button>
        
        <button
          onClick={onDelete}
          className="w-full bg-[#1A1B21] hover:bg-[#800f0f] text-white font-medium py-4 rounded-lg text-lg transition-all mt-4"
        > 
          Deletar produto
        </button>

      </div>
    </div>
  );
}