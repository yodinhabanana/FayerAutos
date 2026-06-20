package com.fayerautos.backend.service;

import org.springframework.stereotype.Service;
import java.util.List;

import com.fayerautos.backend.model.Product;
import com.fayerautos.backend.repository.ProductRepository;
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

    public List<OrderItem> getItemsByOrderId(Integer orderId) {
        return cartRepository.findByOrderId(orderId);
    }

    public OrderItem addItem(
        Integer orderId,
        Integer productId,
        Integer quantity
    ) {
        Product product = productRepository
            .findById(productId)
            .orElseThrow(
                () -> new RuntimeException("Produto não encontrado")
            );

        OrderItem item = new OrderItem();

        item.setOrderId(orderId);
        item.setProductId(productId);
        item.setQuantity(quantity);
        item.setUnitPrice(product.getPrice());

        return cartRepository.save(item);
    }
}
