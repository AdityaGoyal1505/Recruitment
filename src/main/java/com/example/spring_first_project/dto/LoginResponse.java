package com.example.spring_first_project.dto;

public class LoginResponse {
    private String token;
    private String username;
    private String role;
    private Long id;

    public LoginResponse(String token, String username, String role,Long id) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.id=id;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
