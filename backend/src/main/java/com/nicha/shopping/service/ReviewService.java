package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.entity.Review;

public interface ReviewService {
	List<Review> findByCustomerId(Long customerId);
	List<Review> findByProductId(Long productId);
}
