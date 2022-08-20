package com.restapi.repository;

import com.restapi.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic,Long> {

    @Query("Select u from Topic u where u.chapter.id=:id")
    List<Topic> getTopicByChapterId(@Param("id") Long id);

    @Query("Select u from Topic u where u.chapter.courses.id Order By u.chapter.id")
    List<Topic> getTopicByCourseId(@Param("id") Long id);

    @Query("Select u from Topic u where u.name Like CONCAT('%', :name ,'%')")
    List<Topic> getTopicByName(@Param("name") String name);
}
