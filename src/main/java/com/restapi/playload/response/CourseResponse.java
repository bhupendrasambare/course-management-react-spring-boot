package com.restapi.playload.response;

import com.restapi.entity.Courses;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponse {

    private Long id;

    private String name;

    private String description;

    private String image;

    private String hour;

    private String minutes;

    private double price;

    private String category;

    private String mentor;

    private String mentorName;

    private Long mentorId;

    private Long categoryId;

    public CourseResponse(Courses courses){
        this.id = courses.getId();
        this.name = courses.getName();
        this.description = courses.getDescription();
        this.image = courses.getImage();
        this.hour = courses.getHour();
        this.minutes = courses.getMinutes();
        this.price = courses.getPrice();
        this.category = courses.getCategories().getName();
        this.mentor = courses.getMentor().getName() + " " + courses.getMentor().getLast();
        this.mentorName = courses.getMentor().getUsername();
        this.mentorId = courses.getMentor().getId();
        this.categoryId = courses.getCategories().getId();
    }
}
