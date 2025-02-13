package com.freshbasket.project.service;

import com.freshbasket.project.entities.Payment;

public interface PaymentService {

	Payment savePayment(Payment payment);
	
	Payment findPaymentById(Long id);
}
