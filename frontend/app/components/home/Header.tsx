"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "@/types/Auth";
import Sidebar from "../layout/Sidebar";
import CartDrawer from "@/components/cart/CartDrawer"; 
import { getCartItems } from "@/services/cartService"; // Importando o serviço

export default function Header() {
  const [user, setUser] = useState<MyJwtPayload | null>(null);
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); 

  // ID temporário do pedido (mude para user?.orderId ou similar no futuro)
  const currentOrderId = 1;

  // Função para buscar a quantidade atualizada de itens do backend
  const fetchCartCount = () => {
    if (currentOrderId) {
      getCartItems(currentOrderId)
        .then((items) => {
          if (items) {
            // Soma todas as quantidades de itens no carrinho
            const total = items.reduce((acc, item) => acc + item.quantity, 0);
            setCartCount(total);
          } else {
            setCartCount(0);
          }
        })
        .catch((err) => {
          console.error("Erro ao buscar contagem do carrinho no Header:", err);
        });
    }
  };

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    const token = rawToken?.replace("Bearer ", "");

    if (token && token.split(".").length === 3) {
      setUser(jwtDecode<MyJwtPayload>(token));
    }
  }, []);

  // Busca a quantidade inicial de itens assim que o componente carrega
  useEffect(() => {
    fetchCartCount();
  }, []);

  // Toda vez que a gaveta do carrinho fechar, atualiza a bolinha do Header
  useEffect(() => {
    if (!cartOpen) {
      fetchCartCount();
    }
  }, [cartOpen]);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  }

  return (
    <header className="bg-[#1A1B21] text-white w-full border-b border-gray-800">
      <div className="w-full px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-12">
        
        {/* BLOCO DA ESQUERDA: Menu Hambúrguer + Logo FayerAutos */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          <button className="text-xl w-10 h-10 flex items-center justify-center rounded-md hover:bg-red-700 transition-all text-white font-bold" onClick={() => setOpen(true)}>
            ☰
          </button>
          
          <Sidebar 
            isOpen={open} 
            onClose={() => setOpen(false)}
            user={user}  
          />
        
          <Link href="/" className="block">
            <Image 
              src="/logo3.png" 
              alt="FayerAutos" 
              width={145} 
              height={45} 
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* BLOCO DO MEIO: Barra de Busca Centralizada */}
        <div className="flex-1 max-w-3xl relative">
          <input
            type="text"
            placeholder="O que você procura?"
            className="w-full rounded-full pl-6 pr-12 py-2.5 text-black bg-white outline-none placeholder-gray-500 text-[15px] font-normal"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>

        {/* BLOCO DA DIREITA: Carrinho + Botões */}
        <div className="flex items-center gap-6 md:gap-8 shrink-0 justify-end">
          
          {/* BOTÃO DO CARRINHO */}
          <button 
            onClick={() => setCartOpen(true)} 
            className="text-white hover:text-gray-300 transition-colors relative p-1"
          >
            {/* Ícone original do carrinho */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            
            {/* Bolinha vermelha perfeitamente posicionada sobre o ícone do cabeçalho */}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B31212] text-white text-[10px] font-bold rounded-full h-4.5 min-w-[18px] px-1 flex items-center justify-center border border-[#1A1B21] select-none">
                {cartCount}
              </span>
            )}
          </button>

          {/* ÁREA DE AUTENTICAÇÃO DINÂMICA */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="bg-[#B31212] px-6 py-2 rounded text-white text-[14px] font-medium hover:bg-red-700 transition-all shadow-sm"
              >
                Entrar
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={logout}
                className="bg-[#B31212] px-4 py-2 rounded text-[14px] font-medium hover:bg-red-700 transition-all text-white shadow-sm"
              >
                Sair
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Componente CartDrawer para a sidebar do carrinho */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        orderId={currentOrderId} 
      />
    </header>
  );
}