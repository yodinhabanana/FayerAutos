"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import OrderItemsGrid from "@/components/cart/OrderItemsGrid";
import Footer from "@/components/home/Footer";
import Header from "@/components/cart/Header";
import Image from "next/image";

// Interface auxiliar para os itens do carrinho (ajuste conforme seu tipo real)
interface CartItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  // Estados para simular a reatividade dos dados vindos da API
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Exemplo de integração: calcular o total e a quantidade total de itens de forma dinâmica
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    // Simulando a busca dos dados do carrinho para definir se está vazio ou não
    // Quando integrar com o back-end, preencha o estado 'cartItems' com o array real
    async function fetchCartData() {
      try {
        setLoading(false);
        // Exemplo fictício para iniciar com itens:
        // setCartItems([{ id: 1, productName: "Nome", price: 100, quantity: 1 }]);
      } catch (error) {
        console.error("Erro ao buscar dados do carrinho:", error);
        setLoading(false);
      }
    }
    fetchCartData();
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col justify-between min-h-screen bg-white text-black">
        <Header />
        <div className="flex-1 flex items-center justify-center text-xl font-medium">
          Carregando carrinho...
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="flex flex-col justify-between min-h-screen bg-white text-black">

     {/* 2. Banner Escuro de Sub-Header do Carrinho - COMPLETO E DISTRIBUÍDO DE PONTA A PONTA */}
      <section className="bg-[#191C24] text-white py-5 w-full border-b border-gray-800">
        <div className="w-full px-4 md:px-8 flex items-center justify-between gap-6">
          
           {/* BLOCO DA DIREITA: Botão Voltar colado no canto direito */}
          <div className="shrink-0">
            <Link href="/">
              <button className="hover:bg-red-700 text-white font-medium px-6 py-2 rounded text-[16px] transition-all shadow-sm">
                Voltar
              </button>
            </Link>
          </div>

          {/* BLOCO DO MEIO: Título do Carrinho + Contador e o Totalizador */}
          <div className="flex-1 flex items-center justify-center gap-12">
            
            {/* Título e Ícone */}
            <div className="flex items-center gap-4">
              {/* Ícone de Carrinho Branco */}
              <div className="bg-white/10 p-2.5 rounded-xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-[22px] font-bold tracking-tight">Meu carrinho</h1>
                <p className="text-[14px] text-gray-400">{totalItems} {totalItems === 1 ? "item" : "itens"}</p>
              </div>
            </div>

            {/* Bloco do Valor Total */}
            <div className="text-left border-l border-gray-700 pl-8">
              <span className="text-[12px] font-bold text-gray-400 tracking-wider block uppercase">Total</span>
              <span className="text-[26px] font-bold tracking-tight">
                R$ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Área de Conteúdo Central Reativa */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 flex flex-col justify-center">
        
        {cartItems.length === 0 ? (
          /* ESTADO: CARRINHO VAZIO (Baseado na imagem IE_CarrinhoVazio.png) */
          <div className="flex flex-col items-center text-center animate-fade-in">
            {/* Ícone de Exclamação/Alerta Cinza Redondo */}
            <div className="w-32 h-32 bg-[#7F7F7F] rounded-full flex items-center justify-center text-white text-6xl font-bold mb-8">
              !
            </div>
            
            <h2 className="text-[26px] font-bold text-black mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-[18px] text-gray-500 max-w-sm leading-relaxed mb-8">
              Continue comprando e seus itens aparecerão aqui
            </p>

            <Link href="/">
              <button className="bg-[#991212] hover:bg-[#800f0f] text-white font-medium px-12 py-3.5 rounded-lg text-[16px] transition-all shadow-sm">
                Continue comprando
              </button>
            </Link>
          </div>
        ) : (
          /* ESTADO: CARRINHO COM ITENS (Baseado na imagem I_Carrinho.png) */
          <div className="w-full flex flex-col items-center">
            {/* O seu Grid/Lista renderiza os cards estruturados em cinza */}
            <div className="w-full mb-8">
              <OrderItemsGrid orderId={1} />
            </div>

            {/* Botão para Finalizar Pedido centralizado abaixo da lista */}
            <button className="bg-[#991212] hover:bg-[#800f0f] text-white font-medium px-16 py-3.5 rounded-lg text-lg transition-all shadow-sm">
              Finalizar pedido
            </button>
          </div>
        )}

      </div>

      {/* 4. Rodapé */}
      <Footer />
    </main>
  );
}