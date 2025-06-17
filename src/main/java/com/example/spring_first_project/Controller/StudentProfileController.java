package com.example.spring_first_project.Controller;

import com.example.spring_first_project.Model.StudentProfile;
import com.example.spring_first_project.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentProfileController {

    @Autowired
    private StudentProfileService studentService;

    @PostMapping("/create")
    public ResponseEntity<StudentProfile> create(@RequestBody StudentProfile student) {
        return ResponseEntity.ok(studentService.createProfile(student));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<StudentProfile> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(studentService.getByUserId(userId));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<StudentProfile> update(@PathVariable Long userId, @RequestBody StudentProfile updated) {
        return ResponseEntity.ok(studentService.updateProfile(userId, updated));
    }
}

