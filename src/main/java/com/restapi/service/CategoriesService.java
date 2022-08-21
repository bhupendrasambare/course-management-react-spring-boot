package com.restapi.service;

import com.restapi.entity.Categories;
import com.restapi.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriesService {
    @Autowired
    CategoriesRepository categoriesRepository;

    public Categories saveCategories(Categories categories){
        return categoriesRepository.save(categories);
    }

    public List<Categories> findAllCategories(){
        return categoriesRepository.findAllCategories();
    }

    public List<Categories> getCategoriesByName(String name){
        return categoriesRepository.getCategoriesByName(name);
    }

    public Categories getCategoriesById(Long id){
        return categoriesRepository.getCategoriesById(id).orElse(null);
    }

}
