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
    public Application applyToJob(ApplicationRequest request) {
        StudentProfile student = studentProfileRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
    
        JobPost job = jobPostRepository.findById(request.getJobId())
                .orElseThrow(() -> new EntityNotFoundException("Job not found"));
    
        Application app = new Application();
        app.setStudent(student);
        app.setJob(job);
        app.setAppliedAt(LocalDateTime.now());
        app.setStatus("PENDING");
    
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


}
