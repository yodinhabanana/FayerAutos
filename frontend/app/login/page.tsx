"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const response = await login(username, password);

      localStorage.setItem("token", response.token);

      router.push("/");
    } catch (error) {
      alert("Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-84px)] flex items-center justify-center bg-white p-4">
      {/* Card Cinza centralizado conforme a imagem */}
      <div className="bg-[#EAEAEA] p-12 rounded-none w-full max-w-[580px] min-h-[480px] flex flex-col justify-center">
        
        {/* Títulos */}
        <h1 className="text-[38px] font-bold text-black leading-tight">
          Entrar na sua conta
        </h1>
        <p className="text-[20px] text-gray-600 mt-1 mb-8">
          Acesse seu carrinho e pedidos
        </p>

        {/* Formulário */}
        <div className="flex flex-col gap-6">
          
          {/* E-mail */}
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
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#991212] hover:bg-[#800f0f] text-white font-medium py-3.5 rounded-lg text-lg transition-all mt-4 shadow-sm"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          {/* Link para cadastro */}
          <p className="text-center text-[18px] text-gray-700 mt-4">
            Não tem conta?{" "}
            <Link href="/register" className="text-[#991212] font-semibold hover:underline">
              Cadastre-se
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}