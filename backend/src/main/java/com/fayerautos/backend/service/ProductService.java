package com.fayerautos.backend.service;

import com.fayerautos.backend.repository.ProductRepository;
import com.fayerautos.backend.model.Product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

}
