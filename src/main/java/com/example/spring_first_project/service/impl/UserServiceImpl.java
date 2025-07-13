package com.example.spring_first_project.service.impl;



import com.example.spring_first_project.Model.User;
import com.example.spring_first_project.repository.UserRepository;
import com.example.spring_first_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {
        // You can add extra checks or hashing logic here if needed
        return userRepository.save(user);
    }

    @Override
    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return true;
        }
        return false;
    }
}
