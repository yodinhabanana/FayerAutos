
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative h-[450px] bg-gradient-to-r from-gray-900 to-gray-700">
      <Image className="object-cover object-center w-full h-[450px]" src="/teste2.jpg" alt = "Carrao foda" width ={1200} height ={450} quality = {100}/>
    </section>
  );
}