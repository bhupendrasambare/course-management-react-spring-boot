package com.restapi.controller;

import com.restapi.entity.Categories;
import com.restapi.entity.Courses;
import com.restapi.entity.User;
import com.restapi.playload.defaultApiResponse.ApiResponse;
import com.restapi.security.jwt.JwtUtils;
import com.restapi.service.CategoriesService;
import com.restapi.service.CourseService;
import com.restapi.service.FileUploadService;
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

        return new ApiResponse<List<Categories>>(HttpStatus.OK,"Categories List",categories);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @GetMapping("/validate-course-name")
    public ApiResponse<?> getCategories(@RequestParam("name")String name){
        Courses courses = courseService.validateCoursesByName(name);
        if(courses == null){
            return new ApiResponse<>(HttpStatus.OK,"Course Name Don't Exists",true);
        }
        return new ApiResponse<>(HttpStatus.CONFLICT,"Course Name Exists",false);
    }

    @PreAuthorize("hasAnyAuthority('MENTOR')")
    @PostMapping("/add-edit-course")
    public ApiResponse<?> getCategories(HttpServletRequest request,
                                        @RequestParam(name = "file",required = false)MultipartFile file) throws IOException {
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
                return new ApiResponse<>(HttpStatus.CONFLICT,"Course Name Exists",null);
            }
            course = new Courses();
        }
        if(category == null){
            return new ApiResponse<>(HttpStatus.CONFLICT,"Categories Not Found",null);
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
        return new ApiResponse<>(HttpStatus.OK,"Course Created",result);
    }


}
