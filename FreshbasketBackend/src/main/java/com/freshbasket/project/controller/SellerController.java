package com.freshbasket.project.controller;

import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freshbasket.project.entities.Customer;
import com.freshbasket.project.entities.Seller;
import com.freshbasket.project.exception.InvalidCredentialsException;
import com.freshbasket.project.exception.SellerAlreadyExistsException;
import com.freshbasket.project.models.CustomerDto;
import com.freshbasket.project.models.LoginDTO;
import com.freshbasket.project.models.Response;
import com.freshbasket.project.models.SellerDto;
import com.freshbasket.project.service.EmailService;
import com.freshbasket.project.service.OtpGenerator;
import com.freshbasket.project.service.ProductService;
import com.freshbasket.project.service.SellerService;


@CrossOrigin
@RestController
@RequestMapping("/api/sellers")
public class SellerController {

	@Autowired
	SellerService sellerService;
	
	@Autowired
	EmailService emailService;
	
	@Autowired 
	private ProductService productService;
	
	
	@Autowired
	OtpGenerator otpGenerator;
	
//	@PostMapping
//	public ResponseEntity<?> register(@RequestBody SellerDto sellerDto) throws MessagingException{
//		Seller seller=sellerService.registerSeller(sellerDto);
//		if(seller!=null) {
//			String str=seller.getEmail();
//			emailService.sendSimpleEmail(str,"You have registered successfully!\n Email : "+str+"\n Password = "+seller.getPassword(),"Welcome To Woodworks.com services!!");
//			return Response.success(seller);
//		}else
//			return Response.status(HttpStatus.NOT_FOUND);
//	}
//	
//	@PostMapping("/validate")
//	public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
//		System.out.println(dto);
//		Seller seller=sellerService.validate(dto.getEmail(),dto.getPassword());
//		if(seller!=null)
//			return Response.success(seller);
//		else
//			return Response.status(HttpStatus.NOT_FOUND);
//	}
	
	@PostMapping
    public ResponseEntity<?> register(@RequestBody SellerDto sellerDto) throws MessagingException {
        try {
            Seller seller = sellerService.registerSeller(sellerDto);
            String email = seller.getEmail();
            emailService.sendSimpleEmail(email,
                    "You have registered successfully!\nEmail: " + email + "\nPassword: " + seller.getPassword(),
                    "Welcome To FreshBasket.com services!!");

            return Response.success(seller);
        } catch (SellerAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed. Please try again.");
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateUser(@RequestBody LoginDTO dto) {
        try {
            Seller seller = sellerService.validate(dto.getEmail(), dto.getPassword());
            return Response.success(seller);
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during validation.");
        }
    }
	
	
	
	@GetMapping
	public ResponseEntity<?> findAllSellers() {
		System.out.println("findAllSellers...");
		List<Seller> result = sellerService.findAllSellers();
		return Response.success(result);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<?> findSellerById(@PathVariable("id") Long id) {
		System.out.println("findSellerById...");
		Optional<Seller> result = sellerService.findSellerById(id);
		return Response.success(result.get());
	}
	
	/* we have to delete seller but for that 1st we have to delete product but for 
	 * deleting product we have to delete orderdetails and we cannot loose the data or order 
	 * so kahi garaj nahi delete karaychi 
	 
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteSeller(@PathVariable("id") int id) {
		int sellerId=id;
		List<Product>products=productService.findProducts(sellerId);
		for(Product product:products) {
			productService.deleteProduct(product.getProdid());
		}
		sellerService.deleteSeller(id);
		return Response.status(HttpStatus.OK);
	}
	*/
	
	@PutMapping("{id}")
	public ResponseEntity<?> updateProfile(@RequestBody Seller seller,@PathVariable("id") Long id) {
		sellerService.updateProfile(seller,id);
		return Response.status(HttpStatus.OK);
	}
	
	@PostMapping("/forgetpassword")
	public ResponseEntity<?>forgetPassword(@RequestBody SellerDto sellerDto) throws MessagingException {	
		System.out.print("Sending OTP");
		String otp = otpGenerator.generateOTP();
		emailService.sendOtp(sellerDto.getEmail(),"OTP: "+otp,"OTP Verification! Woodworks.com! ");
		Seller seller =sellerService.findByEmail(sellerDto.getEmail());
		if(seller !=null) {
		SellerDto sellDto=new SellerDto();
		BeanUtils.copyProperties(seller, sellDto);
		sellDto.setOtp(otp);
		System.out.print(otp);
		return Response.success(sellDto);
		}else {
			return Response.status(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/resetpassword")
	public ResponseEntity<?>resetPassword(@RequestBody SellerDto sellerDto) throws MessagingException {	
		Seller seller =sellerService.findByEmail(sellerDto.getEmail());
		if(seller !=null) {
			sellerService.resetPassword(seller,sellerDto.getPassword());
			return Response.status(HttpStatus.OK);
		}else {
			return Response.status(HttpStatus.NOT_FOUND);
		}
	}
}
