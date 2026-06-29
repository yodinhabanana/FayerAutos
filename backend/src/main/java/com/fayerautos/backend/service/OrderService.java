package com.fayerautos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fayerautos.backend.model.Order;
import com.fayerautos.backend.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

	private final OrderRepository repository;

	public List<Order> findAll() {
		return repository.findAll();
	}

	public Optional<Order> findById(int id) {
		return repository.findById(id);
	}

	public Order save(Order order) {
		return repository.save(order);
	}

	public Optional<Order> update(int id, Order updatedOrder) {
		return repository.findById(id).map(existingOrder -> {
			existingOrder.setStatus(updatedOrder.getStatus());
			existingOrder.setOrderCode(updatedOrder.getOrderCode());
			existingOrder.setCustomerId(updatedOrder.getCustomerId());
			existingOrder.setDeliveryAddressId(updatedOrder.getDeliveryAddressId());
			return repository.save(existingOrder);
		});
	}

	public boolean deleteById(int id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
			return true;
		}
		return false;
	}
}