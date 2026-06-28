package com.fayerautos.backend.controller;

import com.fayerautos.backend.model.Product;
import com.fayerautos.backend.service.ProductService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import com.fayerautos.backend.dto.ProductCreateRequest;
import com.fayerautos.backend.dto.ProductUpdateRequest;
import org.springframework.web.bind.annotation.PostMapping;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")

public class ProductController {
    
    private final ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getProducts(@RequestParam(name = "category", required = false) Integer categoryId) {
        if (categoryId != null) {
            return productService.findByCategory(categoryId);
        }
        return productService.getActiveProducts();
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Integer id, @RequestBody ProductUpdateRequest request) {

        return productService.update(id, request);
    }

    @DeleteMapping("/del/{id}")
    public void delete(@PathVariable Integer id){
        productService.delete(id);
    }

    @PutMapping("/deleteLogic/{id}")
        public Product deleteLogic(@PathVariable Integer id) {
            return productService.deleteLogic(id);
    }

    @PostMapping("/create-new-product")
    public Product create(@RequestBody ProductCreateRequest request) {
        return productService.create(request);
    }
}   
    
