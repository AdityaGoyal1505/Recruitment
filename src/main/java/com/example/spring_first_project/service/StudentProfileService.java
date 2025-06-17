package com.example.spring_first_project.service;
import com.example.spring_first_project.Model.*;
import java.util.List;
public interface StudentProfileService {
    StudentProfile createProfile(StudentProfile profile);
    StudentProfile getByUserId(Long userId);
    StudentProfile updateProfile(Long userId, StudentProfile profile);
}

