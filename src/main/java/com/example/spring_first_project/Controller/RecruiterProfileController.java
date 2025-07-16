package com.example.spring_first_project.Controller;

import com.example.spring_first_project.Model.RecruiterProfile;
import com.example.spring_first_project.service.RecruiterProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import com.example.spring_first_project.Model.User;
import com.example.spring_first_project.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterProfileController {

    @Autowired
    private RecruiterProfileService recruiterService;
    @Autowired
    private UserRepository userRepository;
    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody RecruiterProfile profile) {
        try {
            // Extract user ID from request body
            Long userId = profile.getUser().getId();
    
            // Fetch managed user from DB
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
    
            // Ensure the recruiter profile uses the managed User entity
            profile.setUser(user);
            profile.setId(userId); // Important: because you're using @MapsId
    
            RecruiterProfile savedProfile = recruiterService.createProfile(profile);
            return ResponseEntity.ok(savedProfile);
    
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Optional: for debugging
            return ResponseEntity.internalServerError().body("Error while creating recruiter profile: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<RecruiterProfile> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(recruiterService.getByUserId(userId));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<RecruiterProfile> update(@PathVariable Long userId, @RequestBody RecruiterProfile updated) {
        return ResponseEntity.ok(recruiterService.updateProfile(userId, updated));
    }
}

