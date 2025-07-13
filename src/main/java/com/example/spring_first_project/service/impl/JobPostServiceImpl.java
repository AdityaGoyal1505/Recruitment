package com.example.spring_first_project.service.impl;

import com.example.spring_first_project.Model.JobPost;
import com.example.spring_first_project.Model.RecruiterProfile;
import com.example.spring_first_project.repository.JobPostRepository;
import com.example.spring_first_project.repository.RecruiterProfileRepository;
import com.example.spring_first_project.service.JobPostService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostServiceImpl implements JobPostService {
    private final JobPostRepository jobPostRepository;
    private final RecruiterProfileRepository recruiterProfileRepository;

    public JobPostServiceImpl(JobPostRepository jobPostRepository,
                              RecruiterProfileRepository recruiterProfileRepository) {
        this.jobPostRepository = jobPostRepository;
        this.recruiterProfileRepository = recruiterProfileRepository;
    }

    @Override
    public JobPost createJob(JobPost job) {
        return jobPostRepository.save(job);
    }

    @Override
    public JobPost getJobById(Long id) {
        return jobPostRepository.findById(id).orElse(null);
    }

    @Override
    public List<JobPost> getAllJobs() {
        return jobPostRepository.findAll();
    }

    @Override
    public JobPost updateJob(Long id, JobPost job) {
        return jobPostRepository.findById(id)
                .map(existing -> {
                    existing.setJob_title(job.getJob_title());
                    existing.setDescription(job.getDescription());
                    existing.setCompany(job.getCompany());
                    existing.setLocation(job.getLocation());
                    existing.setJob_type(job.getJob_type());
                    existing.setSalary(job.getSalary());
                    existing.setQualification(job.getQualification());
                    existing.setName(job.getName());
                    existing.setPhone(job.getPhone());
                    existing.setEmail(job.getEmail());
                    existing.setSkills_required(job.getSkills_required());
                    return jobPostRepository.save(existing);
                }).orElse(null);
    }

    @Override
    public void deleteJob(Long id) {
        jobPostRepository.deleteById(id);
    }

    @Override
    public JobPost createJobByRecruiter(Long recruiterId, JobPost job) {
        RecruiterProfile recruiter = recruiterProfileRepository.findById(recruiterId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Recruiter not found with ID: " + recruiterId));
        job.setRecruiter(recruiter);
        return jobPostRepository.save(job);
    }

    @Override
    public List<JobPost> getJobsByRecruiterId(Long recruiterId) {
        if (!recruiterProfileRepository.existsById(recruiterId)) {
            throw new EntityNotFoundException(
                    "Recruiter not found with ID: " + recruiterId);
        }
        return jobPostRepository.findByRecruiterId(recruiterId);
    }
}
