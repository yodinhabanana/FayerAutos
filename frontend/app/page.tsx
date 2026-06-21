"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Header from "@/components/home/Header";
import HeroBanner from "@/components/home/HeroBanner";
import Features from "@/components/home/Features";
import Brands from "@/components/home/Brands";
import CategoryBar from "@/components/home/CategoryBar";
import ProductGrid from "@/components/home/ProductGrid";
import Footer from "@/components/home/Footer";

import { MyJwtPayload } from "@/types/Auth";

export default function Home() {

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <CategoryBar />
      <HeroBanner />
      <Features />
      <Brands />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8">
          Mais vendidos
        </h2>

        <ProductGrid />
      </section>

      <Footer />
    </main>
  );
}