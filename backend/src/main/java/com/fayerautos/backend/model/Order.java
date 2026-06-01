package com.fayerautos.backend.model;

/*## Table `orders`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `order_code` | `varchar` |  Unique |
| `customer_id` | `int4` |  |
| `status` | `varchar` |  |
| `delivery_address_id` | `int4` |  |
| `created_at` | `timestamp` |  |
*/

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "status")
    private String status;
}
