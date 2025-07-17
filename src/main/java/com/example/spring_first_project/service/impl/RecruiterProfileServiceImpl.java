package com.example.spring_first_project.service.impl;

import com.example.spring_first_project.Model.RecruiterProfile;
import com.example.spring_first_project.Model.User;
import com.example.spring_first_project.repository.RecruiterProfileRepository;
import com.example.spring_first_project.repository.UserRepository;
import com.example.spring_first_project.service.RecruiterProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class RecruiterProfileServiceImpl implements RecruiterProfileService {

    @Autowired
    private RecruiterProfileRepository recruiterRepo;

    @Autowired
    private UserRepository userRepo;

   @Override
    public RecruiterProfile createProfile(RecruiterProfile profile) {
        Long userId = profile.getUser().getId();
    
        // Get managed user entity
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    
        // Check if a profile already exists
        RecruiterProfile existing = recruiterRepo.findByUserId(userId).orElse(null);
    
        if (existing != null) {
            // Instead of modifying the detached profile, update fields manually on managed entity
            existing.setCompanyName(profile.getCompanyName());
            existing.setCompanyWebsite(profile.getCompanyWebsite());
            existing.setDesignation(profile.getDesignation());
            existing.setAboutCompany(profile.getAboutCompany());
    
            return recruiterRepo.save(existing);
        }
    
        // For new profile, use a fresh object
        RecruiterProfile newProfile = new RecruiterProfile();
        newProfile.setUser(user);
        newProfile.setCompanyName(profile.getCompanyName());
        newProfile.setCompanyWebsite(profile.getCompanyWebsite());
        newProfile.setDesignation(profile.getDesignation());
        newProfile.setAboutCompany(profile.getAboutCompany());
    
        return recruiterRepo.save(newProfile);
    }


    @Override
    public RecruiterProfile getByUserId(Long userId) {
        RecruiterProfile profile = recruiterRepo.findByUserId(userId);
        if (profile == null) {
            throw new RuntimeException("Recruiter profile not found for user ID: " + userId);
        }
        return profile;
    }

    @Override
    public RecruiterProfile updateProfile(Long userId, RecruiterProfile updated) {
        RecruiterProfile existing = recruiterRepo.findByUserId(userId);
        if (existing == null) {
            throw new RuntimeException("Recruiter profile not found for user ID: " + userId);
        }

        existing.setCompanyName(updated.getCompanyName());
        existing.setCompanyWebsite(updated.getCompanyWebsite());
        existing.setDesignation(updated.getDesignation());
        existing.setAboutCompany(updated.getAboutCompany());

        return recruiterRepo.save(existing);
    }
}
