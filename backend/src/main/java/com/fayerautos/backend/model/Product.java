package com.fayerautos.backend.model;

/*## Table `products`
### Columns
| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `product_category_id` | `int4` |  |
| `product_name` | `varchar` |  |
| `price` | `numeric` |  |
| `stock_quantity` | `int4` |  |
| `brand` | `varchar` |  Nullable |
| `sku` | `varchar` |  Nullable Unique |
| `description` | `text` |  Nullable |
| `created_at` | `timestamp` |  |
*/

import jakarta.persistence.*;
import lombok.*;

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
    private int id;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @Column(name = "product_category_id")
    private int productCategoryId;

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
