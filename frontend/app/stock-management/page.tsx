"use client";

import { useEffect, useState } from "react";
import Header from "@/components/stock-management/Header";
import { getProducts } from "@/services/productService";
import { Product } from "@/types/Product";
import AlterProduct from "@/components/product/EditProductModal";
import AddProductModal from "@/components/product/AddProductModal";
import AddCategoryModal from "@/components/category/AddCategoryModal"; // Importação da nova modal

export default function StockManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // Estado para a nova modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts().then((data) => setProducts(data || []));
  }, []);

  // Cálculos dinâmicos baseados no array de produtos vindo da API
  const totalItems = products.length;
  const totalStockValue = products.reduce((acc, p) => acc + (p.price * (p.stockQuantity || 0)), 0);
  const lowStockItems = products.filter(p => (p.stockQuantity || 0) < 5).length;

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  async function handleDeleteProduct(id: number) {
    if (confirm("Deseja realmente ocultar/deletar este produto?")) {
      try {
        await fetch(`http://localhost:8080/api/products/deleteLogic/${id}`, {
          method: "PUT",
        });
        alert("Produto deletedo com sucesso!");
        setProducts(prev => prev.filter(p => p.id !== id));
        setIsEditModalOpen(false);
      } catch (err) {
        alert("Erro ao deletar produto!");
      }
    }
  }

  async function handleUpdateProduct(updatedBody: any) {
    if (!selectedProduct) return;
    try {
      await fetch(`http://localhost:8080/api/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBody),
      });
      alert("Produto atualizado!");
      setIsEditModalOpen(false);
      // Atualiza o estado local para refletir na lista
      getProducts().then((data) => setProducts(data || []));
    } catch (err) {
      alert("Erro ao atualizar produto");
    }
  }

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <Header />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* ==================== TITULO + BOTÕES DE AÇÃO ==================== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-black">Gestão de estoque</h1>
            <p className="text-gray-500 text-sm mt-1">Cadastre, edite e gerencie a disponibilidade das peças.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setIsCategoryModalOpen(true)}
              className="bg-[#1A1B21] hover:bg-gray-700 text-white font-medium px-6 py-2.5 rounded-md transition-all shadow-sm border border-gray-700 whitespace-nowrap text-sm sm:text-base">
              Nova categoria
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#B31212] hover:bg-red-700 text-white font-medium px-8 py-2.5 rounded-md transition-all shadow-sm whitespace-nowrap text-sm sm:text-base"
            >
              Novo produto
            </button>
          </div>
        </div>

        {/* COMPONENTE DE MÉTRICAS / CARDS TOP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#EAEAEA] p-5 rounded-lg border border-gray-200">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Itens Cadastrados</span>
            <p className="text-3xl font-bold mt-2 text-black">{totalItems}</p>
          </div>
          <div className="bg-[#EAEAEA] p-5 rounded-lg border border-gray-200">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Valor de Estoque</span>
            <p className="text-3xl font-bold mt-2 text-black">R$ {totalStockValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-[#EAEAEA] p-5 rounded-lg border border-gray-200">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estoque Baixo</span>
            <p className="text-3xl font-bold mt-2 text-black">{lowStockItems}</p>
          </div>
        </div>

        {/* TABELA DE PRODUTOS */}
        <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {/* Header da Tabela */}
          <div className="grid grid-cols-12 gap-4 bg-white px-6 py-4 border-b border-gray-200 text-gray-500 font-bold text-xs uppercase tracking-wider text-center md:text-left">
            <div className="col-span-5 md:col-span-4">Peça</div>
            <div className="col-span-2 hidden md:block text-center">Categoria</div>
            <div className="col-span-2 text-center">Marca</div>
            <div className="col-span-2 text-center">Preço</div>
            <div className="col-span-1 text-center">Estoque</div>
            <div className="col-span-2 md:col-span-1 text-center">Ações</div>
          </div>

          {/* Corpo / Linhas de Peças */}
          <div className="divide-y divide-gray-100">
            {products.map((product) => (
              <div key={product.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center bg-[#F4F4F4] my-2 rounded-lg mx-2 border border-gray-200 text-center md:text-left text-sm font-medium text-gray-900">
                
                {/* Imagem + Nome */}
                <div className="col-span-5 md:col-span-4 flex items-center gap-4 text-left">
                  <div className="w-12 h-12 bg-white rounded-md flex-shrink-0 border border-gray-200" />
                  <span className="font-semibold text-black truncate">{product.productName}</span>
                </div>

                {/* Categoria */}
                <div className="col-span-2 hidden md:flex justify-center">
                  <span className="bg-[#D3D3D3] text-gray-700 text-xs px-3 py-1 rounded-full font-medium">
                    {product.productCategoryId || "Peça"}
                  </span>
                </div>

                {/* Marca */}
                <div className="col-span-2 text-center text-gray-700">{product.brand || "—"}</div>

                {/* Preço */}
                <div className="col-span-2 text-center text-black font-semibold">
                  R$ {product.price.toFixed(2)}
                </div>

                {/* Estoque */}
                <div className="col-span-1 text-center text-gray-800 font-medium">{product.stockQuantity ?? 0}</div>

                {/* Ícones de Ações */}
                <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-3">
                  <button 
                    onClick={() => handleOpenEdit(product)}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    title="Editar produto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    title="Deletar produto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

              </div>
            ))}

            {products.length === 0 && (
              <p className="text-center py-8 text-gray-500">Nenhum produto cadastrado no momento.</p>
            )}
          </div>
        </div>
      </div>
      {/* MODAL GLOBAL DE EDIÇÃO */}
      {selectedProduct && (
        <AlterProduct 
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={selectedProduct}
          onUpdate={handleUpdateProduct}
          onDelete={() => handleDeleteProduct(selectedProduct.id)}
        />
      )}

      {/* MODAL DE ADICIONAR NOVO PRODUTO */}
      <AddProductModal 
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          getProducts().then((data) => setProducts(data || []));
        }}
      />

      {/* MODAL DE ADICIONAR NOVA CATEGORIA */}
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />
    </main>
  );
}