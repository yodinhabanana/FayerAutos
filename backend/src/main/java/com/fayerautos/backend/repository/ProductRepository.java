package com.fayerautos.backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fayerautos.backend.model.Product;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
}
