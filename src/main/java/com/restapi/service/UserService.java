package com.restapi.service;

import com.restapi.entity.User;
import com.restapi.entity.enums.ERole;
import com.restapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public User getUserByUserName(String username){
        return userRepository.findByUsername(username).orElse(null);
    }

    public List<User> getUsersByRole(ERole role){
        return userRepository.findByRoles_Name(role);
    }
}
