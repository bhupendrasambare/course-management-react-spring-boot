package com.restapi.repository;

import com.restapi.entity.Courses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursesRepository extends JpaRepository<Courses,Long> {

    @Query("Select u from Courses u")
    List<Courses> findAllCourses();

    @Query("Select u from Courses u where u.mentor.id = :id")
    List<Courses> getCoursesByMentorId(@Param("id")Long id);

    @Query("Select u from Courses u where u.name Like CONCAT('%', :name ,'%')")
    List<Courses> getCoursesByName(@Param("name")String name);

    @Query("Select u from Courses u where u.name Like CONCAT('%', :name ,'%') AND (u.price< :max AND u.price> :min) AND  u.categories.name Like CONCAT('%', :categories ,'%')")
    List<Courses> getCoursesByFilter(@Param("name")String name,
                                     @Param("categories")String categories,
                                     @Param("max")double maxPrice,
                                     @Param("min")double min);


}
