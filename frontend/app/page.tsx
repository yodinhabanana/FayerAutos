"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Header from "@/components/home/Header";
import CategoryBar from "@/components/home/CategoryBar";
import HeroBanner from "@/components/home/HeroBanner";
import Features from "@/components/home/Features";
import Brands from "@/components/home/Brands";
import ProductGrid from "@/components/home/ProductGrid";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* 1. Header Principal */}
      <Header />
      
      {/* 2. Barra de Categorias (Freio, Motor, Suspensão...) */}
      <CategoryBar />
      
      {/* 3. Banner Principal (Carro Vermelho) */}
      <HeroBanner />
      
      {/* 4. Vantagens (Frete grátis, Preços baixos, Atendimento) */}
      <div className="mt-12">
        <Features />
      </div>

      {/* 5. Seção de Marcas de Destaque */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center">
        <h2 className="text-[32px] font-bold text-black mb-8">
          As melhores marcas
        </h2>
        <Brands />
      </section>

      {/* 6. Seção de Produtos */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center relative">
        <h2 className="text-[32px] font-bold text-black mb-8 text-left">
          Produtos que trabalhamos
        </h2>

        {/* Setas do Carrossel (Layout Visual) */}
        <div className="absolute left-0 top-[55%] -translate-y-1/2 z-10 hidden md:block">
          <button className="text-4xl text-[#B31212] font-bold p-2 hover:opacity-70 transition">
            &#10094;
          </button>
        </div>
        
        <div className="absolute right-0 top-[55%] -translate-y-1/2 z-10 hidden md:block">
          <button className="text-4xl text-[#B31212] font-bold p-2 hover:opacity-70 transition">
            &#10095;
          </button>
        </div>

        {/* Grade/Carrossel de Produtos */}
        <div className="px-4">
          <ProductGrid />
        </div>
      </section>

      {/* 7. Rodapé */}
      <Footer />
    </main>
  );
}