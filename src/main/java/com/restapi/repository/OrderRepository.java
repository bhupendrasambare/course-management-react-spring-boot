package com.restapi.repository;

import com.restapi.entity.Cart;
import com.restapi.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query("Select u from Order u where u.user.id=:id")
    List<Order> getOrderByUserId(@Param("id") Long id);

    @Query("Select u from Order u where u.user.id=:user and u.courses.id=:course")
    Optional<Order> getOrderByUserAndCourseId(@Param("user")Long user,@Param("course")Long course);
}
