package com.fayerautos.backend.controller;

import com.fayerautos.backend.model.ProductCategory;
import com.fayerautos.backend.service.ProductCategoryService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/categories")
public class ProductCategoryController {
    
    private final ProductCategoryService productCategoryService;

    private ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    public List<ProductCategory> getProductCategories(){
        return productCategoryService.getAllProductCategories();   
    }

}   
    
