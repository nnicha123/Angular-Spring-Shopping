package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.entity.Customer;
import com.nicha.shopping.service.CustomerService;

@CrossOrigin("http://localhost:4200")
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
	
	@GetMapping("/{id}")
	Customer getCustomerById(@PathVariable Long id){
		return this.customerService.getCustomerById(id);
	}

}
