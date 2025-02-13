package com.freshbasket.project.models;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDto {
	
	private Long id;
	
	private String name;
	
	private String city;
	
	private String email;
	
	private String password;
	
	private long phone;
	
	private String gender;
	
	private Date createdTimestamp=new Date();
	
	//used for forget password
	private String otp;
}
