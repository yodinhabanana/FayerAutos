"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getCartItems } from "@/services/cartService"; 
import { OrderItem } from "@/types/OrderItem"; 

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number; 
}

export default function CartDrawer({ isOpen, onClose, orderId }: CartDrawerProps) {
  const [mounted, setMounted] = useState(false);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Busca os itens do banco sempre que o carrinho abrir ou o orderId mudar
  useEffect(() => {
    if (isOpen && orderId) {
      setLoading(true);
      getCartItems(orderId)
        .then((items) => {
          setCartItems(items || []);
        })
        .catch((err) => {
          console.error("Erro ao buscar itens do carrinho:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, orderId]);

  // Trava o scroll da tela de fundo
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex justify-end h-screen w-screen overflow-hidden">
      
      {/* Fundo escuro semi-transparente */}
      <div 
        className="fixed inset-0 bg-black/60 transition-opacity" 
        onClick={onClose} 
      />

      {/* PAINEL DA SIDEBAR */}
      <div 
        className="relative flex h-full flex-col bg-white text-black shadow-2xl z-[100000]"
        style={{ width: "40vw", minWidth: "380px", maxWidth: "500px" }}
      >
        
        {/* Banner do Topo */}
        <section className="bg-[#191C24] text-white py-4 w-full shrink-0 px-6 border-b border-gray-800">
          <div className="w-full flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2.5 rounded-xl flex items-center justify-center">
                <svg style={{ width: '28px', height: '28px', display: 'block' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-[18px] font-bold tracking-tight">Meu carrinho</h1>
                <p className="text-[12px] text-gray-400">{totalItems} {totalItems === 1 ? "item" : "itens"}</p>
              </div>
            </div>

            <button onClick={onClose} className="text-gray-400 hover:text-white text-xl font-bold p-2">✕</button>
          </div>
        </section>

        {/* Área de Conteúdo Central */}
        <div className="flex-1 w-full px-6 py-8 overflow-y-auto flex flex-col">
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-[16px] font-medium text-gray-500">
              Carregando itens...
            </div>
          ) : cartItems.length === 0 ? (
            
            /* ESTADO: CARRINHO VAZIO */
            <div className="flex-1 flex flex-col items-center h-full w-full">
              <div className="flex-1 flex flex-col items-center justify-center text-center mt-12">
                <div className="w-32 h-32 bg-[#7F7F7F] rounded-full flex items-center justify-center mb-6 select-none shrink-0 shadow-sm">
                  <span className="text-white text-6xl font-normal" style={{ lineHeight: '1' }}>!</span>
                </div>
                
                <h2 className="text-[24px] font-bold text-black mb-2 tracking-tight">
                  Seu carrinho está vazio
                </h2>
                <p className="text-[15px] text-gray-400 max-w-xs leading-relaxed">
                  Continue comprando e<br />seus itens aparecerão aqui
                </p>
              </div>
              
              <div className="w-full mt-auto pt-6">
                <button 
                  onClick={onClose}
                  className="w-full bg-[#991212] hover:bg-[#800f0f] text-white font-medium py-3.5 rounded-lg text-[16px] transition-all shadow-sm tracking-wide"
                >
                  Continue comprando
                </button>
              </div>
            </div>

          ) : (
            /* ESTADO: CARRINHO COM ITENS REAIS */
            <div className="w-full flex flex-col gap-4">
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-2">Itens no carrinho</p>
              
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div>
                    {/* ATUALIZADO: Renderizando o nome do produto de forma segura */}
                    <h4 className="font-bold text-gray-800 text-[15px]">
                      {item.productName || `Produto #${item.productId}`}
                    </h4>
                    <p className="text-sm text-gray-500 mt-0.5">Qtd: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-black text-[16px]">
                    R$ {(item.unitPrice * item.quantity).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé Fixo */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50 shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[14px] font-bold text-gray-500 uppercase tracking-wider">Total</span>
              <span className="text-[22px] font-bold tracking-tight text-black">
                R$ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <button className="w-full bg-[#991212] hover:bg-[#800f0f] text-white font-medium py-3.5 rounded-lg text-md transition-all shadow-sm text-center">
              Finalizar pedido
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}