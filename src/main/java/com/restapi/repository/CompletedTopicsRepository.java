package com.restapi.repository;

import com.restapi.entity.CompletedTopics;
import com.restapi.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompletedTopicsRepository extends JpaRepository<CompletedTopics,Long> {

    @Query("Select u from CompletedTopics u where u.topic.chapter.courses.id=:course and u.user.id=:user")
    List<CompletedTopics> getCompletedTopicsByUserIdCourseId(@Param("user")Long user,@Param("course")Long course);

    @Query("Select u from CompletedTopics u where u.topic.id=:topic and u.user.id=:user")
    Optional<CompletedTopics> getCompletedTopicsByTopicIdUserId(@Param("topic")Long topic,@Param("user")Long user);
}
