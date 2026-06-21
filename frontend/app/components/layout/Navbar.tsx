"use client";

import Link from "next/link";

export default function Navbar() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-2xl font-bold">
        FayerAutos
      </h1>

      <div className="flex gap-6">
        <Link href="/home">
          Home
        </Link>

        <Link href="/products">
          Produtos
        </Link>

        <Link href="/cart">
          Carrinho
        </Link>

        {!token && (
          <>
            <Link href="/login">
              Entrar
            </Link>

            <Link href="/register">
              Cadastrar
            </Link>
          </>
        )}

        {token && (
          <button
            onClick={() => {
              localStorage.removeItem(
                "token"
              );
              window.location.href =
                "/login";
            }}
          >
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}