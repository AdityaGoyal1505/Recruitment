package com.example.spring_first_project.Controller;

import com.cloudinary.Cloudinary;
import com.example.spring_first_project.Model.StudentProfile;
import com.example.spring_first_project.repository.StudentProfileRepository;
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
    private Cloudinary cloudinary;
    @Autowired
    private StudentProfileRepository studentRepo;

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
    @PostMapping("/{id}/upload-resume")
    public ResponseEntity<String> uploadResume(@PathVariable Long id, @RequestParam MultipartFile file) throws IOException {
        Optional<StudentProfile> studentOpt = studentRepo.findById(id);
        if (studentOpt.isEmpty()) return ResponseEntity.notFound().build();


        StudentProfile student = studentOpt.get();
        String fileName = "resumes/resume_" + student.getFullName().toLowerCase().replaceAll("\\s+", "_") + ".pdf";


        Map uploadResult = cloudinary.uploader().uploadLarge(file.getInputStream(), Map.of("resource_type", "raw","public_id",fileName, "overwrite",true));
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

