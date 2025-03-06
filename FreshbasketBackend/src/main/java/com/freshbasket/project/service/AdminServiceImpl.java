package com.freshbasket.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.freshbasket.project.entities.Admin;
import com.freshbasket.project.entities.Customer;
import com.freshbasket.project.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	AdminRepository adminRepo;
	
//	PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

	@Override
	public Admin validate(String email, String password) {
		System.out.println("validating Admin...");
		Admin admin=adminRepo.findByEmail(email);
		System.out.println(admin.getPassword());
		
	if (admin != null) {
          if (admin.getPassword().equals(password)) { // Plaintext password comparison
            return admin;
          } else {
            System.out.println("Invalid password.");
         }
      } else {
        System.out.println("Admin not found.");
      }
		return null;
	}

	@Override
	public void updateAdmin(Admin admin) {
		Admin admin1=adminRepo.findByEmail(admin.getEmail());
		if(admin.getPassword().equals("") || admin.getPassword()==null) {
			admin.setPassword(admin1.getPassword());
		}
		String encodedPassword=admin.getPassword();
		admin1.setPassword(encodedPassword);
		adminRepo.save(admin1);	
	}

	@Override
	public Admin findByEmail(String email) {
		// TODO Auto-generated method stub
		return adminRepo.findByEmail(email);
	}

	@Override
	public void resetPassword(Admin admin, String password) {
		String encodedPassword =(password);
		admin.setPassword(encodedPassword);
		adminRepo.save(admin);
	}

}
