package com.freshbasket.project.models;

import org.springframework.beans.BeanUtils;

import com.freshbasket.project.entities.Product;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
public class ProductResponseDto {

	private String brand;
	
	private Long productId;
	
	private String pname;
	
	private String categoryName;
	
	private double price;
	
	private Long sellerId;
	
	private String sellerName;
	
	private String photo;
	
	public static ProductResponseDto fromEntity(Product entity) {
		ProductResponseDto dto = new ProductResponseDto();
		dto.setSellerId(entity.getSeller().getId());
		dto.setSellerName(entity.getSeller().getName());
		dto.setCategoryName(entity.getCategory().getCategoryName());
		BeanUtils.copyProperties(entity, dto);	
		return dto;
	}
}
