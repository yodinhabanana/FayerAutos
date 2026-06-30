package com.fayerautos.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fayerautos.backend.dto.OrderRequest;
import com.fayerautos.backend.model.Addresses;
import com.fayerautos.backend.model.Order;
import com.fayerautos.backend.repository.AddressesRepository;
import com.fayerautos.backend.repository.OrderRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

	private final OrderRepository orderRepository;
	private final AddressesRepository addressRepository;
    private final CartService cartService;

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
        
        // 1. Instancia e salva o endereço enviado pelo front-end
        Addresses address = Addresses.builder()
        .street(dto.getStreet())
        .number(dto.getNumber())
        .neighborhood(dto.getNeighborhood())
        .city(dto.getCity())
        .state(dto.getState())
        .zipCode(dto.getZipCode())
        .complement(dto.getComplement())
        .userId(dto.getCustomerId()) // ◄ ADICIONE ESSA LINHA (Vincula o endereço ao ID do cliente)
        .build();

		Addresses savedAddress = addressRepository.save(address);
        

        // 2. Gera um código único amigável para a Ordem (Ex: ORD-8A3F12BC)
        String orderCode = "ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // 3. Cria o objeto Order associando ao ID do endereço que acabou de ser criado
        Order order = Order.builder()
                .customerId(dto.getCustomerId())
                .status("PENDING")
                .orderCode(orderCode)
                .deliveryAddressId(savedAddress.getId()) // <- O ID gerado pelo banco agora está aqui!
                .build();

        Order savedOrder = orderRepository.save(order);

        // 4. Limpa o carrinho temporário usado pelo usuário
        if (dto.getCurrentCartId() != null) {
            cartService.clearCart(dto.getCurrentCartId());
        }

        return savedOrder;
    }
}