package com.example.spring_first_project.service;
import com.example.spring_first_project.Model.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ApplicationService {
    Application applyToJob(Application app);
    List<Application> getApplicationsByStudent(Long studentId);
    List<Application> getApplicationsByJob(Long jobId);
    List<Application> getApplicationsByRecruiter(Long recruiterId);
    void withdrawApplication(Long appId);
}
