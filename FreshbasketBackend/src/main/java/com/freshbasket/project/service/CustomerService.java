package com.freshbasket.project.service;

import java.util.List;
import java.util.Optional;

import com.freshbasket.project.entities.Customer;
import com.freshbasket.project.models.CustomerDto;

public interface CustomerService {

	Customer registerUser(CustomerDto customerDto);

	Customer validate(String email, String password);

	List<Customer> findAllCustomers();

	Optional<Customer> findCustomerById(Long id) ;

	void updateProfile(Customer cust, Long id);

	Customer findByEmail(String email);

	void resetPassword(Customer cust, String password);

}
