import { OrderItem } from "@/types/OrderItem";

export async function addToCart(
  orderId: number,
  productId: number,
  quantity: number
): Promise<OrderItem> {
  const response = await fetch(
    "http://localhost:8080/api/orderItems",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        productId,
        quantity,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao adicionar ao carrinho");
  }

  return response.json();
}

export async function getCartItems(
  orderId: number
): Promise<OrderItem[]> {
  const response = await fetch(
    `${"http://localhost:8080/api/orderItems"}/${orderId}`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar carrinho");
  }

  return response.json();
}