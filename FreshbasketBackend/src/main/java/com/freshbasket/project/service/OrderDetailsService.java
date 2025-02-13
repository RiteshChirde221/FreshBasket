package com.freshbasket.project.service;

import java.util.List;
import java.util.Optional;

import com.freshbasket.project.entities.OrderDetails;
import com.freshbasket.project.entities.Orders;


public interface OrderDetailsService {

	void saveOrderDetails(OrderDetails od);
	OrderDetails findById(Long id);
	List<OrderDetails> findByOrder(Orders order);
	
}
