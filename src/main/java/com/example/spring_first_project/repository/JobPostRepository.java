package com.example.spring_first_project.repository;
import com.example.spring_first_project.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {
    //List<JobPost> findByPostedBy(User user);
    List<JobPost> findByRecruiterId(Long recruiterId);
}
