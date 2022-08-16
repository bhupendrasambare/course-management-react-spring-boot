package com.restapi.repository;

import com.restapi.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriesRepository extends JpaRepository<Categories,Long> {
    @Query("Select u from Categories u")
    List<Categories> findAllCategories();

    @Query("Select u from Categories u where u.id=:id")
    Optional<Categories> getCategoriesById(@Param("id") Long id);

    @Query("Select u from Categories u where u.name Like CONCAT('%',:name,'%')")
    List<Categories> getCategoriesByName(@Param("name")String name);
}
