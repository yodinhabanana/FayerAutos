"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { getCartItems, deleteCartItem, updateCartItemQuantity, clearCart } from "@/services/cartService"; 
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

  const fetchItems = () => {
    if (orderId) {
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
  };

  useEffect(() => {
    if (isOpen) {
      fetchItems();
    }
  }, [isOpen, orderId]);

  const handleRemoveItem = async (itemId: number) => {
    try {
      await deleteCartItem(itemId);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Não foi possível apagar o item:", err);
    }
  };

  const handleUpdateQuantity = async (item: OrderItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(item.id);
      return;
    }

    try {
      setCartItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? { ...i, quantity: newQuantity } : i))
      );
      await updateCartItemQuantity(item.id, newQuantity);
    } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
      fetchItems();
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Tem certeza que deseja esvaziar todo o seu carrinho?")) {
      try {
        await clearCart(orderId);
        setCartItems([]);
      } catch (err) {
        console.error("Erro ao esvaziar o carrinho:", err);
        alert("Não foi possível esvaziar o carrinho.");
      }
    }
  };

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

  // Seleciona a div criada no layout.tsx para isolar o escopo do modal
  const portalRoot = document.getElementById("portal-root");
  const targetContainer = portalRoot || document.body;

  return createPortal(
    <div 
      className="fixed inset-0 flex justify-end h-screen w-screen overflow-hidden"
      style={{ zIndex: 99999 }} // Forçado via CSS puro para o Tailwind v4 respeitar
    >
      {/* Fundo Escuro (Overlay) */}
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />

      {/* Lateral do Carrinho (Gaveta) */}
      <div 
        className="relative flex h-full flex-col bg-white text-black shadow-2xl"
        style={{ 
          width: "40vw", 
          minWidth: "380px", 
          maxWidth: "500px",
          zIndex: 100000 // Garante que a gaveta fique em cima do overlay escuro
        }}
      >
        
        {/* Cabeçalho do Carrinho */}
        <section className="bg-[#191C24] text-white py-4 w-full shrink-0 px-6 border-b border-gray-800">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2.5 rounded-xl flex items-center justify-center">
                <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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

        {/* Lista de Itens */}
        <div className="flex-1 w-full px-6 py-8 overflow-y-auto flex flex-col">
          {loading ? (
            <div className="flex-1 flex items-center justify-center text-[16px] font-medium text-gray-500">
              Carregando itens...
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 bg-[#7F7F7F] rounded-full flex items-center justify-center mb-6 text-white text-6xl">!</div>
              <h2 className="text-[24px] font-bold text-black mb-2">Seu carrinho está vazio</h2>
              <p className="text-[15px] text-gray-400 max-w-xs mb-6">Continue comprando e seus itens aparecerão aqui</p>
              <button onClick={onClose} className="w-full bg-[#991212] hover:bg-[#800f0f] text-white font-medium py-3.5 rounded-lg">
                Continue comprando
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Itens no carrinho</p>
                <button 
                  onClick={handleClearCart}
                  className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors p-1 rounded hover:bg-red-50"
                >
                  Esvaziar carrinho
                </button>
              </div>
              
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-bold text-gray-800 text-[15px] truncate">
                      {item.productName || `Produto #${item.productId}`}
                    </h4>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-md text-sm transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold w-6 text-center text-gray-700">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-md text-sm transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-black text-[16px]">
                      R$ {(item.unitPrice * item.quantity).toFixed(2).replace(".", ",")}
                    </span>
                    
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-600 p-1.5 transition-colors rounded-lg hover:bg-red-50"
                      title="Remover item"
                    >
                      <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé com Valores */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50 shrink-0">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[14px] font-bold text-gray-500 uppercase tracking-wider">Total</span>
              <span className="text-[22px] font-bold tracking-tight text-black">
                R$ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <button className="w-full bg-[#991212] hover:bg-[#800f0f] text-white font-medium py-3.5 rounded-lg text-md text-center">
              Finalizar pedido
            </button>
          </div>
        )}
      </div>
    </div>,
    targetContainer
  );
}