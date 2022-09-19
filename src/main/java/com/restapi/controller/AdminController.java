package com.restapi.controller;

import com.restapi.entity.Categories;
import com.restapi.entity.User;
import com.restapi.entity.enums.ERole;
import com.restapi.playload.defaultApiResponse.ApiResponse;
import com.restapi.security.jwt.JwtUtils;
import com.restapi.service.CategoriesService;
import com.restapi.service.FileUploadService;
import com.restapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Locale;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Value("${resources.folder.dir}")
    private String filesFolder;

    @Autowired
    JwtUtils loginService;

    @Autowired
    FileUploadService fileUploadService;
    //String token = request.getParameter("auth");
    //User user =  loginService.getUserFromJwtToken(token);

    @Autowired
    CategoriesService categoriesService;

    @Autowired
    UserService userService;

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/get-users-by-role")
    public ApiResponse<?> getUsersList(HttpServletRequest request){
        String user = request.getParameter("role").toLowerCase(Locale.ROOT);
        ERole role = ERole.USER;
        if(user.equals("mentor")){
            role = ERole.MENTOR;
        }
        List<User> users = userService.getUsersByRole(role);

        return new ApiResponse<List<User>>(HttpStatus.OK,"List Of "+user,users,true);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/check-auth")
    public ApiResponse<?> checkAuth(HttpServletRequest request){
        return new ApiResponse<String>(HttpStatus.OK,"All Categories","categories",true);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/get-categories")
    public ApiResponse<?> getCategories(HttpServletRequest request){
        List<Categories> categories = categoriesService.findAllCategories();
        return new ApiResponse<List<Categories>>(HttpStatus.OK,"All Categories",categories,true);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @RequestMapping(path="/set-categories",method = RequestMethod.POST,consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ApiResponse<?> setCategories(HttpServletRequest request, @RequestParam(name = "image",required = false)MultipartFile file) throws IOException {
        String id = request.getParameter("id");
        String name = request.getParameter("name");
        String description = request.getParameter("description");
        Categories categories = null;
        if(id != null && id != "")
        {
            categories = categoriesService.getCategoriesById(Long.valueOf(id));
        }else{
            categories = new Categories();
        }

        categories.setName(name);
        categories.setDescription(description);

        if (file!=null && !file.isEmpty()) {
            // save file function
                String filename = fileUploadService.saveImage(file,"categories");
                categories.setImage(filename);
        }

        Categories result = categoriesService.saveCategories(categories);
        return new ApiResponse<Categories>(HttpStatus.OK,"All Categories",result,true);
    }
}
