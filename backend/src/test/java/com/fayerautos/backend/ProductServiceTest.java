package com.fayerautos.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fayerautos.backend.dto.ProductCreateRequest;
import com.fayerautos.backend.dto.ProductUpdateRequest;
import com.fayerautos.backend.model.Product;
import com.fayerautos.backend.repository.ProductRepository;
import com.fayerautos.backend.service.ProductService;

@ExtendWith(MockitoExtension.class)

public class ProductServiceTest {

    @InjectMocks
    private ProductService productService;

    @Mock
    private ProductRepository productRepository;

    @Test
    void deveCriarProduto() {
        ProductCreateRequest req = new ProductCreateRequest();
        req.setProductName("Notebook");
        req.setPrice(2000.0);

        Product saved = new Product();
        saved.setProductName("Notebook");
        saved.setActive(true);

        when(productRepository.save(any(Product.class))).thenReturn(saved);

        Product result = productService.create(req);

        assertEquals("Notebook", result.getProductName());
        assertTrue(result.isActive());
    }

    @Test
    void deveAtualizarProduto() {
        Product existing = new Product();
        existing.setProductName("Antigo");

        ProductUpdateRequest req = new ProductUpdateRequest();
        req.setProductName("Novo");
        req.setPrice(100.0);

        when(productRepository.findById(1)).thenReturn(Optional.of(existing));
        when(productRepository.save(any(Product.class))).thenReturn(existing);

        Product result = productService.update(1, req);

        assertEquals("Novo", result.getProductName());
        assertEquals(100.0, result.getPrice());
    }
    
    @Test
    void deveInativarProduto() {
        Product product = new Product();
        product.setActive(true);

        when(productRepository.findById(1)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        Product result = productService.deleteLogic(1);

        assertFalse(result.isActive());
    }

    @Test
    void deveLancarExcecaoQuandoProdutoNaoExiste() {
        when(productRepository.findById(1)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            productService.delete(1);
        });
    }

    



}
