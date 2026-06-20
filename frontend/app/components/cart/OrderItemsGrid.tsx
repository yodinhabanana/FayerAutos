"use client"
import { useEffect, useState } from "react";
import { getCartItems } from "@/services/cartService";
import { OrderItem } from "@/types/OrderItem";

interface OrderItemsGridProps {
  orderId: number;
}

export default function OrderItemsGrid({ orderId }: OrderItemsGridProps) {

    const[orderItems, setOrderItems] = useState<OrderItem[]>();

    useEffect(() => {
        getCartItems(orderId)
        .then((orderItems) => setOrderItems(orderItems))
        },
        [orderId]
    );
    console.log(orderItems);

    return (
        <section className="order-items-grid">
            {orderItems?.map(orderItem => (
                <div key={orderItem.id} className="order-item-card">
                    <p>Produto ID: {orderItem.productId}</p>
                    <p>Quantidade: {orderItem.quantity}</p>
                    <p>Preço Unitário: R$ {orderItem.unitPrice}</p>
                </div>
            ))}
        </section>
    );
}