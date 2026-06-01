package backend.model;


/*## Table `addresses`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `user_id` | `int4` |  |
| `street` | `varchar` |  Nullable |
| `number` | `varchar` |  Nullable |
| `neighborhood` | `varchar` |  Nullable |
| `city` | `varchar` |  Nullable |
| `state` | `varchar` |  Nullable |
| `zip_code` | `varchar` |  Nullable |
| `complement` | `varchar` |  Nullable |
| `created_at` | `timestamp` |  |
 */

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "adresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "street")
    private String street;

    @Column(name = "number")
    private String number;

    @Column(name = "neighborhood")
    private String neighborhood;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "complement")
    private String complement;

    @Column(name = "zip_code")
    private String zipCode;
}
