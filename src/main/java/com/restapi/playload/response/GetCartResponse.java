package com.restapi.playload.response;

import com.restapi.entity.Cart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GetCartResponse {
    Long id;
    Long courseId;
    Long categoryId;
    Long mentorId;
    String courseName;
    String image;
    String mentor;
    String category;
    String hour;
    String minutes;
    double price;
    Date date;

    public GetCartResponse(Cart cart){
        this.id = cart.getId();
        this.courseId = cart.getCourses().getId();
        this.categoryId = cart.getCourses().getCategories().getId();
        this.mentorId = cart.getCourses().getMentor().getId();
        this.courseName = cart.getCourses().getName();
        this.mentor = cart.getCourses().getMentor().getName() +" "+ cart.getCourses().getMentor().getLast();
        this.image = cart.getCourses().getImage();
        this.category = cart.getCourses().getCategories().getName();
        this.hour = cart.getCourses().getHour();
        this.minutes = cart.getCourses().getMinutes();
        this.price = cart.getCourses().getPrice();
        this.date = cart.getDate();
    }

}
