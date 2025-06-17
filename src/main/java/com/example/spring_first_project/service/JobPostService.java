package com.example.spring_first_project.service;
import com.example.spring_first_project.Model.*;
import java.util.List;
public interface JobPostService {
    JobPost createJob(JobPost job);
    JobPost getJobById(Long id);
    List<JobPost> getAllJobs();
    JobPost updateJob(Long id, JobPost job);
    void deleteJob(Long id);
    List<JobPost> getFeaturedJobs();
    List<JobPost> getLatestJobs();
}
