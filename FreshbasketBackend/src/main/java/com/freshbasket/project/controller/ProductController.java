package com.freshbasket.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freshbasket.project.entities.Category;
import com.freshbasket.project.entities.Product;
import com.freshbasket.project.entities.Seller;
import com.freshbasket.project.models.ProductDto;
import com.freshbasket.project.models.ProductPagedResponseDTO;
import com.freshbasket.project.models.ProductResponseDto;
import com.freshbasket.project.models.Response;
import com.freshbasket.project.service.CategoryService;
import com.freshbasket.project.service.ProductService;
import com.freshbasket.project.service.SellerService;
import com.freshbasket.project.utils.StorageService;


@CrossOrigin()
@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	@Autowired
	ProductService productService;
	
	@Autowired
	SellerService sellerService;
	
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	private StorageService storageService;
	
	@PostMapping
	public ResponseEntity<?> saveProduct(ProductDto dto) {
		
		System.out.println(dto);
		Product product=ProductDto.toEntity(dto);    //Model Mapping 
		
		Optional<Seller> seller=sellerService.findSellerById(dto.getSellerId());
		product.setSeller(seller.get());
		
		Category category=categoryService.findByName(dto.getCategoryName());
		System.out.println(category.getCategoryId()+" "+category.getCategoryName());
		product.setCategory(category);
		
		Product product1=productService.addProduct(product,dto.getPic());    //pic conversion to string
		return Response.success(product1);
	}
	
	//SellerId kept optional if sellerid is sent then products assigned to seller will be fetched.
	//otherwise fetching of all products
	//      /api/products?sellerId=1    or /api/products
	@GetMapping
	public ResponseEntity<?> findAllProducts(Optional<Long> sellerId) {
		System.out.println("findAllProducts");
		List<ProductResponseDto> result =new ArrayList<ProductResponseDto>();
		
		if(sellerId.isPresent()) {
			System.out.println("findAllProducts"+sellerId);
			List<Product>products=productService.findProducts(sellerId.get());
			for(Product product : products) {
				result.add(ProductResponseDto.fromEntity(product));
			}
			
		}else {
			System.out.println("getAllProducts"+sellerId);
			for(Product product : productService.getAllProducts()) {
				result.add(ProductResponseDto.fromEntity(product));
			}
		}	
		return Response.success(result);
	}
	
	//   PUT:        /api/products/1
	@PutMapping("{id}")
	public ResponseEntity<?> updateProduct(@RequestBody ProductDto productDto,@PathVariable("id") int id) {	
		System.out.println(productDto);
		Product product=ProductDto.toEntity(productDto);    //Model Mapping 
		
		Optional<Seller> seller=sellerService.findSellerById(productDto.getSellerId());
		product.setSeller(seller.get());
		

		Category category=categoryService.findByName(productDto.getCategoryName());
		System.out.println(category.getCategoryId()+" "+category.getCategoryName());
		product.setCategory(category);
		
			System.out.println("updating product.. ");
			productService.updateProduct(product);
			return Response.success(product);		
	}
	
	
	
	//GET   : /api/products/1
	@GetMapping("{id}")
	public ResponseEntity<?> findProduct(@PathVariable("id")Long productId) {
		Optional<Product> product=productService.findProductById(productId);
		return Response.success(ProductResponseDto.fromEntity(product.get()));
	}	
	
	//GET :    /api/products/category?cat=Chair
	@GetMapping("/category")
	public ResponseEntity<?> findCategoryProducts(String cat) {
		System.out.println("categoyName..."+cat);
		List<ProductResponseDto> result = new ArrayList<ProductResponseDto>();
		
		
		for(Product p : productService.categoryProducts(cat)) {
			result.add(ProductResponseDto.fromEntity(p));
		}	
		return Response.success(result);
	}
	
	@GetMapping("/paginated")
	public ResponseEntity<?> paginatedProducts(int page,int pagesize) {
		List<ProductResponseDto> result = new ArrayList<ProductResponseDto>();
		Page<Product> data=productService.allProductsPaginated(page, pagesize);
		data.forEach(item-> {
			result.add(ProductResponseDto.fromEntity(item));
		});
		ProductPagedResponseDTO resp=new ProductPagedResponseDTO();
		resp.setPagesize(pagesize);
		resp.setCurrent(page);
		resp.setTotal(data.getTotalElements());
		resp.setPlist(result);
		return Response.success(resp);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteEvent(@PathVariable("id") Long id) {
		productService.deleteEvent(id);
		return Response.status(HttpStatus.OK);
	}
	
}
