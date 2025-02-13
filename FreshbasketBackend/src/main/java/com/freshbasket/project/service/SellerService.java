package com.freshbasket.project.service;

import java.util.List;
import java.util.Optional;

import com.freshbasket.project.entities.Seller;
import com.freshbasket.project.models.SellerDto;

public interface SellerService {

	Seller registerSeller(SellerDto sellerDto);

	Seller validate(String email, String password);

	List<Seller> findAllSellers();

	Optional<Seller> findSellerById(Long id);

	void updateProfile(Seller seller, Long id);

	Seller findByEmail(String email);

	void resetPassword(Seller seller, String password);

	void deleteSellerById(Long id);

}
