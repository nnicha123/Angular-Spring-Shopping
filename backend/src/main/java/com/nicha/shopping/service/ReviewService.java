package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.entity.Review;

public interface ReviewService {
	List<ReviewCustomerDetails> findByCustomerId(Long customerId);
	List<ReviewCustomerDetails> findByProductId(Long productId);
}
