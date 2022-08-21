package com.restapi.repository;

import com.restapi.entity.Ratings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Ratings,Long> {

    @Query("Select u from Ratings u where u.categories.id = :id")
    List<Ratings> getRatingByCourseId(@Param("id")Long id);

    @Query("Select u from Ratings u where u.categories.id = :id AND u.user.id=:user")
    Optional<Ratings> getRatingByCourseIdAndUserId(@Param("id")Long id, @Param("user")Long user);
}
