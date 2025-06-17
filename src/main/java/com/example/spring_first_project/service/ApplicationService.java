package com.example.spring_first_project.service;
import com.example.spring_first_project.Model.*;
import java.util.List;
public interface ApplicationService {
    Application applyToJob(Application app);
    List<Application> getApplicationsByStudent(Long studentId);
    List<Application> getApplicationsByJob(Long jobId);
    void withdrawApplication(Long appId);
}
