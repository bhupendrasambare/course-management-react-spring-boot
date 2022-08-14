package com.restapi.service;

import com.restapi.entity.Role;
import com.restapi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService
{
    @Autowired
    RoleRepository roleRepository;

    public Role save(Role role){
        return roleRepository.save(role);
    }
}