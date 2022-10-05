package com.restapi.playload.response;

import com.restapi.entity.Courses;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicGetCourseByIdResponse {
    List<PublicChapterResponse> chapterTopics;
    CourseResponse courses;
}
