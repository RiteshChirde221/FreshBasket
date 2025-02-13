package com.freshbasket.project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freshbasket.project.entities.Address;
import com.freshbasket.project.repository.AddressRepository;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	AddressRepository addressRepo;
	
	@Override
	public Address saveAddress(Address address) {
		// TODO Auto-generated method stub
		return addressRepo.save(address);
	}

	@Override
	public Address findAddress(Long id) {
		// TODO Auto-generated method stub
		Optional<Address> address=addressRepo.findById(id);
		return address.get() ;
	}


}
