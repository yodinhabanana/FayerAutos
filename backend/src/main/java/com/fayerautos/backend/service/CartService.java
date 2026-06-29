package com.fayerautos.backend.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.fayerautos.backend.model.Product;
import com.fayerautos.backend.repository.ProductRepository;
import com.fayerautos.backend.dto.OrderItemResponse;
import com.fayerautos.backend.model.OrderItem;
import com.fayerautos.backend.repository.OrderItemRepository;
   
@Service
public class CartService {

    private final ProductRepository productRepository;
    private final OrderItemRepository cartRepository;

    public CartService(
        OrderItemRepository cartRepository,
        ProductRepository productRepository
    ) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public List<OrderItem> getAllOrderItems() {
        return cartRepository.findAll();
    }

    public List<OrderItemResponse> getItemsByOrderId(Integer orderId) {
        List<OrderItem> items = cartRepository.findByOrderId(orderId);
        
        return items.stream().map(item -> {
            String productName = productRepository.findById(item.getProductId())
                .map(p -> p.getProductName()) 
                .orElse("Produto Desconhecido");

            return new com.fayerautos.backend.dto.OrderItemResponse(
                item.getId(),
                item.getOrderId(),
                item.getProductId(),
                item.getQuantity(),
                item.getUnitPrice(),
                productName
            );
        }).toList();
    }

    public OrderItem addItem(
        Integer orderId,
        Integer productId,
        Integer quantity
        ) {
        // 1. Verifica se o produto existe
        Product product = productRepository
            .findById(productId)
            .orElseThrow(
                () -> new RuntimeException("Produto não encontrado")
            );

        List<OrderItem> existingItems = cartRepository.findByOrderId(orderId);
        
        java.util.Optional<OrderItem> duplicatedItem = existingItems.stream()
            .filter(item -> item.getProductId().equals(productId))
            .findFirst();

        if (duplicatedItem.isPresent()) {
            OrderItem itemExistente = duplicatedItem.get();
            itemExistente.setQuantity(itemExistente.getQuantity() + quantity);
            
            itemExistente.setUnitPrice(product.getPrice()); 
            
            return cartRepository.save(itemExistente);
        } else {
            OrderItem newItem = new OrderItem();
            newItem.setOrderId(orderId);
            newItem.setProductId(productId);
            newItem.setQuantity(quantity);
            newItem.setUnitPrice(product.getPrice());
            
            return cartRepository.save(newItem);
        }
    }

    public void clearCart(Integer orderId) {
        List<OrderItem> items = cartRepository.findByOrderId(orderId);
        cartRepository.deleteAll(items);
    }
}
