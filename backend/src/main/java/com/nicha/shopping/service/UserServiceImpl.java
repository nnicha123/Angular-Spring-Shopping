package com.nicha.shopping.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.UserRepository;
import com.nicha.shopping.dto.ReviewCustomerDetailsDTO;
import com.nicha.shopping.entity.User;

@Service
public class UserServiceImpl implements UserService {
	private UserRepository userRepository;
	
	@Autowired
	public UserServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;		
	}
	
	@Override
	public List<User> getAllUsers() {
		return this.userRepository.findAll();
	}

	@Override
	public User getUserById(Long id) {
		User user = this.userRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer with ID: " + id + " not found"));
		return user;
	}

	@Override
	public ReviewCustomerDetailsDTO getReviewDetails(Long id) {
		User user = this.getUserById(id);
		ReviewCustomerDetailsDTO details = new ReviewCustomerDetailsDTO();
		details.setName(user.getFirstName() + " " + user.getLastName());
		details.setImageUrl(user.getImageUrl());
		return details;
	}
	
}
