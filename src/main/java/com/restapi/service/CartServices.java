package com.restapi.service;

import com.restapi.entity.Cart;
import com.restapi.entity.Order;
import com.restapi.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServices {

    @Autowired
    CartRepository cartRepository;

    public Cart saveCart(Cart cart){
        return cartRepository.save(cart);
    }

    public List<Cart> getCartByUserId(Long id){
        return cartRepository.getCartByUserId(id);
    }

    public void deleteCart(Long id){
        cartRepository.updateDelete(true,id);
    }

    public Boolean courseExistsByUserId(Long user,Long course){
        Cart cart = cartRepository.getCartByUserAndCourseId(user,course).orElse(null);
        if(cart == null){
            return false;
        }
        return true;
    }
}
