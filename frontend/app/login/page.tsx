"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/authService";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const response = await login(
        username,
        password
      );

      localStorage.setItem(
        "token",
        response.token
      );

      router.push("/");
    } catch (error) {
      alert("Usuário ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Entrar
        </h1>

        <div className="flex flex-col gap-4">
          <input
            className="border p-3 rounded"
            placeholder="Usuário"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            className="border p-3 rounded"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-red-600 text-white p-3 rounded hover:bg-red-700"
          >
            {loading
              ? "Entrando..."
              : "Entrar"}
          </button>
        </div>
      </div>
    </main>
  );
}