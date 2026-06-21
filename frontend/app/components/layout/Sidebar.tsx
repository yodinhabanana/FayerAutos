"use client";

import Link from "next/link";
import { MyJwtPayload } from "@/types/Auth";
import Image from "next/image";

// Definimos o que a Sidebar precisa receber do componente Pai
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: MyJwtPayload | null;
}

export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  // Se não estiver aberto, não renderiza nada na tela
  if (!isOpen) return null;

    function setOpen(arg0: boolean): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Fundo escuro semi-transparente */}
      <div 
        className="fixed inset-0 bg-black/60 transition-opacity" 
        onClick={onClose} 
      />

      {/* Painel do Menu Lateral */}
      <div className="relative flex w-full max-w-xs flex-col bg-[#1A1B21] p-6 text-white shadow-2xl border-r border-gray-800 h-full">
        {/* Botão de fechar */}
        <div className="flex items-center justify-between mb-8">
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
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl font-bold p-2"
          >
            ✕
          </button>
        </div>


        {/* Links do Menu */}
        <nav className="flex flex-col gap-5 text-lg font-medium">
          <Link href="/" onClick={onClose} className="hover:text-red-500 transition-colors py-2 border-b border-gray-800/50">
            Início
          </Link>
          <Link href="/produtos" onClick={onClose} className="hover:text-red-500 transition-colors py-2 border-b border-gray-800/50">
            Veículos / Peças
          </Link>
          <Link href="/sobre" onClick={onClose} className="hover:text-red-500 transition-colors py-2 border-b border-gray-800/50">
            Sobre Nós
          </Link>
          <Link href="/contato" onClick={onClose} className="hover:text-red-500 transition-colors py-2 border-b border-gray-800/50">
            Contato
          </Link>

            {user?.role === 1 && (
                <>
                <Link href="/stock-management" onClick={onClose} className="hover:text-red-500 transition-colors py-2 border-b border-gray-800/50">
                    Gestão de estoque
                </Link>
                </>
            )}
                
        </nav>

        {/* Rodapé do menu lateral */}
        <div className="mt-auto pt-6 border-t border-gray-800 text-sm text-gray-400">
          {user ? (
            <p>Logado como: <span className="text-white font-medium">{user.username || "Usuário"}</span></p>
          ) : (
            <p>Bem-vindo à FayerAutos!</p>
          )}
        </div>
      </div>
    </div>
  );
}