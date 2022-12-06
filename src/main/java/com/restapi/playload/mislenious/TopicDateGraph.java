package com.restapi.playload.mislenious;

import com.restapi.playload.response.TopicResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopicDateGraph {
    TopicResponse topic;
    Date date;
    String dateName;
}
