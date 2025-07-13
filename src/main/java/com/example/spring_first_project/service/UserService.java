package com.example.spring_first_project.service;
import com.example.spring_first_project.Model.*;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface UserService {
    User registerUser(User user);
    boolean authenticate(String username, String password);
}

