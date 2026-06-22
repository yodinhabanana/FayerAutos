"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";
import Link from "next/link";
import Header from "@/components/global/NoSearchHeader";
import Footer from "@/components/global/Footer";

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
    <main className="min-h-screen flex flex-col bg-white text-black">
      <Header />

      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="bg-[#EAEAEA] p-12 rounded-none w-full max-w-[580px] min-h-[480px] flex flex-col justify-center shadow-sm">
          <h1 className="text-[38px] font-bold text-black leading-tight">
            Entrar na sua conta
          </h1>

          <p className="text-[20px] text-gray-600 mt-1 mb-8">
            Acesse seu carrinho e pedidos
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-500 tracking-wide">
                USERNAME
              </label>

              <input
                className="w-full bg-white border border-gray-300 rounded-md p-3.5 text-black outline-none focus:border-gray-400 text-lg shadow-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-gray-500 tracking-wide">
                SENHA
              </label>

              <input
                className="w-full bg-white border border-gray-300 rounded-md p-3.5 text-black outline-none focus:border-gray-400 text-lg shadow-sm"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#991212] hover:bg-[#800f0f] text-white font-medium py-3.5 rounded-lg text-lg transition-all mt-4 shadow-sm"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>

            <p className="text-center text-[18px] text-gray-700 mt-4">
              Não tem conta?{" "}
              <Link
                href="/register"
                className="text-[#991212] font-semibold hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}