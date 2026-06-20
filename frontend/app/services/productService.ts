import { Product } from "@/types/Product";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    "http://localhost:8080/api/products"
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return response.json();
}