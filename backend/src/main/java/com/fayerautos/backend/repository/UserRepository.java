package com.fayerautos.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fayerautos.backend.model.UserAccount;

public interface UserRepository
    extends JpaRepository<UserAccount, Integer> {

    Optional<UserAccount> findByUsername(
        String username
    );

    Optional<UserAccount> findByEmail(
        String email
    );
}