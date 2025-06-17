package com.example.spring_first_project.Controller;

import com.example.spring_first_project.Model.JobPost;
import com.example.spring_first_project.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobPostController {

    @Autowired
    private JobPostService jobService;

    @PostMapping("/create")
    public ResponseEntity<JobPost> create(@RequestBody JobPost jobPost) {
        return ResponseEntity.ok(jobService.createJob(jobPost));
    }

    @GetMapping("/all")
    public ResponseEntity<List<JobPost>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobPost> getJob(@PathVariable Long jobId) {
        return ResponseEntity.ok(jobService.getJobById(jobId));
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<JobPost> update(@PathVariable Long jobId, @RequestBody JobPost updated) {
        return ResponseEntity.ok(jobService.updateJob(jobId, updated));
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> delete(@PathVariable Long jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.noContent().build();
    }
}

