"use client";

import { useState } from "react";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      alert("Por favor, preencha o nome da categoria.");
      return;
    }

    try {
      setLoading(true); 

        const response = await fetch("http://localhost:8080/api/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                categoryName: categoryName,
                description: description,
            }),
        });

      if (response.ok) {
        alert("Categoria criada com sucesso!");
        setCategoryName("");
        setDescription("");
        onClose();
      } else {
        alert("Erro ao criar a categoria no servidor.");
      }
    } catch (error) {
      console.error("Erro de conexão com a API:", error);
      alert("Não foi possível conectar com o servidor.");
    } finally {
      setLoading(false);
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

        {/* Título */}
        <h2 className="text-[32px] font-bold text-black mb-6 tracking-tight">
          Nova categoria
        </h2> 

        {/* Inputs */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Nome da Categoria */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-medium text-black">Nome da Categoria</label>
            <input
              type="text"
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none focus:border-gray-400"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-1">
            <label className="text-[16px] font-medium text-black">Descrição (Opcional)</label>
            <textarea
              rows={4}
              className="w-full bg-[#EAEAEA] border border-gray-300 rounded-lg p-2.5 text-black outline-none resize-none focus:border-gray-400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Botão de Criação */}
        <button 
          onClick={handleCreateCategory} 
          disabled={loading}
          className="w-full bg-[#B31212] hover:bg-red-700 text-white font-medium py-3.5 rounded-xl text-lg transition-all shadow-md disabled:opacity-50"
        >
          {loading ? "Criando..." : "Criar nova categoria"}
        </button>

      </div>
    </div>
  );
}