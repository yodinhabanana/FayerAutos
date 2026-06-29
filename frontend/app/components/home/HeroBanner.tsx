"use client";

import { useState, useEffect } from "react";

const SLIDES = [
  {
    title: <>PERFORMANCE<br />SEM LIMITES</>,
    subtitle: "Sinta o poder da engenharia automotiva premium em cada curva.",
    imageUrl: "/carraofoda3.jpg"
  },
  {
    title: <>DESIGN DE<br />VANGUARDA</>,
    subtitle: "Linhas agressivas combinadas com o máximo conforto e sofisticação.",
    imageUrl: "/carrao_top_2.avif"
  },
  {
    title: <>TECNOLOGIA<br />DO FUTURO</>,
    subtitle: "Conectividade total e motorização híbrida de última geração.",
    imageUrl: "/maquina_3.jpg"
  }
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    // Adicionamos z-0 aqui na section principal para isolar o contexto do banner
    <section className="relative w-full h-[450px] bg-black overflow-hidden block z-0">
      
      {/* 1. CAMADA DE IMAGENS */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${slide.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 10 : 0,
            transition: "opacity 1000ms ease-in-out",
          }}
        >
          {/* Sombra ajustada para a nova posição do texto */}
          <div 
            className="absolute inset-0" 
            style={{
              background: "linear-gradient(270deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)",
              zIndex: 11
            }}
          />
        </div>
      ))}

      {/* 2. CAMADA DE TEXTOS - CORRIGIDO DE z-50 PARA z-20 */}
      <div 
        className="absolute z-20 text-white text-right flex flex-col items-end justify-center"
        style={{
          top: "0",
          right: "12%",
          width: "auto",
          maxWidth: "550px",
          height: "100%"
        }}
      >
        
        {/* TÍTULO MENOR (De 120px caiu para 75px máximo) */}
        <h1 
          className="uppercase tracking-tighter text-white m-0 block text-right select-none"
          style={{
            fontSize: "clamp(42px, 5.5vw, 75px)",
            fontWeight: 900,
            lineHeight: "0.9",
            textShadow: "0px 10px 20px rgba(0, 0, 0, 0.9)",
            letterSpacing: "-0.03em"
          }}
        >
          {SLIDES[currentIndex].title}
        </h1>

        {/* SUBTÍTULO PROPORCIONAL */}
        <p 
          className="text-gray-200 font-medium tracking-wide m-0 block text-right"
          style={{
            fontSize: "clamp(16px, 1.5vw, 20px)",
            marginTop: "18px",
            lineHeight: "1.4",
            textShadow: "0px 4px 10px rgba(0, 0, 0, 0.9)",
            maxWidth: "400px"
          }}
        >
          {SLIDES[currentIndex].subtitle}
        </p>

      </div>

      {/* 3. CONTROLADORES (DOTS) - CORRIGIDO DE z-50 PARA z-20 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
              index === currentIndex ? "w-8 bg-[#991212]" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
}