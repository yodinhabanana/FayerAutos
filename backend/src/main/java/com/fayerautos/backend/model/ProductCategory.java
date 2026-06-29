package com.fayerautos.backend.model;
/*## Table `product_categories`

### Columns

| Name | Type | ConstraIntegers |
|------|------|-------------|
| `id` | `Integer4` | Primary Identity |
| `created_at` | `timestamp` |  |
| `category_name` | `varchar` |  Unique |
| `description` | `varchar` |  Nullable |
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
@Table(name = "product_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "description")
    private String description;

}
