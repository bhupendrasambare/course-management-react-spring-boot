package com.restapi.repository;

import com.restapi.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter,Long> {

    @Query("Select u from Chapter u where u.courses.id=:id Order By u.courses.id")
    List<Chapter> getChapterByCourseId(@Param("id")Long id);

    @Query("Select u from Chapter u where u.id=:id")
    Optional<Chapter> getChapterByChapterId(@Param("id")Long id);

    @Query("Select u from Chapter u where u.name Like CONCAT('%', :name ,'%')")
    List<Chapter> getChapterByChapterName(@Param("name")String name);
}
