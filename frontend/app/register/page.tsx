"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/cart/Header";
import Footer from "@/components/home/Footer";
// Certifique-se de que a função register está importada corretamente do seu serviço
// import { register } from "@/services/authService"; 

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    try {
      setLoading(true);

      const response = await register(username, password);

      localStorage.setItem("token", response.token);

      router.push("/");
    } catch (error) {
      alert("Erro ao registrar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-white text-black">
      {/* 1. Header do Carrinho inclusa no topo */}
      <Header />

      {/* 2. Área central para o formulário de cadastro */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        
        {/* Card Cinza centralizado conforme a imagem */}
        <div className="bg-[#EAEAEA] p-12 rounded-none w-full max-w-[580px] min-h-[480px] flex flex-col justify-center shadow-sm">
          
          {/* Títulos */}
          <h1 className="text-[38px] font-bold text-black leading-tight">
            Cadastre-se para começar
          </h1>
          <p className="text-[20px] text-gray-600 mt-1 mb-8">
            Faça parte da nossa comunidade e aproveite todos os benefícios
          </p>

          {/* Formulário */}
          <div className="flex flex-col gap-6">
            
            {/* E-mail / Username */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-500 tracking-wide">
                USERNAME
              </label>
              <input
                className="w-full bg-white border border-gray-300 rounded-md p-3.5 text-black outline-none focus:border-gray-400 text-lg shadow-sm"
                placeholder=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-500 tracking-wide">
                SENHA
              </label>
              <input
                className="w-full bg-white border border-gray-300 rounded-md p-3.5 text-black outline-none focus:border-gray-400 text-lg shadow-sm"
                type="password"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Botão de envio vermelho escuro */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-[#991212] hover:bg-[#800f0f] text-white font-medium py-3.5 rounded-lg text-lg transition-all mt-4 shadow-sm"
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>

            {/* Link para Login */}
            <p className="text-center text-[18px] text-gray-700 mt-4">
              Já tem conta?{" "}
              <Link href="/login" className="text-[#991212] font-semibold hover:underline">
                Faça login
              </Link>
            </p>


          </div>

        </div>
      </div>

       <Footer />
       
    </main>
  );
}