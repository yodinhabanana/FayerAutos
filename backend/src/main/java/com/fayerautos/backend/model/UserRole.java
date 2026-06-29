package com.fayerautos.backend.model;

/*## Table `user_roles`

### Columns

| Name | Type | ConstraIntegers |
|------|------|-------------|
| `id` | `Integer4` | Primary Identity |
| `role_name` | `varchar` |  Unique |
| `created_at` | `timestamp` |  |
| `description` | `varchar` |  |
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
@Table(name = "user_roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "role_name")
    private String roleName;

    @Column(name = "description")
    private String description;
}
