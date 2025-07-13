package com.example.spring_first_project.service.impl;

import com.example.spring_first_project.Model.StudentProfile;
import com.example.spring_first_project.repository.StudentProfileRepository;
import com.example.spring_first_project.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentProfileServiceImpl implements StudentProfileService {

    private final StudentProfileRepository studentProfileRepository;

    @Autowired
    public StudentProfileServiceImpl(StudentProfileRepository studentProfileRepository) {
        this.studentProfileRepository = studentProfileRepository;
    }

    @Override
    public StudentProfile createProfile(StudentProfile profile) {
        return studentProfileRepository.save(profile);
    }

    @Override
    public StudentProfile getByUserId(Long userId) {
        return studentProfileRepository.findByUserId(userId);
    }

    @Override
    public StudentProfile updateProfile(Long userId, StudentProfile updatedProfile) {
        Optional<StudentProfile> existingProfileOpt = studentProfileRepository.findById(userId);
        if (existingProfileOpt.isPresent()) {
            StudentProfile existingProfile = existingProfileOpt.get();
            existingProfile.setFullName(updatedProfile.getFullName());
            existingProfile.setResumeLink(updatedProfile.getResumeLink());
            existingProfile.setBranch(updatedProfile.getBranch());
            existingProfile.setSkills(updatedProfile.getSkills());
            existingProfile.setBio(updatedProfile.getBio());
            // update other fields as needed
            return studentProfileRepository.save(existingProfile);
        }
        return null; // or throw an exception
    }
}
