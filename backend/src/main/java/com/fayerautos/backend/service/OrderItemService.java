package com.fayerautos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fayerautos.backend.model.OrderItem;
import com.fayerautos.backend.repository.OrderItemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderItemService {

	private final OrderItemRepository repository;

	public List<OrderItem> findAll() {
		return repository.findAll();
	}

	public Optional<OrderItem> findById(Integer id) {
		return repository.findById(id);
	}

	public OrderItem save(OrderItem orderItem) {
		return repository.save(orderItem);
	}

	public Optional<OrderItem> update(Integer id, OrderItem updatedItem) {
		return repository.findById(id).map(existingItem -> {
			existingItem.setQuantity(updatedItem.getQuantity());
			existingItem.setOrderId(updatedItem.getOrderId());
			existingItem.setProductId(updatedItem.getProductId());
			existingItem.setUnitPrice(updatedItem.getUnitPrice());
			return repository.save(existingItem);
		});
	}

	public boolean deleteById(Integer id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
			return true;
		}
		return false;
	}
}