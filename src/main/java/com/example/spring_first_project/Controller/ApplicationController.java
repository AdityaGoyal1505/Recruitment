package com.example.spring_first_project.Controller;

import com.example.spring_first_project.Model.Application;
import com.example.spring_first_project.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")

public class ApplicationController {

    @Autowired
    private ApplicationService appService;

    @PostMapping("/apply")
    public ResponseEntity<Application> apply(@RequestBody Application application) {
        return ResponseEntity.ok(appService.applyToJob(application));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Application>> getApplicationsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(appService.getApplicationsByStudent(studentId));
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsForJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(appService.getApplicationsByJob(jobId));
    }

    @DeleteMapping("/{appId}")
    public ResponseEntity<Void> withdraw(@PathVariable Long appId) {
        appService.withdrawApplication(appId);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/recruiter/{recruiterId}")
    public ResponseEntity<List<Application>> getApplicationsByRecruiter(@PathVariable Long recruiterId) {
        return ResponseEntity.ok(appService.getApplicationsByRecruiter(recruiterId));
    }

}

