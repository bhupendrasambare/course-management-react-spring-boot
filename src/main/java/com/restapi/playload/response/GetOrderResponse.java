package com.restapi.playload.response;

import com.restapi.entity.Cart;
import com.restapi.entity.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetOrderResponse {
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

    public GetOrderResponse(Order order){
        this.id = order.getId();
        this.courseId = order.getCourses().getId();
        this.categoryId = order.getCourses().getCategories().getId();
        this.mentorId = order.getCourses().getMentor().getId();
        this.courseName = order.getCourses().getName();
        this.mentor = order.getCourses().getMentor().getName() +" "+ order.getCourses().getMentor().getLast();
        this.image = order.getCourses().getImage();
        this.category = order.getCourses().getCategories().getName();
        this.hour = order.getCourses().getHour();
        this.minutes = order.getCourses().getMinutes();
        this.price = order.getCourses().getPrice();
        this.date = order.getDate();
    }
}
