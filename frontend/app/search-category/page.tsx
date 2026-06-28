"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "@/types/Auth";
import Sidebar from "../components/layout/Sidebar";
import ProductCard from "@/components/home/ProductCard"; 
import { Product } from "@/types/Product";

interface Category {
  id: number;
  categoryName: string;
  description?: string;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryId = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [user, setUser] = useState<MyJwtPayload | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode<MyJwtPayload>(token));
    }

    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erro ao buscar categories:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = "http://localhost:8080/api/products";
    
    if (categoryId) {
      url = `http://localhost:8080/api/products?category=${categoryId}`;
    } else if (searchQuery) {
      url = `http://localhost:8080/api/products?search=${encodeURIComponent(searchQuery)}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos:", err);
        setProducts([]);
        setLoading(false);
      });
  }, [categoryId, searchQuery]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    router.push(`/search-category?search=${encodeURIComponent(searchInput)}`);
  };

  const availableBrands = Array.from(
    new Set(products.map((p) => p.brand).filter((b): b is string => !!b))
  ).sort();

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleClearFilters = () => {
    setMaxPrice(1000);
    setSelectedBrands([]);
  };

  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price <= maxPrice;
    const matchesBrand =
      selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
    return matchesPrice && matchesBrand;
  });

  const currentCategory = categories.find(cat => String(cat.id) === categoryId);

  const pageTitle = categoryId 
    ? (currentCategory ? currentCategory.categoryName : "Carregando categoria...") 
    : searchQuery 
    ? `Resultados para "${searchQuery}"` 
    : "Todos os produtos";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      <div>
        <header className="bg-[#1A1B21] text-white w-full border-b border-gray-800">
          <div className="w-full px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-12">
            <div className="flex items-center gap-4 md:gap-6 shrink-0">
              <button 
                className="text-xl w-10 h-10 flex items-center justify-center rounded-md hover:bg-red-700 transition-all text-white font-bold" 
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} user={user} />
              <Link href="/" className="block">
                <Image src="/logo3.png" alt="FayerAutos" width={145} height={45} className="object-contain" priority />
              </Link>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-3xl relative">
              <input
                type="text"
                placeholder="O que você procura?"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-full pl-6 pr-12 py-2.5 text-black bg-white outline-none placeholder-gray-500 text-[15px] font-normal"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <div className="flex items-center gap-6 md:gap-8 shrink-0 justify-end">
              <Link href="/cart" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </Link>

              {!user ? (
                <Link href="/login" className="bg-[#B31212] px-6 py-2 rounded text-white text-[14px] font-medium hover:bg-red-700 transition-all shadow-sm">
                  Entrar
                </Link>
              ) : (
                <button onClick={logout} className="bg-[#B31212] px-4 py-2 rounded text-[14px] font-medium hover:bg-red-700 transition-all text-white shadow-sm">
                  Sair
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="w-full bg-[#E5E5E5] border-b border-gray-300">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6 md:gap-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => router.push(`/search-category?category=${category.id}`)}
                className={`text-[#1A1A1A] font-semibold text-base py-1 px-2 transition-colors hover:text-red-600 ${
                  categoryId === String(category.id) ? "text-red-600 border-b-2 border-red-600" : ""
                }`}
              >
                {category.categoryName}
              </button>
            ))}
          </nav>
        </div>

        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">{pageTitle}</h1>
            <p className="text-sm text-gray-500 mt-1">{loading ? "..." : filteredProducts.length} itens encontrados</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-80 border border-gray-200 rounded-2xl p-6 h-fit bg-white shadow-sm shrink-0">
              <div className="flex items-center gap-2.5 font-bold text-xl border-b pb-3 mb-4 text-[#1A1A1A]">
                <Image 
                  src="/filter-111.png" 
                  alt="Filtros" 
                  width={20} 
                  height={20} 
                  className="object-contain w-5 h-5"
                />
                <span>Filtros</span>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-base text-[#1A1A1A] mb-3">Marca</h3>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {availableBrands.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">Nenhuma marca catalogada</p>
                  ) : (
                    availableBrands.map((marca) => (
                      <label key={marca} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer hover:text-black transition-colors">
                        <input 
                          type="checkbox" 
                          checked={selectedBrands.includes(marca)}
                          onChange={() => handleBrandChange(marca)}
                          className="w-4 h-4 rounded border-gray-300 text-[#B31212] focus:ring-[#B31212]" 
                        />
                        <span className="font-medium">{marca}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              <div className="mb-6 border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-base text-[#1A1A1A]">Faixa de preço</h3>
                  <span className="text-sm font-bold text-[#B31212]">Até R$ {maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-red-600 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>R$ 0</span>
                  <span>R$ 1000</span>
                </div>
              </div>

              <button 
                onClick={handleClearFilters}
                className="w-full bg-[#B31212] hover:bg-red-800 text-white font-bold py-2.5 rounded-lg transition-colors text-xs uppercase tracking-wider"
              >
                Limpar filtros
              </button>
            </aside>

            <section className="flex-1">
              {loading ? (
                <div className="text-center py-12 text-gray-500 font-medium">Buscando peças...</div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-2xl bg-gray-50 text-gray-400">
                  Nenhum item corresponde aos critérios de preço ou marcas selecionadas.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-5 gap-y-8 justify-items-center md:justify-items-start">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      <footer className="bg-[#1A1B21] text-white mt-16 w-full border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
          <Link href="/">
            <Image src="/logo2.png" alt="FayerAutos" width={150} height={50} />
          </Link>

          <div>
            <h4 className="font-bold mb-4 text-sm text-gray-200">Minha Conta</h4>
            <p className="text-xs text-gray-400 mb-1 cursor-pointer hover:text-white">Meus dados</p>
            <p className="text-xs text-gray-400 cursor-pointer hover:text-white">Meus pedidos</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm text-gray-200">Institucional</h4>
            <p className="text-xs text-gray-400 mb-1 cursor-pointer hover:text-white">Sobre nós</p>
            <p className="text-xs text-gray-400 cursor-pointer hover:text-white">Contato</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm text-gray-200">Atendimento</h4>
            <p className="text-xs text-gray-400 font-semibold text-[#B31212]">0800 400 2000</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-gray-500 font-medium">Carregando catálogo FayerAutos...</div>}>
      <ProductsContent />
    </Suspense>
  );
}