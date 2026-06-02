package com.fayerautos.backend.model;

/*## Table `user_accounts`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary Identity |
| `full_name` | `varchar` |  |
| `birth_date` | `date` |  |
| `email` | `varchar` |  Unique |
| `document` | `bpchar` |  Unique |
| `gender` | `bpchar` |  Nullable |
| `username` | `varchar` |  Unique |
| `password_hash` | `varchar` |  |
| `user_role_id` | `int4` |  |
| `created_at` | `timestamp` |  |
 */

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "birth_date")
    private String birthDate;

    @Column(name = "email")
    private String email;

    @Column(name = "document")
    private String document;

    @Column(name = "gender")
    private String gender;

    @Column(name = "username")
    private String username;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "user_role_id")
    private int userRoleId;
}
