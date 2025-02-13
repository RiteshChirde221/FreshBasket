package com.freshbasket.project.service;

import java.util.List;

import com.freshbasket.project.entities.Customer;
import com.freshbasket.project.entities.Orders;

public interface OrderService {

	Orders saveOrder(Orders order);
	List<Orders> getAllOrders();
	List<Orders> getCustomerOrders(Customer customer);
	Orders findById(Long id);
	public List<Orders> findByCustomerId(Long custid);
}


