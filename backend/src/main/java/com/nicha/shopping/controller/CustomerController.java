package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.entity.Customer;
import com.nicha.shopping.service.CustomerService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {
	private CustomerService customerService;
	 
	@Autowired
	public CustomerController(CustomerService customerService) {
		this.customerService = customerService;
	}
	
	@GetMapping
	List<Customer> getAllCustomers(){
		return this.customerService.getAllCustomers();
	}

}
