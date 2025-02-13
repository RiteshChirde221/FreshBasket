package com.freshbasket.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshbasket.project.entities.OrderDetails;
import com.freshbasket.project.entities.Orders;


@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {

	List<OrderDetails> findByOrders(Orders order);
	Optional<OrderDetails> findById(Long id);
	
}
