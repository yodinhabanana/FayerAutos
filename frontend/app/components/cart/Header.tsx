"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "@/types/Auth";

export default function Header() {
  const [user, setUser] = useState<MyJwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser(jwtDecode<MyJwtPayload>(token));
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  }

  return (
    <header className="bg-[#111827] text-white w-full border-b border-gray-800">
      {/* Container fluido que ocupa toda a tela de ponta a ponta com espaçamento lateral */}
      <div className="w-full px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-12">
        
        {/* BLOCO DA ESQUERDA: Menu Hambúrguer + Logo FayerAutos */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          <button className="text-xl bg-[#B31212] w-10 h-10 flex items-center justify-center rounded-md hover:bg-red-700 transition-all text-white font-bold">
            ☰
          </button>

          <Link href="/" className="block">
            <Image 
              src="/logo2.png" 
              alt="FayerAutos" 
              width={145} 
              height={45} 
              className="object-contain"
              priority
            />
          </Link>
        </div>
        


        {/* BLOCO DA DIREITA: Carrinho de compras + Botão Entrar/Cadastrar */}
        <div className="flex items-center gap-6 md:gap-8 shrink-0 justify-end">
          {/* Carrinho de compras minimalista em SVG igual ao e-commerce moderno */}
          <Link href="/cart" className="text-white hover:text-gray-300 transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </Link>

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
              {user.role === 1 && (
                <Link 
                  href="/stock-management"
                  className="bg-blue-600 px-4 py-2 rounded text-[14px] font-medium hover:bg-blue-700 transition-all text-white shadow-sm"
                >
                  Gestão
                </Link>
              )}

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
    </header>
  );
}