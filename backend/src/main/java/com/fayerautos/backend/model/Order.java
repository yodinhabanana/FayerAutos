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
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "status")
    private String status;

    @Column(name = "order_code")
    private String orderCode;

    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "delivery_address_id")
    private Integer deliveryAddressId;
}
