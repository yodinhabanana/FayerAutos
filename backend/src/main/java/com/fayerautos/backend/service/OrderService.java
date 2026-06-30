package com.fayerautos.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fayerautos.backend.dto.OrderRequest;
import com.fayerautos.backend.model.Addresses;
import com.fayerautos.backend.model.Order;
import com.fayerautos.backend.model.OrderItem;
import com.fayerautos.backend.model.UserAccount;
import com.fayerautos.backend.repository.AddressesRepository;
import com.fayerautos.backend.repository.OrderItemRepository;
import com.fayerautos.backend.repository.OrderRepository;
import com.fayerautos.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

	private final OrderRepository orderRepository;
	private final OrderItemRepository orderItemRepository;
	private final AddressesRepository addressRepository;
	private final CartService cartService;
	private final UserRepository userRepository;

	public List<Order> findAll() {
		return orderRepository.findAll();
	}

	public Optional<Order> findById(Integer id) {
		return orderRepository.findById(id);
	}

	public Order save(Order order) {
		return orderRepository.save(order);
	}

	public Optional<Order> update(Integer id, Order updatedOrder) {
		return orderRepository.findById(id).map(existingOrder -> {
			existingOrder.setStatus(updatedOrder.getStatus());
			existingOrder.setOrderCode(updatedOrder.getOrderCode());
			existingOrder.setCustomerId(updatedOrder.getCustomerId());
			existingOrder.setDeliveryAddressId(updatedOrder.getDeliveryAddressId());
			return orderRepository.save(existingOrder);
		});
	}

	public boolean deleteById(Integer id) {
		if (orderRepository.existsById(id)) {
			orderRepository.deleteById(id);
			return true;
		}
		return false;
	}

	@Transactional
	public Order finalizeAndCreateOrder(OrderRequest dto) {
		
		// 1. Verifica se o usuário existe no sistema
		UserAccount customer = userRepository.findById(dto.getCustomerId())
				.orElseThrow(() -> new RuntimeException("Customer not found with ID: " + dto.getCustomerId()));

		// 2. Cria e salva o Endereço mapeando o ID numérico do usuário (userId)
		Addresses address = Addresses.builder()
				.userId(customer.getId()) // Vincula ao ID numérico plano do UserAccount
				.street(dto.getStreet())
				.number(dto.getNumber())
				.neighborhood(dto.getNeighborhood())
				.city(dto.getCity())
				.state(dto.getState())
				.zipCode(dto.getZipCode())
				.complement(dto.getComplement())
				.build();
		
		Addresses savedAddress = addressRepository.save(address);

		// 3. Cria e salva a Ordem (Mãe) usando IDs numéricos planos
		Order order = Order.builder()
				.customerId(customer.getId())
				.deliveryAddressId(savedAddress.getId())
				.status("PENDING") // Usando String comum de acordo com a sua entidade Order.java
				.orderCode("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
				.build();
		
		Order savedOrder = orderRepository.save(order);

		// 4. Busca os itens do carrinho temporário usando o repositório existente
		List<OrderItem> cartItems = orderItemRepository.findByOrderId(dto.getCurrentCartId());
		
		if (cartItems.isEmpty()) {
			throw new RuntimeException("Não pode esvaziar um carrinho vazio.");
		}

		// 5. Clona os itens do carrinho, trocando o orderId (1) para o ID da nova ordem criada
		List<OrderItem> orderItems = cartItems.stream().map(cartItem -> 
			OrderItem.builder()
					.orderId(savedOrder.getId()) // ◄ VÍNCULO CORRETO: Associa os itens à nova ordem!
					.productId(cartItem.getProductId())
					.quantity(cartItem.getQuantity())
					.unitPrice(cartItem.getUnitPrice())
					.build()
		).toList();

		// 6. Salva os novos itens clonados no banco de dados
		orderItemRepository.saveAll(orderItems);

		// 7. Limpa o carrinho antigo usando o método existente no seu CartService
		cartService.clearCart(dto.getCurrentCartId());
		
		return savedOrder;
	}
}