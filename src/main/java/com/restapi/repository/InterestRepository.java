package com.restapi.repository;

import com.restapi.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestRepository extends JpaRepository<Interest,Long> {

    @Query("Select u from Interest u where user.id = :id")
    List<Interest> GetAllByUserId(@Param("id")Long id);

    @Override
    void deleteById(Long id);
}
