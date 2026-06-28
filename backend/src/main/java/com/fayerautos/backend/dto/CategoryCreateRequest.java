package com.fayerautos.backend.dto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CategoryCreateRequest {

    private String categoryName;
    private String description;
    
}