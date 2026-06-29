package com.fayerautos.backend.model;

/*## Table `user_accounts`

### Columns

| Name | Type | ConstraIntegers |
|------|------|-------------|
| `id` | `Integer4` | Primary Identity |
| `full_name` | `varchar` |  |
| `birth_date` | `date` |  |
| `email` | `varchar` |  Unique |
| `document` | `bpchar` |  Unique |
| `gender` | `bpchar` |  Nullable |
| `username` | `varchar` |  Unique |
| `password_hash` | `varchar` |  |
| `user_role_id` | `Integer4` |  |
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
@Table(name = "user_accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

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

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "user_role_id")
    private Integer userRoleId;
}
