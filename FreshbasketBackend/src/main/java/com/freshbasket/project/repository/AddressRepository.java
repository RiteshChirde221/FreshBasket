package com.freshbasket.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.freshbasket.project.entities.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{

}
