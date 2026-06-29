package com.fayerautos.backend.model;

/*## Table `products`
### Columns
| Name | Type | ConstraIntegers |
|------|------|-------------|
| `id` | `Integer4` | Primary Identity |
| `product_category_id` | `Integer4` |  |
| `product_name` | `varchar` |  |
| `price` | `numeric` |  |
| `stock_quantity` | `Integer4` |  |
| `brand` | `varchar` |  Nullable |
| `sku` | `varchar` |  Nullable Unique |
| `description` | `text` |  Nullable |
| `created_at` | `timestamp` |  |
*/

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "product_category_id")
    private Integer productCategoryId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "brand")
    private String brand;

    @Column(name = "sku")
    private String sku;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "active")
    private boolean active;

    @Column(name = "url_image")
    private String imageUrl;
}
