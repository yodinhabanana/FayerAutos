"use client";

import { useState, useEffect } from "react";
import { getCartItems, deleteCartItem } from "@/services/cartService";
import { OrderItem } from "@/types/OrderItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "@/types/Auth";
import Header from "@/components/home/Header";
import Footer from "@/components/global/Footer";

export default function CheckoutPage() {
  const router = useRouter();

  // Estados do Checkout
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCep, setLoadingCep] = useState(false);
  
  // Guardamos o userId extraído do JWT para usar na finalização
  const [userId, setUserId] = useState<number | null>(null);
  const currentOrderId = 1; 

  const [formData, setFormData] = useState({
    tipoEntrega: "entrega", 
    nome: "",
    email: "",
    cpf: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    metodoPagamento: "cartao_credito",
  });

  // 1. Carrega dados do Usuário de forma segura
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<MyJwtPayload>(token);
        
        if (decoded.userId) {
          setUserId(Number(decoded.userId));
        }

        setFormData((prev) => ({
          ...prev,
          email: decoded.username || "",
        }));

        if (decoded.userId) {
          fetch(`http://localhost:8080/api/users/${decoded.userId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })
            .then((res) => {
              if (!res.ok) throw new Error(`Erro na API: ${res.status}`);
              return res.json();
            })
            .then((userData) => {
              setFormData((prev) => ({
                ...prev,
                nome: userData.fullName || "", 
                email: userData.email || decoded.username || "",
                cpf: userData.document || "", 
              }));
            })
            .catch((err) => {
              console.warn("A rota de busca detalhada foi bloqueada ou está offline (CORS/Security):", err.message);
            });
        }
      } catch (error) {
        console.error("Erro ao decodificar perfil:", error);
      }
    }
  }, []);

  // 2. Carrega os itens do carrinho
  useEffect(() => {
    getCartItems(currentOrderId)
      .then((items) => {
        setCartItems(items || []);
      })
      .catch((err) => console.error("Erro ao carregar checkout:", err))
      .finally(() => setLoading(false));
  }, []);

  // 3. Auto-preenche o Endereço via CEP (ViaCEP)
  useEffect(() => {
    const limpoCep = formData.cep.replace(/\D/g, "");
    if (limpoCep.length === 8) {
      setLoadingCep(true);
      fetch(`https://viacep.com.br/ws/${limpoCep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            setFormData((prev) => ({
              ...prev,
              rua: data.logradouro || "",
              bairro: data.bairro || "",
              cidade: data.localidade && data.uf ? `${data.localidade} - ${data.uf}` : "",
            }));
          }
        })
        .catch((err) => console.error("Erro ao buscar CEP:", err))
        .finally(() => setLoadingCep(false));
    }
  }, [formData.cep]);

  const handleRemoveItem = async (id: number) => {
    try {
      await deleteCartItem(id); 
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erro ao remover o item do carrinho:", err);
      alert("Não foi possível remover o item. Tente novamente.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // 4. Envio do formulário / Finalização da Compra (Fluxo Unificado)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    if (!userId) {
      alert("Você precisa estar logado para finalizar o pedido.");
      return;
    }

    try {
      // Dispara uma ÚNICA requisição contendo o ID do cliente e os dados do endereço juntos
      const response = await fetch(`http://localhost:8080/api/orders/${currentOrderId}/finalize`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          customerId: userId,
          cep: formData.tipoEntrega === "entrega" ? formData.cep : "00000-000",
          rua: formData.tipoEntrega === "entrega" ? formData.rua : "Retirada na Loja Matriz",
          numero: formData.tipoEntrega === "entrega" ? formData.numero : "S/N",
          bairro: formData.tipoEntrega === "entrega" ? formData.bairro : "Centro",
          cidade: formData.tipoEntrega === "entrega" ? formData.cidade : "Unidade Principal"
        })
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Sem detalhes fornecidos pelo servidor.");
        console.error("Erro retornado pelo backend Java:", errorText);
        throw new Error("Erro ao finalizar a ordem no servidor.");
      }

      // Limpa os estados locais após o sucesso
      setCartItems([]);
      localStorage.removeItem("currentCartId"); 

      alert("Pedido finalizado com sucesso!");
      router.push("/obrigado");

    } catch (err) {
      console.error("Erro ao finalizar o pedido:", err);
      alert("Houve um erro ao processar o seu pedido. Tente novamente.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-black">Carregando checkout...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <Header />

      <main className="flex-1 bg-gray-50 text-black py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-sm text-gray-500 hover:text-red-600 inline-flex items-center gap-2 mb-6 transition-colors">
            ← Voltar para a loja
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight mb-8">Finalizar Pedido</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Bloco 1: Opção de Entrega */}
              <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="bg-red-100 text-red-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  Como deseja receber seu pedido?
                </h2>
                <div className="relative">
                  <select 
                    name="tipoEntrega"
                    value={formData.tipoEntrega}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-red-600 bg-white appearance-none cursor-pointer font-medium"
                  >
                    <option value="entrega">Entregar no meu endereço (Frete Grátis)</option>
                    <option value="retirada">Retirar na Loja (Rápido e Grátis)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </section>

              {/* Bloco 2: Identificação */}
              <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="bg-red-100 text-red-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  Seus Dados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Nome Completo</label>
                    <input required type="text" name="nome" value={formData.nome} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white transition-all outline-none font-medium" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">E-mail</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white transition-all outline-none font-medium" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">CPF</label>
                    <input required type="text" name="cpf" value={formData.cpf} onChange={handleInputChange} placeholder="000.000.000-00" className="w-full border border-gray-200 rounded-lg p-2.5 bg-gray-50 focus:bg-white transition-all outline-none font-medium" />
                  </div>
                </div>
              </section>

              {/* Bloco 3: Endereço */}
              {formData.tipoEntrega === "entrega" && (
                <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="bg-red-100 text-red-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Endereço de Entrega
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">CEP {loadingCep && <span className="text-red-600 text-[10px] animate-pulse">(Buscando...)</span>}</label>
                      <input required type="text" name="cep" maxLength={9} placeholder="00000-000" value={formData.cep} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-red-600 font-bold" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Rua / Logradouro</label>
                      <input required type="text" name="rua" value={formData.rua} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-red-600" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Número / Complemento</label>
                      <input required type="text" name="numero" placeholder="Ex: 123, Bloco B" value={formData.numero} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-red-600 font-medium" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Bairro</label>
                      <input required type="text" name="bairro" value={formData.bairro} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-red-600" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-400 uppercase mb-1 block">Cidade / UF</label>
                      <input required type="text" name="cidade" value={formData.cidade} onChange={handleInputChange} className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:border-red-600" />
                    </div>
                  </div>
                </section>
              )}

              {/* Bloco 3 alternativo: Local de Retirada */}
              {formData.tipoEntrega === "retirada" && (
                <section className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                  <h2 className="text-lg font-bold text-red-800 mb-2">Ponto de Retirada</h2>
                  <p className="text-sm text-red-700">
                    <strong>FayerAutos Matriz:</strong> Av. das Indústrias, 1000 - Setor Automotivo. <br />
                    Seu pedido estará pronto em até <strong>2 horas</strong> após a confirmação.
                  </p>
                </section>
              )}

              {/* Bloco 4: Pagamento */}
              <section className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="bg-red-100 text-red-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                    {formData.tipoEntrega === "entrega" ? "4" : "3"}
                  </span>
                  Forma de Pagamento
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["cartao_credito", "pix", "boleto"].map((metodo) => (
                    <label key={metodo} className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${formData.metodoPagamento === metodo ? "border-red-600 bg-red-50" : "border-gray-200 hover:bg-gray-50"}`}>
                      <input type="radio" name="metodoPagamento" value={metodo} checked={formData.metodoPagamento === metodo} onChange={handleInputChange} className="sr-only" />
                      <span className="text-sm font-bold capitalize">{metodo.replace("_", " ")}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* Coluna Direita (Resumo) */}
            <div className="lg:col-span-5 lg:sticky lg:top-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 pb-2 border-b">Resumo do Pedido</h2>
                <div className="max-h-60 overflow-y-auto flex flex-col gap-3 mb-4 pr-1">
                  {cartItems.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">Nenhum item no pedido.</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm gap-2 py-1 group">
                        <p className="truncate flex-1 pr-2">
                          <span className="font-semibold text-gray-600">{item.quantity}x</span> {item.productName}
                        </p>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-bold">R$ {(item.unitPrice * item.quantity).toFixed(2).replace(".", ",")}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors text-xs font-bold px-1"
                            title="Remover item"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold text-red-700">
                    <span>Total</span>
                    <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={cartItems.length === 0}
                  className="w-full bg-[#991212] hover:bg-[#800f0f] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl mt-6 shadow-md transition-all active:scale-[0.98]"
                >
                  Finalizar Compra
                </button>
              </div>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}