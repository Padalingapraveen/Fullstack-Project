package com.examly.springapp.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Registration request payload")
public class RegisterRequest {
    
    @Schema(description = "Username", example = "newuser")
    private String username;
    
    @Schema(description = "Password", example = "password123")
    private String password;
    
    @Schema(description = "Email address", example = "user@example.com")
    private String email;
    
    @Schema(description = "Full name", example = "John Doe")
    private String fullName;
    
    @Schema(description = "User role", example = "STUDENT", allowableValues = {"ADMIN", "FACULTY", "STUDENT"})
    private String role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}