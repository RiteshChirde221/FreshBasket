package com.freshbasket.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshbasket.project.entities.Category;
import com.freshbasket.project.entities.Product;
import com.freshbasket.project.entities.Seller;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findBySeller(Seller seller);

	List<Product> findByCategory(Category category);
	
}
