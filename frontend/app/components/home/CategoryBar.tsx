"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategories } from "@/services/categoryService";
import { Category } from "@/types/ProductCategory";

export default function CategoryBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category");

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data))
      .catch((err) => console.error("Falha ao carregar categorias:", err));
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/products?category=${categoryId}`); 
  };

  return (
    <div className="w-full bg-[#E5E5E5] border-b border-gray-300">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between md:justify-center md:gap-12 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`text-[#1A1A1A] font-semibold text-base py-1 px-2 transition-colors hover:text-red-600 ${
              currentCategory === String(category.id) ? "text-red-600 border-b-2 border-red-600" : ""
            }`}
          >
            {category.categoryName}
          </button>
        ))}
      </nav>
    </div>
  );
}