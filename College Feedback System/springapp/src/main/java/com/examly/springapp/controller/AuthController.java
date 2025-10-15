package com.examly.springapp.controller;

import com.examly.springapp.dto.LoginRequest;
import com.examly.springapp.dto.RegisterRequest;
import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@Tag(name = "Authentication", description = "User authentication operations")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    @Operation(
        summary = "User login", 
        description = "Authenticate user with username and password",
        requestBody = @RequestBody(
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = LoginRequest.class)
            )
        ),
        responses = {
            @ApiResponse(responseCode = "200", description = "Login successful"),
            @ApiResponse(responseCode = "400", description = "Invalid credentials")
        }
    )
    public ResponseEntity<?> login(@org.springframework.web.bind.annotation.RequestBody LoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();
        
        User user = userService.authenticate(username, password);
        if (user != null) {
            return ResponseEntity.ok(Map.of(
                "success", true,
                "username", user.getUsername(),
                "role", user.getRole().toString(),
                "fullName", user.getFullName()
            ));
        }
        return ResponseEntity.badRequest().body("Invalid credentials");
    }

    @PostMapping("/register")
    @Operation(
        summary = "User registration", 
        description = "Register a new user account",
        requestBody = @RequestBody(
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = RegisterRequest.class)
            )
        ),
        responses = {
            @ApiResponse(responseCode = "200", description = "Registration successful"),
            @ApiResponse(responseCode = "400", description = "Registration failed")
        }
    )
    public ResponseEntity<?> register(@org.springframework.web.bind.annotation.RequestBody RegisterRequest request) {
        try {
            String username = request.getUsername();
            String email = request.getEmail();
            String fullName = request.getFullName();
            
            if (username == null || username.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Username is required");
            }
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email is required");
            }

            
            if (userService.existsByUsername(username)) {
                return ResponseEntity.badRequest().body("Username already exists");
            }
            if (userService.existsByEmail(email)) {
                return ResponseEntity.badRequest().body("Email already exists");
            }

            User user = new User();
            user.setUsername(username.trim());
            user.setPassword(request.getPassword());
            user.setEmail(email.trim());
            user.setFullName(fullName != null ? fullName.trim() : "");
            user.setRole(com.examly.springapp.model.Role.valueOf(request.getRole()));
            
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
}