package com.restapi.repository;

import com.restapi.entity.Cart;
import com.restapi.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {

    @Query("Select u from Cart u where u.user.id=:id and u.isDeleted=false")
    List<Cart> getCartByUserId(@Param("id") Long id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("Update Cart set isDeleted=:delete where id=:id")
    void updateDelete(@Param("delete")Boolean delete,@Param("id") Long id);

    @Query("Select u from Cart u where u.user.id=:user and u.courses.id=:course and u.isDeleted=false")
    Optional<Cart> getCartByUserAndCourseId(@Param("user")Long user, @Param("course")Long course);
}
