package com.fayerautos.backend.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ProductCreateRequest {

    private String productName;
    private Double price;
    private String description;
    private Integer stockQuantity;
    private String brand;
    private String sku;
    private Integer productCategoryId;
    
}