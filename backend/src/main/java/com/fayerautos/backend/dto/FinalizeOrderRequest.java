package com.fayerautos.backend.dto;

import lombok.Data;

@Data
public class FinalizeOrderRequest {

    private Integer customerId;

    private String cep;
    private String rua;
    private String numero;
    private String bairro;
    private String cidade;

    // se quiser
    // private String metodoPagamento;
}