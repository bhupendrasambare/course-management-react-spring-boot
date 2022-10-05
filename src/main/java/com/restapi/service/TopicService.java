package com.restapi.service;

import com.restapi.entity.Topic;
import com.restapi.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    @Autowired
    TopicRepository topicRepository;

    public Topic saveTopic(Topic topic){
        return topicRepository.save(topic);
    }

    public Topic getTopicById(Long id){
        return topicRepository.getTopicById(id).orElse(null);
    }

    public List<Topic> getTopicByChapterId(Long id){
        return topicRepository.getTopicByChapterId(id);
    }

    public List<Topic> getTopicByCourseId(Long id){
        return topicRepository.getTopicByCourseId(id);
    }

    public List<Topic> getTopicByName(String name){
        return topicRepository.getTopicByName(name);
    }
}
