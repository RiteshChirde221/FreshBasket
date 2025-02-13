package com.freshbasket.project.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.freshbasket.project.entities.Address;
import com.freshbasket.project.entities.Category;
import com.freshbasket.project.entities.Customer;
import com.freshbasket.project.entities.OrderDetails;
import com.freshbasket.project.entities.Orders;
import com.freshbasket.project.entities.Payment;
import com.freshbasket.project.entities.Product;
import com.freshbasket.project.models.CartDTO;
import com.freshbasket.project.models.OrderDetailsDTO;
import com.freshbasket.project.models.OrderResponseDTO;
import com.freshbasket.project.models.PlaceOrderDTO;
import com.freshbasket.project.models.Response;
import com.freshbasket.project.service.AddressService;
import com.freshbasket.project.service.CategoryService;
import com.freshbasket.project.service.CustomerService;
import com.freshbasket.project.service.EmailService;
import com.freshbasket.project.service.OrderDetailsService;
import com.freshbasket.project.service.OrderService;
import com.freshbasket.project.service.PaymentService;
import com.freshbasket.project.service.ProductService;



@CrossOrigin
@RestController
@RequestMapping("/api/orders")
public class OrdersController {

	@Autowired 
	OrderService orderService;
	
	@Autowired 
	CustomerService customerService;
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired 
	AddressService addressService;
	
	@Autowired 
	PaymentService paymentService;
	
	@Autowired 
	OrderDetailsService orderDetailsService;
	
	@Autowired 
	ProductService productService;	
	
	@Autowired 
	EmailService emailService;
	
	@PostMapping
	public ResponseEntity<?> save(@RequestBody PlaceOrderDTO dto) throws MessagingException {	
		
		Address address=addressService.saveAddress(dto.getAddress());
		System.out.println("Address Saved"+address);
		dto.getPayment().setPaymentDate(new Date());
		
		Payment payment=paymentService.savePayment(dto.getPayment());
		System.out.println("Payment Saved"+payment);
		
		Orders order=new Orders();
		order.setOrderDate(new Date());
		order.setAddress(address);
		order.setPayment(payment);
		
		Optional<Customer> customer=customerService.findCustomerById(dto.getCustomerId());
		order.setCustomer(customer.get());
		
		Orders orders=orderService.saveOrder(order);
		
		for(CartDTO cart : dto.getCart()) {
			OrderDetails od=new OrderDetails();
			od.setOrders(orders);
			od.setQty(cart.getQty());
			
			Optional<Product> product=productService.findProductById(cart.getProductId());
			
			Category category =categoryService.findByName(cart.getCategoryName());
			product.get().setCategory(category);
			
			od.setProduct(product.get());
			
			orderDetailsService.saveOrderDetails(od);
		}
		
		
		//return type of customer is optional so customer.get().getEmail()
		emailService.sendSimpleEmail(customer.get().getEmail(),"Your ordered is placed successfully!\n ","Welcome!!");
		
		System.out.println(dto.getAddress());
		System.out.println(dto.getCustomerId());
		System.out.println(dto.getPayment());
		System.out.println(dto.getCart().get(0));
		return Response.status(HttpStatus.OK);
	}
	
	
	@GetMapping
	public ResponseEntity<?> findAllOrders(Optional<Long> custId) {
		List<Orders> result=null;
		if(custId.isPresent()) {
			Optional<Customer> customer=customerService.findCustomerById(custId.get());
			 result= orderService.getCustomerOrders(customer.get());
		}else {
			result = orderService.getAllOrders();
		}
		return Response.success(result);
	}
//	@GetMapping("/{Id}")
//	public ResponseEntity<?> findAllOrders(@RequestParam(value = "custId", required = false) Integer custId) {
//	    List<Orders> result = null;
//	    if (custId != null) {
//	        Optional<Customer> customer = customerService.findCustomerById(custId);
//	        if (customer.isPresent()) {
//	            result = orderService.getCustomerOrders(customer.get());
//	        } else {
//	            // Handle case when customer is not found for the given custId
//	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
//	        }
//	    } else {
//	        result = orderService.getAllOrders();
//	    }
//	    return ResponseEntity.ok(result);
//	}
	@GetMapping("/customer/{custid}")
	public ResponseEntity<?> findOrdersByCustomerId(@PathVariable("custid") Long custid) {
	    List<Orders> orders = orderService.findByCustomerId(custid);
	    if (orders.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No orders found for this customer.");
	    }
	    return ResponseEntity.ok(orders);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findOrderById(@PathVariable("id") Long id) {
		
		Orders order = orderService.findById(id);
		
		List<OrderDetails> details=orderDetailsService.findByOrder(order);
		
		List<OrderDetailsDTO> detailsdto=new ArrayList<OrderDetailsDTO>();
		
		details.forEach(od -> {
			OrderDetailsDTO dto=OrderDetailsDTO.fromEntity(od);
			detailsdto.add(dto);
		});
		
		OrderResponseDTO result=new OrderResponseDTO();
		result.setOrder(order);
		result.setDetails(detailsdto);
		return Response.success(result);
	}

}

