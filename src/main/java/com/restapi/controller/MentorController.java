package com.restapi.controller;

import com.restapi.entity.*;
import com.restapi.playload.defaultApiResponse.ApiResponse;
import com.restapi.security.jwt.JwtUtils;
import com.restapi.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mentor")
public class MentorController {

    @Value("${resources.folder.dir}")
    private String filesFolder;

    @Autowired
    FileUploadService fileUploadService;

    @Autowired
    JwtUtils loginService;

    @Autowired
    CategoriesService categoriesService;

    @Autowired
    CourseService courseService;

    @Autowired
    ChapterService chapterService;

    @Autowired
    TopicService topicService;

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @GetMapping("/login-user")
    public String userRole(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        return user.getEmail();
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @GetMapping("/get-categories")
    public ApiResponse<?> getCategories(HttpServletRequest request){
        List<Categories> categories = categoriesService.findAllCategories();

        return new ApiResponse<List<Categories>>(HttpStatus.OK,"Categories List",categories,true);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @GetMapping("/validate-course-name")
    public ApiResponse<?> getCourseByName(@RequestParam("name")String name){
        Courses courses = courseService.validateCoursesByName(name);
        if(courses == null){
            return new ApiResponse<>(HttpStatus.OK,"Course Name Don't Exists",true,true);
        }
        return new ApiResponse<>(HttpStatus.CONFLICT,"Course Name Exists",false,false);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @PostMapping("/add-edit-course")
    public ApiResponse<?> addEditCourse(HttpServletRequest request,
                                        @RequestParam(name = "file",required = false)MultipartFile file
                                        ) throws IOException {
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        Courses course = null;
        String id = request.getParameter("id");
        String name = request.getParameter("name");
        String description = request.getParameter("description");
        String hr = request.getParameter("hr");
        String min = request.getParameter("min");
        String price = request.getParameter("price");
        String categoryId = request.getParameter("category");

        Categories category = categoriesService.getCategoriesById(Long.valueOf(categoryId));

        if(id != null && id != ""){
            course = courseService.getCourseById(Long.valueOf(id));
            if(course == null){
                course = new Courses();
            }
        }else{
            Courses temp = courseService.validateCoursesByName(name);
            if(temp != null){
                return new ApiResponse<>(HttpStatus.CONFLICT,"Course Name Exists",null,false);
            }
            course = new Courses();
        }
        if(category == null){
            return new ApiResponse<>(HttpStatus.CONFLICT,"Categories Not Found",null,false);
        }
        course.setName(name);
        course.setCategories(category);
        course.setMentor(user);
        course.setDate(new Date());
        course.setDescription(description);
        course.setHour(hr);
        course.setMinutes(min);
        course.setPrice(Float.valueOf(price));

        if (file!=null && !file.isEmpty()) {
            // save file function
            String filename = fileUploadService.saveImage(file,"courses");
            course.setImage(filename);
        }

        Courses result = courseService.saveCourse(course);
        return new ApiResponse<>(HttpStatus.OK,"Course Created",result,true);
    }


    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @GetMapping("/get-course")
    public ApiResponse<?> getCourses(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        List<Courses> result= courseService.getCoursesByMentorId(user.getId());

        return new ApiResponse<>(HttpStatus.OK,"Courses",result,true);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @GetMapping("/get-course-by-id")
    public ApiResponse<?> getCoursesById(HttpServletRequest request,@RequestParam("id")Long id){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        Courses result= courseService.getCourseById(id);
        if(result.getMentor().getId() != user.getId()){
            return new ApiResponse<>(HttpStatus.OK,"Courses Not Found",false,false);
        }
        return new ApiResponse<>(HttpStatus.OK,"Courses Details",result,true);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @GetMapping("/get-chapters")
    public ApiResponse<?> getChaptersByCourseId(HttpServletRequest request,@RequestParam("id")Long id){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        List<Chapter> result= chapterService.getChapterByCourseId(id);
        if(result.size() > 0 && result.get(0).getCourses().getMentor().getId() != user.getId()){
            return new ApiResponse<>(HttpStatus.OK,"Courses Not Found",false,false);
        }
        return new ApiResponse<>(HttpStatus.OK,"Courses Details",result,true);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @GetMapping("/get-chapter-by-id")
    public ApiResponse<?> getChapterById(HttpServletRequest request,@RequestParam("id")Long id){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        Chapter result= chapterService.getChapterById(id);
        if(result.getCourses().getMentor().getId() != user.getId()){
            return new ApiResponse<>(HttpStatus.OK,"Chapter Not Found",false,false);
        }
        return new ApiResponse<>(HttpStatus.OK,"Chapter Details",result,true);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @PostMapping("/add-edit-chapter")
    public ApiResponse<?>  saveChapter(HttpServletRequest request,@RequestParam("id")Long id){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        Courses course = courseService.getCourseById(id);
        if(course == null || course.getMentor().getId() != user.getId()){
            return new ApiResponse<>(HttpStatus.OK,"Courses Not Found",false,false);
        }
        String chapterId = request.getParameter("chapter");
        Chapter chapter = null;
        if(chapterId != null && chapterId != ""){
            chapter = chapterService.getChapterById(Long.valueOf(chapterId));
            if(chapter == null){
                return new ApiResponse<>(HttpStatus.OK,"Chapter Not Found",false,true);
            }
        }else{
            chapter = new Chapter();
        }

        String name = request.getParameter("name");
        String description = request.getParameter("description");

        chapter.setName(name);
        chapter.setDescription(description);
        chapter.setCourses(course);
        chapterService.saveChapter(chapter);
        return new ApiResponse<>(HttpStatus.OK,"Chapter Saved",true,true);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @PostMapping("/get-topics")
    public ApiResponse<?> getTopics(HttpServletRequest request,@RequestParam("id")Long id){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        List<Topic> topics = topicService.getTopicByChapterId(id);
        if(topics.size() >0){
            if(topics.get(0).getChapter().getCourses().getMentor().getId() == user.getId()){
                return new ApiResponse<Boolean>(HttpStatus.NOT_ACCEPTABLE,"Access Denied",false,false);
            }
        }
        return new ApiResponse<List<Topic>>( HttpStatus.OK,"Topics",topics,true);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @PostMapping("/add-edit-topic")
    public ApiResponse<?>  saveTopic(HttpServletRequest request,@RequestParam("id")Long id){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        Chapter chapter = chapterService.getChapterById(id);
        if(chapter == null || chapter.getCourses().getMentor().getId() != user.getId()){
            return new ApiResponse<>(HttpStatus.OK,"Topic Not Found",false,false);
        }
        String topicId = request.getParameter("topic");
        Topic topic = null;
        if(topicId != null && topicId != ""){
            topic = topicService.getTopicById(Long.valueOf(topicId));
            if(topic == null){
                return new ApiResponse<>(HttpStatus.OK,"Topic Not Found",false,true);
            }
        }else{
            topic = new Topic();
            List<Topic> topicList = topicService.getTopicByChapterId(chapter.getId());

            topic.setPosition(topicList.size() + 1);
        }

        String name = request.getParameter("name");
        String description = request.getParameter("description");

        topic.setName(name);
        topic.setDescription(description);
        topic.setChapter(chapter);
        topicService.saveTopic(topic);
        return new ApiResponse<>(HttpStatus.OK,"Chapter Saved",true,true);
    }


}
