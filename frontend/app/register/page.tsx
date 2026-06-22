"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/global/NoSearchHeader";
import Footer from "@/components/global/Footer";
import { isValidUsername, isRightEmail } from "@/utils/validator";
import { register } from "@/services/authService";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [document, setDocument] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    try {
      if (!isValidUsername(username)) {
        alert("Username inválido");
        return;
      }

      if (!isRightEmail(email)) {
        alert("E-mail inválido!");
        return;
      }

      setLoading(true);

      const response = await register({
        fullName,
        birthDate,
        email,
        document,
        gender,
        username,
        password
      });

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
      {/* Header no topo */}
      <Header />

      {/* Container Centralizado para dar o espaçamento externo igual ao da imagem */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 bg-white">
        
        {/* Card Cinza de Cadastro */}
        <div className="w-full max-w-[850px] bg-[#EEEEEE] rounded-lg p-10 shadow-sm">
          
          {/* Títulos */}
          <h1 className="text-[32px] font-bold text-black mb-1">Criar conta</h1>
          <p className="text-[16px] text-gray-500 mb-8">Cadastre-se para começar suas compras</p>

          {/* Grid dos Campos */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            
            {/* NOME COMPLETO */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
                Nome Completo
              </label>
              <input
                className="bg-white border border-gray-200 rounded-md p-2.5 text-black focus:outline-none focus:border-gray-400 w-full"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* CPF */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
                CPF
              </label>
              <input
                className="bg-white border border-gray-200 rounded-md p-2.5 text-black focus:outline-none focus:border-gray-400 w-full"
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
            </div>

            {/* E-MAIL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
                E-mail
              </label>
              <input
                className="bg-white border border-gray-200 rounded-md p-2.5 text-black focus:outline-none focus:border-gray-400 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* DATA NASCIMENTO */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
                Data de Nascimento
              </label>
              <input
                className="bg-white border border-gray-200 rounded-md p-2.5 text-black focus:outline-none focus:border-gray-400 w-full"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            {/* USERNAME */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
                Username
              </label>
              <input
                className="bg-white border border-gray-200 rounded-md p-2.5 text-black focus:outline-none focus:border-gray-400 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* SENHA */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
                Senha
              </label>
              <input
                type="password"
                className="bg-white border border-gray-200 rounded-md p-2.5 text-black focus:outline-none focus:border-gray-400 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* GÊNERO (Alinhado à esquerda e menor) */}
            <div className="flex flex-col gap-1.5 col-span-2 w-[35%]">
              <label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
                Gênero
              </label>
              <input
                className="bg-white border border-gray-200 rounded-md p-2.5 text-black focus:outline-none focus:border-gray-400 w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            {/* BOTÃO CENTRALIZADO */}
            <div className="col-span-2 flex flex-col items-center mt-6 gap-3">
              <button
                onClick={handleRegister}
                disabled={loading}
                className="bg-[#A61414] hover:bg-[#8a1010] text-white text-[14px] font-medium py-3 rounded-md w-[60%] shadow-sm transition-colors"
              >
                {loading ? "Criando conta..." : "Criar conta"}
              </button>

              {/* Link para o Login */}
              <p className="text-[14px] text-gray-600">
                Já tem conta?{" "}
                <Link href="/login" className="text-[#A61414] font-bold hover:underline">
                  Faça login
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}