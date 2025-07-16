package com.example.spring_first_project.Controller;

import com.cloudinary.Cloudinary;
import com.example.spring_first_project.Model.StudentProfile;
import com.example.spring_first_project.Model.User;
import com.example.spring_first_project.repository.StudentProfileRepository;
import com.example.spring_first_project.repository.UserRepository;
import com.example.spring_first_project.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentProfileController {

    @Autowired
    private StudentProfileService studentService;

    @Autowired
    private StudentProfileRepository studentRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private Cloudinary cloudinary;

    // ✅ Multipart form handler for complete profile submission (with resume)
    @PostMapping(value = "/create", consumes = "multipart/form-data")
    public ResponseEntity<?> createProfileWithResume(
            @RequestParam Long userId,
            @RequestParam String fullName,
            @RequestParam String branch,
            @RequestParam String skills,
            @RequestParam String bio,
            @RequestParam MultipartFile resume
    ) throws IOException {

        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body("User not found");

        // ✅ Upload resume to Cloudinary
        String fileName = "resumes/resume_" + fullName.toLowerCase().replaceAll("\\s+", "_");
        Map uploadResult = cloudinary.uploader().uploadLarge(resume.getInputStream(), Map.of(
                "resource_type", "raw",
                "public_id", fileName,
                "overwrite", true
        ));
        String resumeUrl = (String) uploadResult.get("secure_url");

        // ✅ Create and save student profile
        StudentProfile student = new StudentProfile();
        student.setUser(userOpt.get());
        student.setFullName(fullName);
        student.setBranch(branch);
        student.setSkills(skills);
        student.setBio(bio);
        student.setResumeLink(resumeUrl);

        StudentProfile savedProfile = studentService.createProfile(student);
        return ResponseEntity.ok(savedProfile);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<StudentProfile> getProfile(@PathVariable Long userId) {
        return ResponseEntity.ok(studentService.getByUserId(userId));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<StudentProfile> update(@PathVariable Long userId, @RequestBody StudentProfile updated) {
        return ResponseEntity.ok(studentService.updateProfile(userId, updated));
    }

    @PostMapping("/{id}/upload-resume")
    public ResponseEntity<String> uploadResume(@PathVariable Long id, @RequestParam MultipartFile file) throws IOException {
        Optional<StudentProfile> studentOpt = studentRepo.findById(id);
        if (studentOpt.isEmpty()) return ResponseEntity.notFound().build();

        StudentProfile student = studentOpt.get();
        String fileName = "resumes/resume_" + student.getFullName().toLowerCase().replaceAll("\\s+", "_") + ".pdf";

        Map uploadResult = cloudinary.uploader().uploadLarge(file.getInputStream(), Map.of(
                "resource_type", "raw",
                "public_id", fileName,
                "overwrite", true
        ));
        String resumeUrl = (String) uploadResult.get("secure_url");

        student.setResumeLink(resumeUrl);
        studentRepo.save(student);

        return ResponseEntity.ok(resumeUrl);
    }

    @PutMapping("/{id}/resume-link")
    public ResponseEntity<String> saveResumeLink(@PathVariable Long id, @RequestParam String resumeLink) {
        Optional<StudentProfile> studentOpt = studentRepo.findById(id);
        if (studentOpt.isEmpty()) return ResponseEntity.notFound().build();

        StudentProfile student = studentOpt.get();
        student.setResumeLink(resumeLink);
        studentRepo.save(student);

        return ResponseEntity.ok("Resume link saved successfully.");
    }
}
