package com.fayerautos.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.fayerautos.backend.dto.OrderRequest;
import com.fayerautos.backend.dto.OrderResponse;
import com.fayerautos.backend.model.Addresses;
import com.fayerautos.backend.model.Order;
import com.fayerautos.backend.model.OrderItem;
import com.fayerautos.backend.model.Product; // Inserido o import da sua Entidade de Produto
import com.fayerautos.backend.model.UserAccount;
import com.fayerautos.backend.repository.AddressesRepository;
import com.fayerautos.backend.repository.OrderItemRepository;
import com.fayerautos.backend.repository.OrderRepository;
import com.fayerautos.backend.repository.ProductRepository; // Inserido o import do seu repositório de Produto
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
    private final ProductRepository productRepository; // ◄ INJETADO AQUI!

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

	public List<OrderResponse> getAllOrdersProcessed() {
        List<Order> orders = orderRepository.findAll();
        java.util.ArrayList<OrderResponse> responseList = new java.util.ArrayList<>();

        if (orders == null) return responseList;

        for (Order order : orders) {
            if (order == null) continue;

            // 1. Busca os itens da ordem de forma segura
            List<OrderItem> items = java.util.Collections.emptyList();
            if (order.getId() != null) {
                items = orderItemRepository.findByOrderId(order.getId());
            }
            
            double total = 0.0;
            java.util.ArrayList<String> itemStrings = new java.util.ArrayList<>();

            if (items != null) {
                for (OrderItem item : items) {
                    if (item == null) continue;
                    double q = (item.getQuantity() != null) ? item.getQuantity().doubleValue() : 0.0;
                    double p = (item.getUnitPrice() != null) ? item.getUnitPrice().doubleValue() : 0.0;
                    total += (q * p);

                    int pId = (item.getProductId() != null) ? item.getProductId() : 0;
                    
                    String nomeProduto = "Produto #" + pId;
                    if (pId > 0 && productRepository != null) {
                        try {
                            nomeProduto = productRepository.findById(pId)
                                    .map(Product::getProductName) 
                                    .orElse("Produto #" + pId);
                        } catch (Exception e) {
                            // Se der erro ao buscar o produto, não quebra o loop
                            nomeProduto = "Produto #" + pId;
                        }
                    }
                    
                    itemStrings.add((int)q + "x " + nomeProduto);
                }
            }
            
            String summary = String.join(", ", itemStrings);
            if (summary.isEmpty()) {
                summary = "Sem itens cadastrados";
            }

            // 2. Busca o endereço tratando falhas caso o ID não exista na tabela addresses
            String fullAddress = "Retirada na loja ou endereço não encontrado";
            if (order.getDeliveryAddressId() != null) {
                try {
                    Optional<Addresses> addrOpt = addressRepository.findById(order.getDeliveryAddressId());
                    if (addrOpt.isPresent()) {
                        Addresses addr = addrOpt.get();
                        String rua = addr.getStreet() != null ? addr.getStreet() : "";
                        String num = addr.getNumber() != null ? addr.getNumber() : "";
                        String bairro = addr.getNeighborhood() != null ? addr.getNeighborhood() : "";
                        String cidade = addr.getCity() != null ? addr.getCity() : "";
                        String estado = addr.getState() != null ? addr.getState() : "";
                        
                        fullAddress = rua + ", " + num + " - " + bairro + ", " + cidade + " / " + estado;
                    }
                } catch (Exception e) {
                    fullAddress = "Erro ao carregar endereço (ID: " + order.getDeliveryAddressId() + ")";
                }
            }

            OrderResponse responseItem = OrderResponse.builder()
                    .id(order.getId())
                    .orderCode(order.getOrderCode() != null ? order.getOrderCode() : "SEM-CODIGO")
                    .customerId(order.getCustomerId()) // ◄ ADICIONE ESSA LINHA PARA ENVIAR O ID AO FRONTEND!
                    .status(order.getStatus() != null ? order.getStatus() : "PENDING")
                    .totalPrice(total)
                    .itemsSummary(summary)
                    .deliveryAddress(fullAddress)
                    .build();

            responseList.add(responseItem);
        }
                    
        return responseList;
    }

    @Transactional
    public Order finalizeAndCreateOrder(OrderRequest dto) {
        UserAccount customer = userRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + dto.getCustomerId()));

        Addresses address = Addresses.builder()
                .userId(customer.getId())
                .street(dto.getStreet())
                .number(dto.getNumber())
                .neighborhood(dto.getNeighborhood())
                .city(dto.getCity())
                .state(dto.getState())
                .zipCode(dto.getZipCode())
                .complement(dto.getComplement())
                .build();
        
        Addresses savedAddress = addressRepository.save(address);

        Order order = Order.builder()
                .customerId(customer.getId())
                .deliveryAddressId(savedAddress.getId())
                .status("PENDING")
                .orderCode("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .build();
        
        Order savedOrder = orderRepository.save(order);

        List<OrderItem> cartItems = orderItemRepository.findByOrderId(dto.getCurrentCartId());
        
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Não pode esvaziar um carrinho vazio.");
        }

        List<OrderItem> orderItems = cartItems.stream().map(cartItem -> 
            OrderItem.builder()
                    .orderId(savedOrder.getId())
                    .productId(cartItem.getProductId())
                    .quantity(cartItem.getQuantity())
                    .unitPrice(cartItem.getUnitPrice())
                    .build()
        ).toList();

        orderItemRepository.saveAll(orderItems);
        cartService.clearCart(dto.getCurrentCartId());
        
        return savedOrder;
    }

    public List<OrderResponse> getOrdersByCustomerId(Integer customerId) {
        List<Order> orders = orderRepository.findAll().stream()
                .filter(o -> o.getCustomerId() != null && o.getCustomerId().equals(customerId))
                .toList();

        java.util.ArrayList<OrderResponse> responseList = new java.util.ArrayList<>();

        for (Order order : orders) {
            List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
            
            double total = 0.0;
            java.util.ArrayList<String> itemStrings = new java.util.ArrayList<>();

            for (OrderItem item : items) {
                double q = (item.getQuantity() != null) ? item.getQuantity().doubleValue() : 0.0;
                double p = (item.getUnitPrice() != null) ? item.getUnitPrice().doubleValue() : 0.0;
                total += (q * p);

                int pId = (item.getProductId() != null) ? item.getProductId() : 0;
                
                // ◄ CORREÇÃO AQUI: Alterado de Product::getName para Product::getProductName
                String nomeProduto = productRepository.findById(pId)
                        .map(Product::getProductName) 
                        .orElse("Produto #" + pId);
                
                itemStrings.add((int)q + "x " + nomeProduto);
            }
            
            String summary = String.join(", ", itemStrings);
            if (summary.isEmpty()) {
                summary = "Sem itens cadastrados";
            }

            String fullAddress = "Retirada na loja ou endereço não encontrado";
            if (order.getDeliveryAddressId() != null) {
                Optional<Addresses> addrOpt = addressRepository.findById(order.getDeliveryAddressId());
                if (addrOpt.isPresent()) {
                    Addresses addr = addrOpt.get();
                    
                    String rua = addr.getStreet() != null ? addr.getStreet() : "";
                    String num = addr.getNumber() != null ? addr.getNumber() : "";
                    String bairro = addr.getNeighborhood() != null ? addr.getNeighborhood() : "";
                    String cidade = addr.getCity() != null ? addr.getCity() : "";
                    String estado = addr.getState() != null ? addr.getState() : "";
                    
                    fullAddress = rua + ", " + num + " - " + bairro + ", " + cidade + " / " + estado;
                }
            }

            OrderResponse responseItem = OrderResponse.builder()
                    .id(order.getId())
                    .orderCode(order.getOrderCode())
                    .status(order.getStatus())
                    .totalPrice(total)
                    .itemsSummary(summary)
                    .deliveryAddress(fullAddress)
                    .build();

            responseList.add(responseItem);
        }
                    
        return responseList;
    }

	public int updateStatusDirectly(Integer id, String status) {
    	return orderRepository.updateStatusOnly(id, status);
	}
}