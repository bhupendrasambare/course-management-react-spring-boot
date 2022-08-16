package com.restapi.controller;

import com.restapi.entity.User;
import com.restapi.security.jwt.JwtUtils;
import com.restapi.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.net.http.HttpRequest;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    JwtUtils jwtUtils;

    //@PreAuthorize("hasAnyAuthority('USER')") --
    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping
    public String userRole(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  jwtUtils.getUserFromJwtToken(token);

        return user.getEmail();
    }

}
