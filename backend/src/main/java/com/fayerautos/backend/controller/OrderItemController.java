package com.fayerautos.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity; // Injetando o serviço de CRUD
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fayerautos.backend.dto.AddToCartRequest;
import com.fayerautos.backend.dto.OrderItemResponse;
import com.fayerautos.backend.model.OrderItem;
import com.fayerautos.backend.service.CartService;
import com.fayerautos.backend.service.OrderItemService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orderItems")
public class OrderItemController {

    private final CartService cartService;
    private final OrderItemService orderItemService;

    private OrderItemController(CartService cartService, OrderItemService orderItemService) {
        this.cartService = cartService;
        this.orderItemService = orderItemService;
    }

    @GetMapping("/{orderId}")
    public List<OrderItemResponse> getItemsByOrderId(@PathVariable Integer orderId) {
        return cartService.getItemsByOrderId(orderId);
    }

    @PostMapping
    public OrderItem addToCart(@RequestBody AddToCartRequest request) {
        return cartService.addItem(
                request.getOrderId(),
                request.getProductId(),
                request.getQuantity());
    }

    // --- NOVOS ENDPOINTS DO CRUD ---

    // Rota alterada para "/item/{id}" para evitar conflito com /{orderId}"
    @GetMapping("/item/{id}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable int id) {
        return orderItemService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar a quantidade ou valores de um item específico do carrinho/pedido
    @PutMapping("/{id}")
    public ResponseEntity<OrderItem> updateOrderItem(@PathVariable int id, @RequestBody OrderItem updatedItem) {
        return orderItemService.update(id, updatedItem)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Remover um item específico do carrinho/pedido
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderItem(@PathVariable int id) {
        if (orderItemService.deleteById(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}