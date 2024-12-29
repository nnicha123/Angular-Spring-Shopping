package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.dto.ReviewCustomerDetailsDTO;
import com.nicha.shopping.entity.User;

public interface UserService {
	List<User> getAllUsers();
	User getUserById(Long id);
	ReviewCustomerDetailsDTO getReviewDetails(Long id);
}
