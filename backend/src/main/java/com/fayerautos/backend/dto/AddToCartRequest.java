package com.fayerautos.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddToCartRequest {

    private Integer orderId;
    private Integer productId;
    private Integer quantity;
}