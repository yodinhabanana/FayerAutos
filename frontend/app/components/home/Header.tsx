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
    <header className="bg-[#111827] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <button className="text-2xl">☰</button>

        <Link href="/">
          <Image src="/logo2.png" alt="FayerAutos" width={150} height={50} />
        </Link>

        <input
          type="text"
          placeholder="O que você procura?"
          className="flex-1 rounded-full px-5 py-3 text-black bg-white"
        />

        <Link href="/cart">
          <button>🛒</button>
        </Link>

        {/* NÃO LOGADO */}
        {!user ? (
          <div className="flex items-center gap-4">
            <Link href="/login">Entrar</Link>

            <Link
              href="/register"
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Cadastrar
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* ADMIN BUTTON */}
            {user.role === 1 && (
              <button className="bg-blue-600 px-4 py-2 rounded">
                <Link href="/alterar-pecas">
                  Alterar peças
                </Link>
              </button>
            )}

            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded"
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "#ef4444")
              }
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}