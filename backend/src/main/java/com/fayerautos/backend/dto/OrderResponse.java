package com.fayerautos.backend.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OrderResponse {
    private Integer id;
    private String orderCode;
    private String status;
    private LocalDateTime createdAt;
    private Double totalPrice;
    private String itemsSummary;
    private String deliveryAddress;
    private List<OrderItemResponse> items; // Caso queira listar os itens detalhados no futuro
}