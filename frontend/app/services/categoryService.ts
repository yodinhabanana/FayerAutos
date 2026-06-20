import { Category } from "@/types/ProductCategory";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(
    "http://localhost:8080/api/categories"
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  return response.json();
}