package com.restapi.controller;

import com.restapi.entity.Categories;
import com.restapi.entity.Courses;
import com.restapi.playload.defaultApiResponse.ApiResponse;
import com.restapi.playload.response.CourseResponse;
import com.restapi.service.CategoriesService;
import com.restapi.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/api/public")
public class PublicController {

    @Value("${resources.folder.dir}")
    private String resourceDir;

    @Autowired
    CategoriesService categoriesService;

    @Autowired
    CourseService courseService;

    @GetMapping("/get-categories")
    @ResponseBody
    public ApiResponse<?> getCategories(HttpServletRequest request){
        List<Categories> categories = categoriesService.findAllCategories();
        return new ApiResponse<List<Categories>>(HttpStatus.OK,"All Categories",categories,true);
    }

    @GetMapping("/get-courses")
    @ResponseBody
    public ApiResponse<?> getCourses(HttpServletRequest request){
        List<Courses> courses = courseService.findAllCourses();
        return new ApiResponse<>(HttpStatus.OK,"All Categories",courseService.getCourseResponse(courses),true);
    }

    @GetMapping("/get-category-by-id")
    @ResponseBody
    public ApiResponse<?> getCategoriesById(HttpServletRequest request){
        String id = request.getParameter("id");
        if(id == null || id.equals("")){
            return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Invalid Id",null,false);
        }
        Categories category = categoriesService.getCategoriesById(Long.valueOf(id));
        if(category == null){
            return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Invalid Id",null,false);
        }
        return new ApiResponse<Categories>(HttpStatus.OK,"Category Details",category,true);
    }

    @GetMapping("/get-course-by-category")
    @ResponseBody
    public ApiResponse<?> getCourseByCategory(HttpServletRequest request){
        String id = request.getParameter("id");
        if(id == null || id.equals("")){
            return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Invalid Id",null,false);
        }

        Categories category = categoriesService.getCategoriesById(Long.valueOf(id));
        if(category == null){
            return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Invalid Id",null,false);
        }

        List<Courses> courses = courseService.findCoursesByCategoryId(Long.valueOf(id));
        List<CourseResponse> result = courseService.getCourseResponse(courses);

        return new ApiResponse<>(HttpStatus.OK,"All Courses",result,true);
    }

    @GetMapping("/resources")
    public void getFileBytes(HttpServletRequest request, HttpServletResponse response) throws Exception{
        String folder = request.getParameter("folder");
        String file = request.getParameter("file");
        if(folder == null || folder == "" || file == null || file == ""){
            return;
        }
        String filepath = resourceDir + "/"+ folder + "/" + file;
        File responseFile = null;

        System.out.println("3 "+filepath);

        responseFile = new File(filepath);

        if(responseFile.exists()){
            String mimeType = URLConnection.guessContentTypeFromName(responseFile.getName());
            if(mimeType != null){
                mimeType = "application/octet-stream";

                response.setContentType(mimeType);

                response.setHeader("Content-Disposition",String.format("inline: filename=\""+responseFile.getName() + "\""));

                response.setContentLength((int) responseFile.length());

                InputStream inputStream = new BufferedInputStream(new FileInputStream(responseFile));

                FileCopyUtils.copy(inputStream, response.getOutputStream());

            }
        }else{
            return;
        }
    }
}
