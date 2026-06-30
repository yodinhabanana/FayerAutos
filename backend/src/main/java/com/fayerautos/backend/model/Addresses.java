package com.fayerautos.backend.model;

/*## Table `addresses`

### Columns

| Name | Type | ConstraIntegers |
|------|------|-------------|
| `id` | `Integer4` | Primary Identity |
| `user_id` | `Integer4` |  |
| `street` | `varchar` |  Nullable |
| `number` | `varchar` |  Nullable |
| `neighborhood` | `varchar` |  Nullable |
| `city` | `varchar` |  Nullable |
| `state` | `varchar` |  Nullable |
| `zip_code` | `varchar` |  Nullable |
| `complement` | `varchar` |  Nullable |
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
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Addresses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

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
