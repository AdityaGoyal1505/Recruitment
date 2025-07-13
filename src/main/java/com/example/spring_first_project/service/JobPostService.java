package com.example.spring_first_project.service;
import com.example.spring_first_project.Model.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JobPostService {
    JobPost createJob(JobPost job);
    JobPost getJobById(Long id);
    List<JobPost> getAllJobs();
    JobPost updateJob(Long id, JobPost job);
    void deleteJob(Long id);
    //List<JobPost> getFeaturedJobs();
    //List<JobPost> getLatestJobs();
    JobPost createJobByRecruiter(Long recruiterId, JobPost job);
    List<JobPost> getJobsByRecruiterId(Long recruiterId);
}
