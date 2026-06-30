package com.fayerautos.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fayerautos.backend.dto.OrderRequest;
import com.fayerautos.backend.model.Order;
import com.fayerautos.backend.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

	private final OrderService orderService;

	@GetMapping
	public ResponseEntity<List<com.fayerautos.backend.dto.OrderResponse>> getAllOrders() {
		return ResponseEntity.ok(orderService.getAllOrdersProcessed());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable Integer id) {
		return orderService.findById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping("/customer/{customerId}")
	public ResponseEntity<List<com.fayerautos.backend.dto.OrderResponse>> getOrdersByCustomerId(@PathVariable Integer customerId) {
		List<com.fayerautos.backend.dto.OrderResponse> response = orderService.getOrdersByCustomerId(customerId);
		return ResponseEntity.ok(response);
	}

	@PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        Order newOrder = orderService.finalizeAndCreateOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(newOrder);
    }

	@PutMapping("/{id}")
	public ResponseEntity<Order> updateOrder(@PathVariable Integer id, @RequestBody Order updatedOrder) {
		return orderService.update(id, updatedOrder)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
		if (orderService.deleteById(id)) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}

	@PutMapping("/{id}/status")
	public ResponseEntity<Void> updateOrderStatus(@PathVariable Integer id, @RequestBody java.util.Map<String, String> body) {
		String newStatus = body.get("status");
		
		// Injeta o repository diretamente ou use um método no service que chame a query nova.
		// Exemplo chamando direto se o repository estivesse aqui, mas como você usa orderService:
		boolean updated = orderService.findById(id).map(order -> {
			// Acesse o seu repository. Se o repository não estiver acessível aqui, 
			// você pode criar um método no seu OrderService que apenas repasse para o repository.
			return true;
		}).orElse(false);

		// Vamos fazer a alteração segura dentro do seu OrderService. 
		// Para ficar mais fácil, altere o bloco do seu controller para isto:
		
		int rowsAffected = orderService.updateStatusDirectly(id, newStatus);
		
		if (rowsAffected > 0) {
			return ResponseEntity.ok().build();
		}
		return ResponseEntity.notFound().build();
	}
}