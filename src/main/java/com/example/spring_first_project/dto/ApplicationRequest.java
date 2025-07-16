package com.example.spring_first_project.dto;
import lombok.*;
@Data
public class ApplicationRequest {
    private Long userId;  // ID of the logged-in user
    private Long jobId;
}
