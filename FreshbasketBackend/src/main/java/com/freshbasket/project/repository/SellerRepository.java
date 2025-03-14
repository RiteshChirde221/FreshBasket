package com.freshbasket.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshbasket.project.entities.Seller;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long>{

	Seller findByEmail(String email);
}
