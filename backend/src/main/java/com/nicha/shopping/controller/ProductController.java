package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.entity.Product;
import com.nicha.shopping.service.ProductService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/products")
public class ProductController {
	
	private ProductService productService;
	 
	@Autowired
	public ProductController(ProductService productService) {
		this.productService = productService;
	}

	
	@GetMapping
	List<Product> getAllProducts(){
		return this.productService.getAllProducts();
	}
	
	@PutMapping("/{id}")
	void updateProductById(@PathVariable Long id, @RequestBody Product updatedProduct) {
		this.productService.updateProductById(id, updatedProduct);
	}
	
	@PostMapping
	void addNewProduct(@RequestBody Product newProduct) {
		this.productService.addProduct(newProduct);
	}
}
