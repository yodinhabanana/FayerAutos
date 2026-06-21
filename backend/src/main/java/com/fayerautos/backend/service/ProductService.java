package com.fayerautos.backend.service;

import com.fayerautos.backend.repository.ProductRepository;
import com.fayerautos.backend.model.Product;
import com.fayerautos.backend.dto.ProductUpdateRequest;

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

    public Product update(Integer id, ProductUpdateRequest req) {

        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        product.setProductName(req.getProductName());
        product.setPrice(req.getPrice());
        product.setDescription(req.getDescription());
        product.setBrand(req.getBrand());
        product.setSku(req.getSku());
        product.setStockQuantity(req.getStockQuantity());
        product.setProductCategoryId(req.getProductCategoryId());

        return productRepository.save(product);
    }

}
