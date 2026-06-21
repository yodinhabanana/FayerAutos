"use client";

import Image from "next/image";
import Link from "next/link";

import {useEffect, useState} from "react";

export default function Header() {

  const [logged, setLogged] =
      useState(false);

    useEffect(() => {
      const token =
        localStorage.getItem("token");

      setLogged(!!token);
    }, []);

    function logout() {
      localStorage.removeItem("token");
      window.location.reload();
    }


  return (

    <header className="bg-[#111827] text-white">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
        <button className="text-2xl">
          ☰
        </button>

        <Link href="/">
          <Image
            src="/logo2.png"
            alt="FayerAutos"
            width={150}
            height={50}
          />
        </Link>

        <input
          type="text"
          placeholder="O que você procura?"
          className="flex-1 rounded-full px-5 py-3 text-black bg-white"
        />

        <Link href="/cart">
          <button className="hover:scale-110 transition">
            🛒
          </button>
        </Link>

        {!logged ? (
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hover:text-red-500"
            >
              Entrar
            </Link>

            <Link
              href="/register"
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Cadastrar
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}