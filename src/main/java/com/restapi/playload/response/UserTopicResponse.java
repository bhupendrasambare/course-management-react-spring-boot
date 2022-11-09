package com.restapi.playload.response;

import com.restapi.entity.Chapter;
import com.restapi.entity.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserTopicResponse {

    private Long id;

    private String chapter;

    private String name;

    private String description;

    private Long nextId;

    private boolean courseCompleted;

    @Transient
    private boolean isCompleted = false;

    public UserTopicResponse(Topic topic){
        this.id = topic.getId();
        this.chapter = topic.getChapter().getName();
        this.name = topic.getName();
        this.description = topic.getDescription();
        this.courseCompleted = false;
    }

}
