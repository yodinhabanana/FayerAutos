package com.fayerautos.backend.service;

import com.fayerautos.backend.repository.ProductRepository;
import com.fayerautos.backend.model.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

}
