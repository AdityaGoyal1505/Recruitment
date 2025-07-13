package com.example.spring_first_project.Controller;

import com.example.spring_first_project.Model.JobPost;
import com.example.spring_first_project.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/home")
public class HomepageController {

    @Autowired
    private JobPostService jobPostService;

//    @GetMapping("/featured")
//    public ResponseEntity<List<JobPost>> getFeaturedJobs() {
//        return ResponseEntity.ok(jobPostService.getFeaturedJobs());
//    }

    //@GetMapping("/latest")
   // public ResponseEntity<List<JobPost>> getLatestJobs() {
      //  return ResponseEntity.ok(jobPostService.getLatestJobs());
    //}
}
