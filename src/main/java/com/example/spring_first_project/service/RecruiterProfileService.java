package com.example.spring_first_project.service;
import com.example.spring_first_project.Model.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RecruiterProfileService {
    RecruiterProfile createProfile(RecruiterProfile profile);
    RecruiterProfile getByUserId(Long userId);
    RecruiterProfile updateProfile(Long userId, RecruiterProfile profile);
}
