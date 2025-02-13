package com.freshbasket.project.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDto {
	
	private Long id;
	
	private String email;
	
	private String password;
	
	private String uname;
	
	//used for forget password
	private String otp;
}
