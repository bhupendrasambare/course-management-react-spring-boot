package com.restapi.service;

import com.restapi.entity.Interest;
import com.restapi.repository.InterestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterestService {

    @Autowired
    InterestRepository interestRepository;

    public List<Interest> getInterestByUserId(Long id){
        return interestRepository.GetAllByUserId(id);
    }

    public Interest saveInterest(Interest interest){
        return interestRepository.save(interest);
    }

    public void deleteInterest(Long id){
        interestRepository.deleteById(id);
    }

}
