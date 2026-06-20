package com.fayerautos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fayerautos.backend.model.Product;


public interface ProductRepository extends JpaRepository<Product, Integer> {
    
}
