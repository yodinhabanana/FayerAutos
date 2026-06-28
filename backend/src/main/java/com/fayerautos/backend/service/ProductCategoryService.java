package com.fayerautos.backend.service;

import com.fayerautos.backend.repository.ProductCategoryRepository;
import com.fayerautos.backend.dto.CategoryCreateRequest;
import com.fayerautos.backend.model.ProductCategory;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {
    
    private final ProductCategoryRepository productCategoryRepository;

    ProductCategoryService(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public List<ProductCategory> getAllProductCategories() {
        return productCategoryRepository.findAll();
    }

    public ProductCategory saveProductCategory(CategoryCreateRequest req) {
        ProductCategory category = new ProductCategory();
        category.setCategoryName(req.getCategoryName());
        if (req.getDescription() == null || req.getDescription().trim().isEmpty()) {
            category.setDescription(null);
        } else {
            category.setDescription(req.getDescription());
        }
        return productCategoryRepository.save(category);
    }
}
