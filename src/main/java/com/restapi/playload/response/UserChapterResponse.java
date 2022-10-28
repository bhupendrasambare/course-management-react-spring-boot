package com.restapi.playload.response;

import com.restapi.entity.Topic;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserChapterResponse {
    private String chapter;
    private List<TopicResponse> topics;
}
