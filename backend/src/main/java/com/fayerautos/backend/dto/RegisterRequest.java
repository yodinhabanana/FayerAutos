package com.fayerautos.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private String fullName;
    private String birthDate;
    private String email;
    private String document;
    private String gender;
    private String username;
    private String password;

}