"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/stock-management/Header";

interface Order {
  id: number;
  orderCode: string;
  customerId: number;
  status: string;
  deliveryAddressId: number | null;
  createdAt?: string;
  itemsSummary?: string;
  totalPrice?: number;
  deliveryAddress?: string;
}

export default function CustomerOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Carrega todos os pedidos salvos no banco de dados
  async function fetchOrders() {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data || []);
      } else {
        alert("Erro ao buscar a lista de pedidos.");
      }
    } catch (err) {
      console.error(err);
      alert("Não foi possível conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  // Atualiza o Status do pedido no Backend (PUT)
  async function handleUpdateStatus(id: number, currentOrder: Order, newStatus: string) {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        alert(`Status do pedido atualizado para ${newStatus}!`);
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      } else {
        alert("Erro ao atualizar o status do pedido.");
      }
    } catch (err) {
      alert("Falha de comunicação ao atualizar status.");
    }
  }

  // Deleta o pedido (Simula a exclusão/reembolso completo)
  async function handleDeleteOrder(order: Order) {
    const currentStatus = order.status?.toUpperCase();

    // Bloqueio de segurança no frontend
    if (currentStatus === "DELIVERED" || currentStatus === "CANCELLED") {
      alert(`Não é possível deletar ou reembolsar um pedido que já está como ${order.status}.`);
      return;
    }

    if (confirm("Deseja realmente deletar/reembolsar este pedido permanentemente? Esta ação não pode ser desfeita.")) {
      try {
        const res = await fetch(`http://localhost:8080/api/orders/${order.id}`, {
          method: "DELETE",
        });

        if (res.ok || res.status === 204) {
          alert("Pedido deletado/reembolsado com sucesso!");
          setOrders(prev => prev.filter(o => o.id !== order.id));
        } else {
          alert("Erro ao deletar o pedido no servidor.");
        }
      } catch (err) {
        alert("Erro ao tentar deletar o pedido.");
      }
    }
  }

  // Retorna uma cor amigável com base no status do pedido
  const getStatusBadgeClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "PROCESSING": return "bg-blue-100 text-blue-800 border-blue-300";
      case "SHIPPED": return "bg-indigo-100 text-indigo-800 border-indigo-300";
      case "DELIVERED": return "bg-green-100 text-green-800 border-green-300";
      case "CANCELLED": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <Header />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* ==================== CABEÇALHO COM VOLTAR ==================== */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <button 
              onClick={() => router.push("/stock-management")}
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors flex items-center gap-1 mb-2"
            >
              ← Voltar para o Estoque
            </button>
            <h1 className="text-3xl font-bold tracking-tight text-black">Pedidos dos Clelines</h1>
            <p className="text-gray-500 text-sm mt-1">Gerencie, altere o status de entrega ou realize o reembolso de compras.</p>
          </div>
        </div>

        {/* ==================== LISTAGEM EM TABELA ==================== */}
        <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
          {/* Header da Tabela */}
          <div className="grid grid-cols-12 gap-4 bg-white px-6 py-4 border-b border-gray-200 text-gray-500 font-bold text-xs uppercase tracking-wider text-center md:text-left">
            <div className="col-span-3 md:col-span-2">Cód. Pedido</div>
            <div className="col-span-2 text-center">Cliente ID</div>
            <div className="col-span-3 md:col-span-4">Itens / Endereço</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Ações</div>
          </div>

          {/* Conteúdo / Linhas de Pedidos */}
          <div className="divide-y divide-gray-100 p-2">
            {loading ? (
              <p className="text-center py-8 text-gray-500">Carregando pedidos...</p>
            ) : orders.map((order) => {
              const isCryptoDisabled = order.status?.toUpperCase() === "DELIVERED" || order.status?.toUpperCase() === "CANCELLED";
              
              return (
                <div 
                  key={order.id} 
                  className="grid grid-cols-12 gap-4 px-6 py-5 items-center bg-[#F4F4F4] my-2 rounded-lg border border-gray-200 text-center md:text-left text-sm font-medium text-gray-900"
                >
                  {/* Código do Pedido */}
                  <div className="col-span-3 md:col-span-2 text-left font-semibold text-black">
                    {order.orderCode || `ID #${order.id}`}
                  </div>

                  {/* ID do Cliente */}
                  <div className="col-span-2 text-center text-gray-700">
                    {order.customerId ? `User #${order.customerId}` : "—"}
                  </div>

                  {/* Resumo de Itens / Endereço */}
                  <div className="col-span-3 md:col-span-4 text-left flex flex-col gap-1">
                    <span className="text-black font-normal line-clamp-1">
                      {order.itemsSummary || "Resumo de itens indisponível"}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-1">
                      {order.deliveryAddress || `Endereço ID: ${order.deliveryAddressId || "Retirada"}`}
                    </span>
                  </div>

                  {/* Badge de Status + Selector de Mudança Rápida */}
                  <div className="col-span-2 flex flex-col items-center gap-2 justify-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                    
                    <select
                      value={order.status || "PENDING"}
                      onChange={(e) => handleUpdateStatus(order.id, order, e.target.value)}
                      className="text-xs bg-white text-gray-800 border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:border-black cursor-pointer"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>

                  {/* Botões de Ações Administrativas */}
                  <div className="col-span-2 flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleDeleteOrder(order)}
                      disabled={isCryptoDisabled}
                      className={`font-medium px-3 py-1.5 rounded text-xs transition-all shadow-sm flex items-center gap-1 border
                        ${isCryptoDisabled 
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60" 
                          : "bg-white hover:bg-red-50 text-red-600 border-red-200 hover:border-red-400"
                        }`}
                      title={isCryptoDisabled ? "Pedidos finalizados ou cancelados não podem ser reembolsados" : "Deletar/Estornar Pedido"}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Reembolsar
                    </button>
                  </div>

                </div>
              );
            })}

            {!loading && orders.length === 0 && (
              <p className="text-center py-12 text-gray-500">Nenhum pedido foi efetuado por clientes até o momento.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}