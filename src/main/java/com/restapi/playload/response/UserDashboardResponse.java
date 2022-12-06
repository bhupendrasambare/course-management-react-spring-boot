package com.restapi.playload.response;

import com.restapi.entity.Topic;
import com.restapi.playload.mislenious.TopicDateGraph;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDashboardResponse {
    int countCourses;
    int countTopics;
    List<TopicResponse> topics;
    List<CourseResponse> courses;
    List<TopicDateGraph> topicGraph;
}
