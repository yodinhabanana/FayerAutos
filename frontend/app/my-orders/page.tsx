"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "@/components/stock-management/Header";
import Sidebar from "@/components/layout/Sidebar";

// 1. Atualização da Interface para bater exatamente com as propriedades reais
interface Order {
  id: number;
  orderCode: string;
  status: string;
  createdAt?: string; // Caso o backend já traga formatado ou use ISO string
  
  // Se o seu backend não tiver essas propriedades simplificadas (totalPrice, itemsSummary, deliveryAddress),
  // você pode tratá-las diretamente na requisição ou deixar estes opcionais
  itemsSummary?: string; 
  deliveryAddress?: string;
  totalPrice?: number;
}

export default function MeusPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      
      // MUITA ATENÇÃO AQUI: Garanta que decoded.userId ou decoded.id traga o número correto
      const idDoCliente = decoded.userId || decoded.id;

      if (!idDoCliente) {
        console.error("Não foi possível encontrar o ID do usuário no Token decodificado:", decoded);
        setLoading(false);
        return;
      }

      fetch(`http://localhost:8080/api/orders/customer/${idDoCliente}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro na requisição HTTP: " + res.status);
          return res.json();
        })
        .then((data) => {
          console.log("Pedidos reais encontrados no Java:", data);
          setOrders(Array.isArray(data) ? data : []);
        })
        .catch((err) => console.error("Erro na API:", err))
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Token inválido", error);
      setLoading(false);
    }
  }, []);
  
  return (
    <div className="w-full min-h-screen bg-white text-black font-sans select-none antialiased flex flex-col">
      
      {/* HEADER GLOBAL */}
      <Header />

      {/* CONTAINER DO CORPO (SIDEBAR + CONTEÚDO) */}
      <div className="flex flex-1 w-full">
        
        {/* BARRA LATERAL */}
        <Sidebar isOpen={false} onClose={() => {}} user={null} />

        {/* CONTEÚDO PRINCIPAL DA PÁGINA */}
        <main className="flex-1 px-10 py-12 max-w-7xl mx-auto w-full">
          <h1 className="text-4xl font-bold mb-10 tracking-tight text-black">
            Meus pedidos
          </h1>

          {loading ? (
            <div className="text-center py-10 text-gray-500">Carregando seu histórico...</div>
          ) : orders.length === 0 ? (
            // Caso o banco retorne vazio, exibe um feedback em vez de dados estáticos falsos
            <div className="border border-dashed border-gray-300 rounded-xl p-12 text-center text-gray-500 bg-gray-50">
              <p className="text-lg font-medium">Você ainda não realizou nenhum pedido.</p>
              <p className="text-sm mt-1 text-gray-400">Quando você fizer compras, elas aparecerão listadas aqui.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="w-full border border-[#E4E4E7] bg-[#F8F8F8] rounded-xl p-8 flex justify-between items-start shadow-sm hover:border-gray-300 transition-all"
                >
                  {/* Lado Esquerdo - Info Textual */}
                  <div className="flex flex-col justify-between min-h-[140px]">
                    <div>
                      <h2 className="text-black font-bold text-lg leading-snug">
                        #{order.orderCode}
                      </h2>
                      <p className="text-[#71717A] text-sm mt-0.5">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        }) : "Data não disponível"}
                      </p>
                    </div>

                    <p className="text-gray-800 font-medium text-base my-4">
                      {order.itemsSummary || "Produtos do pedido"}
                    </p>

                    <p className="text-[#71717A] text-sm">
                      <span className="font-semibold">Entrega:</span> {order.deliveryAddress || "Endereço registrado"}
                    </p>
                  </div>

                  {/* Lado Direito - Status e Preço */}
                  <div className="flex flex-col items-end justify-between min-h-[140px] text-right">
                    {/* Badge do Status Dinâmica baseada no retorno do Banco */}
                    <span className={`text-[10px] font-bold uppercase px-4 py-1 rounded-md tracking-wider ${
                      order.status === "PENDING" ? "bg-amber-100 text-amber-800" :
                      order.status === "DELIVERED" ? "bg-green-100 text-green-800" :
                      order.status === "CANCELED" ? "bg-red-100 text-red-800" :
                      "bg-gray-200 text-gray-700"
                    }`}>
                      {order.status === "PENDING" ? "Pendente" : 
                       order.status === "DELIVERED" ? "Entregue" : 
                       order.status === "CANCELED" ? "Cancelado" : order.status}
                    </span>

                    {/* Exibição dos Valores Reais salvos */}
                    <div className="flex flex-col items-end">
                      <span className="text-2xl font-black text-black tracking-tight">
                        R$ {order.totalPrice ? order.totalPrice.toFixed(2).replace(".", ",") : "0,00"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}