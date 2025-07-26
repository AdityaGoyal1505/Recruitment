package com.example.spring_first_project.service.impl;


import com.example.spring_first_project.Model.Application;
import com.example.spring_first_project.Model.JobPost;
import com.example.spring_first_project.Model.StudentProfile;
import com.example.spring_first_project.repository.ApplicationRepository;
import com.example.spring_first_project.repository.JobPostRepository;
import com.example.spring_first_project.repository.StudentProfileRepository;
import com.example.spring_first_project.service.ApplicationService;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private JobPostRepository jobPostRepository;
    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @Override
    public Application applyToJob(Application app) {
        // Fetch full StudentProfile
        StudentProfile student = studentProfileRepository.findById(app.getStudent().getId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));

        // Fetch full JobPost
        JobPost job = jobPostRepository.findById(app.getJob().getId())
                .orElseThrow(() -> new EntityNotFoundException("Job not found"));

        app.setStudent(student);
        app.setJob(job);
        app.setAppliedAt(LocalDateTime.now());

        return applicationRepository.save(app);
    }

    @Override
    public List<Application> getApplicationsByStudent(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    @Override
    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }


    @Override
    public void withdrawApplication(Long appId) {
        if (applicationRepository.existsById(appId)) {
            applicationRepository.deleteById(appId);
        } else {
            throw new EntityNotFoundException("Application with ID " + appId + " not found.");
        }
    }
    @Override
    public List<Application> getApplicationsByRecruiter(Long recruiterId) {
        return applicationRepository.findByJobRecruiterId(recruiterId);
    }
    @Override
    public Application updateApplicationStatus(Long appId, String status,Long recruiterId) {
        Application application = applicationRepository.findById(appId)
                .orElseThrow(() -> new EntityNotFoundException("Application not found"));

        Long jobRecruiterId = application.getJob().getRecruiter().getId();



        if (!jobRecruiterId.equals(jobRecruiterId)) {
            throw new SecurityException("You are not authorized to update this application.");
        }

        if (!status.equalsIgnoreCase("SELECTED") && !status.equalsIgnoreCase("REJECTED")) {
            throw new IllegalArgumentException("Invalid status. Use SELECTED or REJECTED.");
        }

        application.setStatus(status.toUpperCase());
        return applicationRepository.save(application);
    }




}
