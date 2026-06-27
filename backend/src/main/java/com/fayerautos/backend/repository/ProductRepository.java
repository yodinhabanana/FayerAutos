package com.fayerautos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fayerautos.backend.model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT p FROM Product p WHERE p.active = true")
    List<Product> findActiveProducts();

    List<Product> findByProductCategoryIdAndActiveTrue(Integer productCategoryId);
}