package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.entity.Review;
import com.nicha.shopping.service.ReviewService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/review")
public class ReviewController {
	private ReviewService reviewService;
	
	public ReviewController(ReviewService reviewService) {
		this.reviewService = reviewService;
	}
	
	@GetMapping("/customer/{customerId}")
	List<Review> getReviewByCustomerId(@PathVariable Long customerId){
		return this.reviewService.findByCustomerId(customerId);
	}
	
	@GetMapping("/product/{productId}")
	List<Review> getReviewByProductId(@PathVariable Long productId){
		return this.reviewService.findByProductId(productId);
	}
}
