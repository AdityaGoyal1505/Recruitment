package com.example.spring_first_project.Controller;

import com.example.spring_first_project.Model.RecruiterProfile;
import com.example.spring_first_project.service.RecruiterProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterProfileController {

    @Autowired
    private RecruiterProfileService recruiterService;

    @PostMapping("/create")
    public ResponseEntity<RecruiterProfile> create(@RequestBody RecruiterProfile profile) {
        return ResponseEntity.ok(recruiterService.createProfile(profile));
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

