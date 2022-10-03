package com.restapi.service;

import com.restapi.entity.Courses;
import com.restapi.playload.response.CourseResponse;
import com.restapi.repository.CoursesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseService {
    @Autowired
    CoursesRepository coursesRepository;

    public Courses saveCourse(Courses courses){
        return coursesRepository.save(courses);
    }

    public Courses getCourseById(Long id){
        return coursesRepository.getCoursesById(id).orElse(null);
    }

    public Courses validateCoursesByName(String name){
        return coursesRepository.validateCoursesByName(name).orElse(null);
    }
    public List<Courses> findAllCourses(){
        return coursesRepository.findAllCourses();
    }

    public List<Courses> getCoursesByMentorId(Long id){
        return coursesRepository.getCoursesByMentorId(id);
    }

    public List<Courses> findCoursesByCategoryId(Long id){
        return coursesRepository.getCoursesByCategoryId(id);
    }

    public List<Courses> getCoursesByName(String name){
        return coursesRepository.getCoursesByName(name);
    }

    public List<Courses> getCoursesByFilter(String name,String categories,double min,double max){
        return coursesRepository.getCoursesByFilter(name,categories,max,min);
    }

    public List<CourseResponse> getCourseResponse(List<Courses> courses){
        List<CourseResponse> result = new ArrayList<>();

        for(Courses c: courses){
            result.add(new CourseResponse(c));
        }
        return result;
    }
}
