package com.example.spring_first_project.service.impl;

import com.example.spring_first_project.Model.RecruiterProfile;
import com.example.spring_first_project.service.RecruiterProfileService;
import org.springframework.stereotype.Service;



import com.example.spring_first_project.Model.RecruiterProfile;
import com.example.spring_first_project.repository.RecruiterProfileRepository;
import com.example.spring_first_project.service.RecruiterProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RecruiterProfileServiceImpl implements RecruiterProfileService {

    private final RecruiterProfileRepository recruiterProfileRepository;

    @Autowired
    public RecruiterProfileServiceImpl(RecruiterProfileRepository recruiterProfileRepository) {
        this.recruiterProfileRepository = recruiterProfileRepository;
    }

    @Override
    public RecruiterProfile createProfile(RecruiterProfile profile) {
        return recruiterProfileRepository.save(profile);
    }

    @Override
    public RecruiterProfile getByUserId(Long userId) {
        return recruiterProfileRepository.findByUserId(userId);

    }

    @Override
    public RecruiterProfile updateProfile(Long userId, RecruiterProfile updatedProfile) {
        Optional<RecruiterProfile> existingProfileOpt = recruiterProfileRepository.findById(userId);
        if (existingProfileOpt.isPresent()) {
            RecruiterProfile existingProfile = existingProfileOpt.get();
            existingProfile.setCompanyName(updatedProfile.getCompanyName());
            // add other fields to update
            return recruiterProfileRepository.save(existingProfile);
        }
        return null; // or throw exception
    }
}


