package com.restapi.repository;

import java.util.List;
import java.util.Optional;

import com.restapi.entity.User;
import com.restapi.entity.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("Select u from User u where u.username LIKE :username OR u.email LIKE :username")
    Optional<User> findByUsername(@Param("username") String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    List<User> findByRoles_Name(ERole name);
}