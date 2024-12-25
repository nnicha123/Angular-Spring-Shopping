package com.nicha.shopping.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.AuthRepository;
import com.nicha.shopping.dao.CustomerRepository;
import com.nicha.shopping.dto.LoginDTO;
import com.nicha.shopping.entity.Auth;
import com.nicha.shopping.entity.Customer;

@Service
public class AuthServiceImpl implements AuthService {
	
	private AuthRepository authRepository;
	private CustomerRepository customerRepository;
	
	public AuthServiceImpl(AuthRepository authRepository, CustomerRepository customerRepository) {
		this.authRepository = authRepository;
		this.customerRepository = customerRepository;
	}

	@Override
    public Customer checkAuth(LoginDTO login) {
		String username = login.getUsername();
		String password = login.getPassword();
        // Find the auth entity by username
        Auth auth = this.authRepository.findByUsername(username);

        // Check if the auth record exists
        if (auth == null) {
            throw new IllegalArgumentException("Invalid username: User not found.");
        }

        // Check if the password matches
        if (!auth.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid password: Authentication failed.");
        }

        // Retrieve the customer associated with the auth entity
        Optional<Customer> optionalCustomer = this.customerRepository.findById(auth.getCustomerId());
        
        // Check if the customer exists
        if (optionalCustomer.isEmpty()) {
            throw new IllegalArgumentException("Customer not found for the given credentials.");
        }

        return optionalCustomer.get();
    }

	@Override
	public List<Auth> findAll() {
		return this.authRepository.findAll();
	}

}
