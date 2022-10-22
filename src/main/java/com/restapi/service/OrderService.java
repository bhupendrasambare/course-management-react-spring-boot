package com.restapi.service;

import com.restapi.entity.Order;
import com.restapi.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public Order saveOrder(Order order){
        return orderRepository.save(order);
    }

    public Order getOrderByUserIdAndCourseId(Long user,Long course){
        return orderRepository.getOrderByUserAndCourseId(user,course).orElse(null);
    }

    public List<Order> getOrderByUserId(Long id){
        return orderRepository.getOrderByUserId(id);
    }

    public Boolean courseExistsByUserId(Long user,Long course){
        Order order = orderRepository.getOrderByUserAndCourseId(user,course).orElse(null);
        if(order == null){
            return false;
        }
        return true;
    }

}
