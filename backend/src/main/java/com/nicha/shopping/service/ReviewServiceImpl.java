package com.nicha.shopping.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.ReviewRepository;
import com.nicha.shopping.entity.Review;

@Service
public class ReviewServiceImpl implements ReviewService {
	
	private ReviewRepository reviewRepository;
	
	public ReviewServiceImpl(ReviewRepository reviewRepository) {
		this.reviewRepository = reviewRepository;
	}

	@Override
	public List<Review> findByCustomerId(Long customerId) {
		return this.reviewRepository.findByCustomerId(customerId);
	}

	@Override
	public List<Review> findByProductId(Long productId) {
		return this.reviewRepository.findByProductId(productId);
	}

}
