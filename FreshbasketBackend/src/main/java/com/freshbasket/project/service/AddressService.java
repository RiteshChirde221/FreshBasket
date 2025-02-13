package com.freshbasket.project.service;

import com.freshbasket.project.entities.Address;

public interface AddressService {
	
	Address saveAddress(Address address);
	
	Address findAddress(Long id);
}
