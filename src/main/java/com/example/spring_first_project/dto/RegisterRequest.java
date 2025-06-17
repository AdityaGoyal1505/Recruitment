package com.example.spring_first_project.dto;
import lombok.*;
@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String role;
}
