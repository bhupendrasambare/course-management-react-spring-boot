package com.restapi.controller;

import com.restapi.entity.Categories;
import com.restapi.playload.defaultApiResponse.ApiResponse;
import com.restapi.service.CategoriesService;
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
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@Controller
@RequestMapping("/api/public")
public class PublicController {

    @Value("${resources.folder.dir}")
    private String resourceDir;

    @Autowired
    CategoriesService categoriesService;

    @GetMapping("/get-categories")
    @ResponseBody
    public ApiResponse<?> getCategories(HttpServletRequest request){
        List<Categories> categories = categoriesService.findAllCategories();
        return new ApiResponse<List<Categories>>(HttpStatus.OK,"All Categories",categories);
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
