package com.fayerautos.backend.controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fayerautos.backend.dto.RegisterRequest;

import com.fayerautos.backend.model.UserAccount;

import com.fayerautos.backend.service.AuthService;
import com.fayerautos.backend.dto.LoginRequest;

import com.fayerautos.backend.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;

    public AuthController(
        AuthService authService
    ) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public UserAccount register(
        @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(
        @RequestBody LoginRequest request
    ) {

        String token =
            authService.login(request);

        return new LoginResponse(token);
    }

}