package com.fayerautos.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fayerautos.backend.model.ProductCategory;


public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
    @Query("SELECT c FROM ProductCategory c WHERE c.categoryName = :name")
    List<ProductCategory> findByName(String name);
}
