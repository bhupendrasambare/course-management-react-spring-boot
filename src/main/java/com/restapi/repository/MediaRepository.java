package com.restapi.repository;

import com.restapi.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media,Long> {

    @Query("Select u from Media u where u.topic.id = :id")
    List<Media> getMediaByTopicId(@Param("id") Long id);
}
