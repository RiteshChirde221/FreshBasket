package com.freshbasket.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.freshbasket.project.entities.Customer;
import com.freshbasket.project.entities.Seller;
import com.freshbasket.project.exception.InvalidCredentialsException;
import com.freshbasket.project.exception.SellerAlreadyExistsException;
import com.freshbasket.project.models.SellerDto;
import com.freshbasket.project.repository.SellerRepository;

@Service
public class SellerServiceImpl implements SellerService {
    
    @Autowired
    SellerRepository sellerRepo;
    
    PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    
    @Override
    public Seller registerSeller(SellerDto sellerDto) {
        Seller existingSeller = sellerRepo.findByEmail(sellerDto.getEmail());

        if (existingSeller != null) {
            throw new SellerAlreadyExistsException("Seller with email " + sellerDto.getEmail() + " already exists!");
        }

        Seller newSeller = new Seller();
        String encodedPassword = passwordEncoder.encode(sellerDto.getPassword());
        sellerDto.setPassword(encodedPassword);
        BeanUtils.copyProperties(sellerDto, newSeller);
        return sellerRepo.save(newSeller);
    }

    @Override
    public Seller validate(String email, String password) {
        Seller seller = sellerRepo.findByEmail(email);
        if (seller == null || !passwordEncoder.matches(password, seller.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password!");
        }
        return seller;
    }
    
    @Override
    public List<Seller> findAllSellers() {
        return sellerRepo.findAll();
    }

    @Override
    public Optional<Seller> findSellerById(Long id) {
        return sellerRepo.findById(id);
    }

    @Override
    public void updateProfile(Seller seller, Long id) {
        System.out.println("Updating profile..."+id);
        Optional<Seller> seller1 = sellerRepo.findById(id);
        if (seller1.isPresent()) {
            if (seller.getPassword() == null || seller.getPassword().isEmpty()) {
                seller.setPassword(seller1.get().getPassword());
            } else if (seller.getPassword().equals(seller1.get().getPassword())) {
                seller.setPassword(seller1.get().getPassword());
            } else {
                String encodedPassword = passwordEncoder.encode(seller.getPassword());
                seller.setPassword(encodedPassword);
            }
            sellerRepo.save(seller);
        }
    }

    @Override
    public Seller findByEmail(String email) {
        return sellerRepo.findByEmail(email);
    }

    @Override
    public void resetPassword(Seller seller, String password) {
        String encodedPassword = passwordEncoder.encode(password);
        seller.setPassword(encodedPassword);
        sellerRepo.save(seller);
    }

    @Override
    public void deleteSellerById(Long id) {
        sellerRepo.deleteById(id);
    }
}
