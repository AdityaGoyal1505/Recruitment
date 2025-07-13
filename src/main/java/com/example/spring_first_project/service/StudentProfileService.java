package com.example.spring_first_project.service;
import com.example.spring_first_project.Model.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StudentProfileService {
    StudentProfile createProfile(StudentProfile profile);
    StudentProfile getByUserId(Long userId);
    StudentProfile updateProfile(Long userId, StudentProfile profile);
}

