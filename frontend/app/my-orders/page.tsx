"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "@/components/stock-management/Header";
import Sidebar from "@/components/layout/Sidebar";


interface Order {
  id: number;
  orderCode: string;
  status: string;
  createdAt?: string;
  itemsSummary?: string;
  deliveryAddress?: string;
  totalPrice?: number;
}

export default function MeusPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      fetch(`http://localhost:8080/api/orders/customer/${decoded.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then(setOrders)
        .catch((err) => console.error("Erro na API:", err));
    } catch (error) {
      console.error("Token inválido", error);
    }
  }, []);

  const displayOrders = orders.length > 0 ? orders : [
    { id: 1, orderCode: "#Código do pedido", status: "STATUS" },
    { id: 2, orderCode: "#Código do pedido", status: "STATUS" }
  ];

  return (
    <div className="w-full min-h-screen bg-white text-black font-sans select-none antialiased flex flex-col">
      
      {/* HEADER GLOBAL */}
      <Header />

      {/* CONTAINER DO CORPO (SIDEBAR + CONTEÚDO) */}
      <div className="flex flex-1 w-full">
        

        {/* CONTEÚDO PRINCIPAL DA PÁGINA */}
        <main className="flex-1 px-10 py-12 max-w-7xl mx-auto w-full">
          <h1 className="text-4xl font-bold mb-10 tracking-tight text-black">
            Meus pedidos
          </h1>

          <div className="space-y-6">
            {displayOrders.map((order) => (
              <div
                key={order.id}
                className="w-full border border-[#E4E4E7] bg-[#F8F8F8] rounded-xl p-8 flex justify-between items-start shadow-sm"
              >
                {/* Lado Esquerdo - Info Textual */}
                <div className="flex flex-col justify-between min-h-[140px]">
                  <div>
                    <h2 className="text-[#71717A] font-medium text-base leading-snug">
                      {order.id === 1 || order.id === 2 ? "#Código do pedido" : `#${order.orderCode}`}
                    </h2>
                    <p className="text-[#71717A] text-sm mt-0.5">
                      {order.createdAt || "Data do pedido, horário"}
                    </p>
                  </div>

                  <p className="text-black font-medium text-base my-4">
                    {order.itemsSummary || "Quantidade x Nome do item"}
                  </p>

                  <p className="text-[#71717A] text-sm">
                    Entrega: {order.deliveryAddress || "endereço"}
                  </p>
                </div>

                {/* Lado Direito - Status e Preço */}
                <div className="flex flex-col items-end justify-between min-h-[140px] text-right">
                  {/* Badge do Status Cinza */}
                  <span className="bg-[#D4D4D8] text-[#71717A] text-[10px] font-bold uppercase px-4 py-1 rounded-md tracking-wider">
                    {order.status}
                  </span>

                  {/* Preços */}
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-black tracking-tight">
                      R$ {order.totalPrice ? order.totalPrice.toFixed(2).replace(".", ",") : "10,00"}
                    </span>
                    <span className="text-sm text-[#71717A] mt-1">
                      R$ {order.totalPrice ? order.totalPrice.toFixed(2).replace(".", ",") : "10,00"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}