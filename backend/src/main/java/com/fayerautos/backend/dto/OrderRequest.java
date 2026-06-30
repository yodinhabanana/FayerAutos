package com.fayerautos.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    private Integer customerId;
    private Integer currentCartId; // O ID do "carrinho" atual (ex: 1) para podermos migrar ou limpar os itens
    private String zipCode;
    private String street;
    private String complement;
    private String neighborhood;
    private String city; // cidade
    private String state;
    private String number;

}