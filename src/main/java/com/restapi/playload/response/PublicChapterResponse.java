package com.restapi.playload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicChapterResponse {
    private String chapter;
    private List<String> topics;
}
