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

  export async function deleteCartItem(itemId: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/api/orderItems/${itemId}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Erro ao remover item do carrinho");
    }
  }

  export async function updateCartItemQuantity(itemId: number, quantity: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/api/orderItems/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // Enviamos o objeto que o OrderItem do backend espera receber
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar quantidade do item");
    }
  }

  export async function clearCart(orderId: number): Promise<void> {
    const response = await fetch(`http://localhost:8080/api/orderItems/clear/${orderId}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error("Erro ao esvaziar o carrinho");
    }
  }