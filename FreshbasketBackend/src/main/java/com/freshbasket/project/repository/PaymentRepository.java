package com.freshbasket.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freshbasket.project.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment,Long>{

}
