package com.restapi.service;

import com.restapi.entity.Courses;
import com.restapi.repository.CoursesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    CoursesRepository coursesRepository;

    public Courses saveCourse(Courses courses){
        return coursesRepository.save(courses);
    }

    public List<Courses> findAllCourses(){
        return coursesRepository.findAllCourses();
    }

    public List<Courses> getCoursesByMentorId(Long id){
        return coursesRepository.getCoursesByMentorId(id);
    }

    public List<Courses> getCoursesByName(String name){
        return coursesRepository.getCoursesByName(name);
    }

    public List<Courses> getCoursesByFilter(String name,String categories,double min,double max){
        return coursesRepository.getCoursesByFilter(name,categories,max,min);
    }

}
