package backend.model;

/*## Table `contacts`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `user_id` | `int4` |  |
| `telephone` | `varchar` |  |
| `created_at` | `timestamp` |  |
 */

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "contacts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "telephone")
    private String telephone;
}
