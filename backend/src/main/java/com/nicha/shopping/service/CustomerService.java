package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.dto.ReviewCustomerDetails;
import com.nicha.shopping.entity.Customer;

public interface CustomerService {
	List<Customer> getAllCustomers();
	Customer getCustomerById(Long id);
	ReviewCustomerDetails getReviewDetails(Long id);
}
