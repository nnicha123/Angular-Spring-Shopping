package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.dto.ReviewCustomerDetailsDTO;
import com.nicha.shopping.entity.Review;

public interface ReviewService {
	List<ReviewCustomerDetailsDTO> findByCustomerId(Long customerId);
	List<ReviewCustomerDetailsDTO> findByProductId(Long productId);
	void addReview(Review review);
	List<ReviewCustomerDetailsDTO> findAll();
	void deleteById(Long id);
}
