
"use client";

import Image from "next/image";
import {useState, useEffect} from "react";

const IMAGES = [
  "/carraofoda3.jpg",
  "/carrao_top_2.avif",
  "/maquina_3.jpg"
];

  export default function HeroBanner() {
    // 2. Estado para controlar o índice da imagem atual
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      // 3. Criar um intervalo de 5000ms (5 segundos)
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
      }, 5000);

      // 4. Limpar o intervalo quando o componente for desmontado
      return () => clearInterval(interval);
    }, []);

  return (
      <section className="relative h-[450px] bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
        {/* 5. A imagem muda dinamicamente baseada no estado */}
        <Image 
          className="object-cover object-center w-full h-[450px] transition-all duration-700" 
          src={IMAGES[currentIndex]} 
          alt={`Carro foda ${currentIndex + 1}`} 
          width={1000} 
          height={550} 
          quality={100}
          priority
        />
      </section>
    );
  }