package com.restapi.controller;

import com.restapi.entity.User;
import com.restapi.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mentor")
public class MentorController {

    @Autowired
    JwtUtils loginService;

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/login-user")
    public String userRole(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        return user.getEmail();
    }
}
