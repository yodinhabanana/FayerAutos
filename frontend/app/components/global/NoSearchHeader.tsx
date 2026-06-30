"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "@/types/Auth";

export default function Header() {
  const [user, setUser] = useState<MyJwtPayload | null>(null);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    const token = rawToken?.replace("Bearer ", "");

    if (token && token.split(".").length === 3) {
      setUser(jwtDecode<MyJwtPayload>(token));
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  }

  return (
    <header className="bg-[#1A1B21] text-white w-full border-b border-gray-800">
      <div className="w-full px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-12">

        <div className="flex items-center gap-4 md:gap-6 shrink-0">

          <Link href="/" className="block">
            <Image 
              src="/logo3.png" 
              alt="FayerAutos" 
              width={145} 
              height={45} 
              className="object-contain"
              priority
            />
          </Link>
        </div>
        
      </div>
    </header>
  );
}