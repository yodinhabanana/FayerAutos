package com.fayerautos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fayerautos.backend.model.OrderItem;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    List<OrderItem> findByOrderId(Integer orderId);
}
