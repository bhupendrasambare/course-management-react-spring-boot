package com.restapi.service;

import com.restapi.entity.CompletedTopics;
import com.restapi.repository.CompletedTopicsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompletedTopicService {
    @Autowired
    CompletedTopicsRepository completedTopicsRepository;

    public CompletedTopics saveCompletedTopics(CompletedTopics topics){
        CompletedTopics completedTopics = completedTopicsRepository.getCompletedTopicsByTopicIdUserId(topics.getTopic().getId(),topics.getUser().getId()).orElse(null);
        if(completedTopics == null){
            return completedTopicsRepository.save(completedTopics);
        }
        return completedTopics;
    }

    public List<CompletedTopics> getCompletedTopicsByUserIdCourseId(Long user,Long course){
        return completedTopicsRepository.getCompletedTopicsByUserIdCourseId(user,course);
    }

    public CompletedTopics getCompletedTopicsByTopicIdUserId(Long topic, Long user){
        return completedTopicsRepository.getCompletedTopicsByTopicIdUserId(topic,user).orElse(null);
    }
}
