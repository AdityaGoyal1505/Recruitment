package com.example.spring_first_project.Controller;

import com.example.spring_first_project.Model.Application;
import com.example.spring_first_project.service.ApplicationService;
import com.example.spring_first_project.dto.ApplicationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")

public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<Application> apply(@RequestBody ApplicationRequest request) {
        Application savedApp = applicationService.applyToJob(request);
        return ResponseEntity.ok(savedApp);
    }
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Application>> getApplicationsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(applicationService.getApplicationsByStudent(studentId));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsForJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId));
    }

    @DeleteMapping("/{appId}")
    public ResponseEntity<Void> withdraw(@PathVariable Long appId) {
        applicationService.withdrawApplication(appId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/recruiter/{recruiterId}")
    public ResponseEntity<List<Application>> getApplicationsByRecruiter(@PathVariable Long recruiterId) {
        return ResponseEntity.ok(applicationService.getApplicationsByRecruiter(recruiterId));
    }

}

