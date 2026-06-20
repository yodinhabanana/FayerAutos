package com.fayerautos.backend.controller;

import com.fayerautos.backend.service.CartService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fayerautos.backend.dto.AddToCartRequest;
import com.fayerautos.backend.model.OrderItem;

import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orderItems")
public class OrderItemController {
    
    private final CartService cartService;

    private OrderItemController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{orderId}")
    public List<OrderItem> getItemsByOrderId(@PathVariable Integer orderId) {
        return cartService.getItemsByOrderId(orderId);
    }

    @PostMapping
    public OrderItem addToCart(@RequestBody AddToCartRequest request){
        return cartService.addItem(
            request.getOrderId(),
            request.getProductId(),
            request.getQuantity()
        );
    }

}   
    
