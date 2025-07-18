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

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Optional<RecruiterProfile> optionalExisting = recruiterRepo.findByUserId(userId);

        if (optionalExisting.isPresent()) {
            RecruiterProfile existing = optionalExisting.get();
            existing.setCompanyName(profile.getCompanyName());
            existing.setCompanyWebsite(profile.getCompanyWebsite());
            existing.setDesignation(profile.getDesignation());
            existing.setAboutCompany(profile.getAboutCompany());
            return recruiterRepo.save(existing);
        }

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
        return recruiterRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Recruiter profile not found for user ID: " + userId));
    }

    @Override
    public RecruiterProfile updateProfile(Long userId, RecruiterProfile updated) {
        RecruiterProfile existing = recruiterRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Recruiter profile not found for user ID: " + userId));

        existing.setCompanyName(updated.getCompanyName());
        existing.setCompanyWebsite(updated.getCompanyWebsite());
        existing.setDesignation(updated.getDesignation());
        existing.setAboutCompany(updated.getAboutCompany());

        return recruiterRepo.save(existing);
    }
}
