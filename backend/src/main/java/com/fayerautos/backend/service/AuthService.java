package com.fayerautos.backend.service;

import com.fayerautos.backend.dto.LoginRequest;
import com.fayerautos.backend.dto.RegisterRequest;
import com.fayerautos.backend.model.UserAccount;
import com.fayerautos.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserAccount register(
        RegisterRequest request
    ) {

        UserAccount user =
            UserAccount.builder()
                .fullName(request.getFullName())
                .birthDate(request.getBirthDate())
                .email(request.getEmail())
                .document(request.getDocument())
                .gender(request.getGender())
                .username(request.getUsername())
                .passwordHash(
                    passwordEncoder.encode(
                        request.getPassword()
                    )
                )
                .userRoleId(1)
                .build();

        return userRepository.save(user);
    }

    public String login(LoginRequest request) {
        UserAccount user = userRepository
            .findByUsername(request.getUsername())
            .orElseThrow(
                () ->
                    new RuntimeException(
                        "User not found with username: " +
                        request.getUsername()
                    )
            );

        if (!passwordEncoder.matches(
            request.getPassword(),
            user.getPasswordHash()
        )) {

        throw new RuntimeException(
            "Senha inválida"
        );
    }
    
        return new JwtService().generateToken(user);
    }

}