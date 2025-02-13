package com.freshbasket.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshbasket.project.entities.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

	Category findByCategoryName(String categoryName);

}
