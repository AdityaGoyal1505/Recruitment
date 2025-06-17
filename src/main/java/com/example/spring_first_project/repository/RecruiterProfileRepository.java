package com.example.spring_first_project.repository;
import com.example.spring_first_project.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface RecruiterProfileRepository extends JpaRepository<RecruiterProfile, Long> {
    RecruiterProfile findByUserId(Long userId);
}

