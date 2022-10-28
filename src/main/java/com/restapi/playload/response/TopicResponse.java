package com.restapi.playload.response;

import com.restapi.entity.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopicResponse {
    public Long id;
    public Long chapterId;
    public Long courseId;
    public String topic;
    public String chapter;
    public String course;
    public Boolean isCompleted;

    public TopicResponse(Topic topic){
        this.id = topic.getId();
        this.chapterId = topic.getChapter().getId();
        this.courseId = topic.getChapter().getCourses().getId();
        this.topic = topic.getName();
        this.chapter = topic.getChapter().getName();
        this.course = topic.getChapter().getCourses().getName();
    }

}
