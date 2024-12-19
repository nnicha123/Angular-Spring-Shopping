package com.nicha.shopping.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.CustomerRepository;
import com.nicha.shopping.dao.ProductRepository;
import com.nicha.shopping.entity.Customer;
import com.nicha.shopping.entity.Product;

@Service
public class ShoppingServiceImpl implements ShoppingService {
	
	private CustomerRepository customerRepository;
	private ProductRepository productRepository;
	
	@Autowired
	public ShoppingServiceImpl(CustomerRepository customerRepository, ProductRepository productRepository) {
		this.customerRepository = customerRepository;
		this.productRepository = productRepository;
	}

	@Override
	public List<Customer> getAllCustomers() {
		return this.customerRepository.findAll();
	}
	
	@Override
	public List<Product> getAllProducts(){
		return this.productRepository.findAll();
	}

}
