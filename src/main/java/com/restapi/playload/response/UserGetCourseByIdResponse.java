package com.restapi.playload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserGetCourseByIdResponse {
    List<UserChapterResponse> chapterTopics;
    CourseResponse courses;
    double percentage = 0;
}
