package com.fayerautos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fayerautos.backend.model.ProductCategory;


public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
    
}
