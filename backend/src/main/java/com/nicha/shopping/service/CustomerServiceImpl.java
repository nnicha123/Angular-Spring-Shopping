package com.nicha.shopping.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.CustomerRepository;
import com.nicha.shopping.dto.ReviewCustomerDetailsDTO;
import com.nicha.shopping.entity.Customer;

@Service
public class CustomerServiceImpl implements CustomerService {
	private CustomerRepository customerRepository;
	
	@Autowired
	public CustomerServiceImpl(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;		
	}
	
	@Override
	public List<Customer> getAllCustomers() {
		return this.customerRepository.findAll();
	}

	@Override
	public Customer getCustomerById(Long id) {
		Customer customer = this.customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer with ID: " + id + " not found"));
		return customer;
	}

	@Override
	public ReviewCustomerDetailsDTO getReviewDetails(Long id) {
		Customer customer = this.getCustomerById(id);
		ReviewCustomerDetailsDTO details = new ReviewCustomerDetailsDTO();
		details.setName(customer.getFirstName() + " " + customer.getLastName());
		details.setImageUrl(customer.getImageUrl());
		return details;
	}
	
}
