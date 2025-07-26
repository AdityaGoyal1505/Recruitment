package com.example.spring_first_project.Controller;

import com.example.spring_first_project.dto.LoginRequest;

import com.example.spring_first_project.dto.LoginResponse;
import com.example.spring_first_project.Model.User;
import com.example.spring_first_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.spring_first_project.repository.UserRepository;
import com.example.spring_first_project.security.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.registerUser(user));
    }

    // ✅ Login with JWT token response
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername());

        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        // ✅ Generate JWT token
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        // ✅ Return structured response
        return ResponseEntity.ok(new LoginResponse(
                token,
                user.getUsername(),
                user.getRole(),
                user.getId()
        ));
    }
}
