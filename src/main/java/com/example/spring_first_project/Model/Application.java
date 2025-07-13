package com.example.spring_first_project.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Application{
    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private StudentProfile student;

    @ManyToOne
    private JobPost job;

    private LocalDateTime appliedAt;
    private String status; // "PENDING", "SELECTED", "REJECTED"

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StudentProfile getStudent() {
        return student;
    }

    public void setStudent(StudentProfile student) {
        this.student = student;
    }

    public JobPost getJob() {
        return job;
    }

    public void setJob(JobPost job) {
        this.job = job;
    }

    public LocalDateTime getAppliedAt() {
        return appliedAt;
    }

    public void setAppliedAt(LocalDateTime appliedAt) {
        this.appliedAt = appliedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Application(Long id, StudentProfile student, JobPost job, LocalDateTime appliedAt, String status) {
        this.id = id;
        this.student = student;
        this.job = job;
        this.appliedAt = appliedAt;
        this.status = status;
    }

    public Application(){

    }
}
