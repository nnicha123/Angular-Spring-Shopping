package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.entity.Customer;
import com.nicha.shopping.entity.Product;
import com.nicha.shopping.service.ShoppingService;

@RestController
@RequestMapping("/api")
public class ShoppingController {
	
	private ShoppingService shoppingService;
	
	@Autowired
	public ShoppingController(ShoppingService shoppingService) {
		this.shoppingService = shoppingService;
	}
	
//	@GetMapping("/customers")
//	List<Customer> getAllCustomers(){
//		return this.shoppingService.getAllCustomers();
//	}
	
	@GetMapping("/products")
	List<Product> getAllProducts(){
		return this.shoppingService.getAllProducts();
	}
}
