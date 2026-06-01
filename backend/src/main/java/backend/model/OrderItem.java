package backend.model;

/*## Table `order_items`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `order_id` | `int4` |  |
| `product_id` | `int4` |  |
| `quantity` | `int4` |  |
| `unit_price` | `numeric` |  |
| `created_at` | `timestamp` |  Nullable |
 */

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "quantity")
    private int quantity;
}
