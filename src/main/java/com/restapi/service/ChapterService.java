package com.restapi.service;

import com.restapi.entity.Chapter;
import com.restapi.repository.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChapterService {
    @Autowired
    ChapterRepository chapterRepository;

    public Chapter saveChapter(Chapter chapter){
        return chapterRepository.save(chapter);
    }

    public List<Chapter> getChapterByCourseId(Long id){
        return chapterRepository.getChapterByCourseId(id);
    }

    public List<Chapter> getChapterByName(String name){
        return chapterRepository.getChapterByChapterName(name);
    }

    public Chapter getChapterById(Long id){
        return chapterRepository.getChapterByChapterId(id).orElse(null);
    }

}
