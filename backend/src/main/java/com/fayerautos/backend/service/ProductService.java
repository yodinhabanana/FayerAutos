package com.fayerautos.backend.service;

import com.fayerautos.backend.repository.ProductRepository;
import com.fayerautos.backend.model.Product;
import com.fayerautos.backend.dto.ProductCreateRequest;
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

    public List<Product> getActiveProducts() {
        return productRepository.findActiveProducts();
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
        product.setImageUrl(req.getImageUrl());

        return productRepository.save(product);
    }

    public void delete(Integer id){
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        productRepository.delete(product);

    }

    public Product deleteLogic(Integer id){
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        product.setActive(false);

        return productRepository.save(product);
    }

    public Product create(ProductCreateRequest req) {
        Product product = new Product();

        product.setProductName(req.getProductName());
        product.setPrice(req.getPrice());
        product.setDescription(req.getDescription());
        product.setBrand(req.getBrand());
        product.setSku(req.getSku());
        product.setStockQuantity(req.getStockQuantity());
        product.setProductCategoryId(req.getProductCategoryId());
        
        product.setActive(true); 

        return productRepository.save(product);
    }

    public List<Product> findByCategory(Integer categoryId) {
        return productRepository.findByProductCategoryIdAndActiveTrue(categoryId);
    }
}
