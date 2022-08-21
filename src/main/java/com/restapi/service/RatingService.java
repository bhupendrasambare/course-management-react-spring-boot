package com.restapi.service;

import com.restapi.entity.Interest;
import com.restapi.entity.Ratings;
import com.restapi.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {
    @Autowired
    RatingRepository ratingRepository;

    public Ratings saveService(Ratings interest){
        Ratings r = ratingRepository.getRatingByCourseIdAndUserId(interest.getCategories().getId(),interest.getUser().getId()).orElse(null);
        if(r!= null){
            return ratingRepository.save(interest);
        }
        return null;
    }

    public List<Ratings> getRatingsByCourseId(Long id){
        return ratingRepository.getRatingByCourseId(id);
    }

}
