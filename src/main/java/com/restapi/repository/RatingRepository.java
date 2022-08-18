package com.restapi.repository;

import com.restapi.entity.Ratings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Ratings,Long> {

    @Query("Select u from Ratings u where u.categories.id = :id")
    List<Ratings> getRatingByCourseId(@Param("id")Long id);
}
