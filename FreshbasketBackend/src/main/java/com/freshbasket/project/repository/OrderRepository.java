package com.freshbasket.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshbasket.project.entities.Customer;
import com.freshbasket.project.entities.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long>{
	
	List<Orders> findByCustomer(Customer customer);
	 List<Orders> findByCustomerId(Long custid);
}
