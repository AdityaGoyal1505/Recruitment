
package com.example.spring_first_project.Controller;

import com.example.spring_first_project.Model.JobPost;
import com.example.spring_first_project.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterJobController {

    @Autowired
    private JobPostService jobPostService;

    // Create job for recruiter
    @PostMapping("/{recruiterId}/create/jobs")
    public ResponseEntity<JobPost> createJob(@PathVariable Long recruiterId, @RequestBody JobPost job) {
        JobPost savedJob = jobPostService.createJobByRecruiter(recruiterId, job);
        return ResponseEntity.ok(savedJob);
    }

    // Get all jobs by recruiter
    @GetMapping("/{recruiterId}/jobs")
    public ResponseEntity<List<JobPost>> getJobsByRecruiter(@PathVariable Long recruiterId) {
        List<JobPost> jobs = jobPostService.getJobsByRecruiterId(recruiterId);
        return ResponseEntity.ok(jobs);
    }

    // Update a specific job
    @PutMapping("/jobs/{jobId}")
    public ResponseEntity<JobPost> updateJob(@PathVariable Long jobId, @RequestBody JobPost job) {
        JobPost updatedJob = jobPostService.updateJob(jobId, job);
        return ResponseEntity.ok(updatedJob);
    }

    // Delete a job
    @DeleteMapping("/jobs/{jobId}")
    public ResponseEntity<String> deleteJob(@PathVariable Long jobId) {
        jobPostService.deleteJob(jobId);
        return ResponseEntity.ok("Job deleted successfully");
    }
}
