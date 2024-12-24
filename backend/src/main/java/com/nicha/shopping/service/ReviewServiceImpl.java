package com.nicha.shopping.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.CustomerRepository;
import com.nicha.shopping.dao.ReviewRepository;
import com.nicha.shopping.dto.ReviewCustomerDetails;
import com.nicha.shopping.entity.Customer;
import com.nicha.shopping.entity.Review;

@Service
public class ReviewServiceImpl implements ReviewService {
	
	private ReviewRepository reviewRepository;
	private CustomerRepository customerRepository;
	
	public ReviewServiceImpl(ReviewRepository reviewRepository, CustomerRepository customerRepository) {
		this.reviewRepository = reviewRepository;
		this.customerRepository = customerRepository;
	}

	@Override
	public List<ReviewCustomerDetails> findByCustomerId(Long customerId) {
		List<Review> reviews =  this.reviewRepository.findByCustomerId(customerId);
		
		List<ReviewCustomerDetails> reviewCustomerDetails = getReviewCustomerDetails(reviews);
		return reviewCustomerDetails;
	}

	@Override
	public List<ReviewCustomerDetails> findByProductId(Long productId) {
		List<Review> reviews =  this.reviewRepository.findByProductId(productId);
		List<ReviewCustomerDetails> reviewCustomerDetails = getReviewCustomerDetails(reviews);
		return reviewCustomerDetails;

	}
	
	public List<ReviewCustomerDetails> getReviewCustomerDetails(List<Review> reviews){
		List<ReviewCustomerDetails> reviewCustomerDetails = new ArrayList<>();
		
		for(int i =0; i< reviews.size(); i++) {
			ReviewCustomerDetails detail = new ReviewCustomerDetails();
			Review review = reviews.get(i);
			detail.setId(review.getId());
			detail.setComment(review.getComment());
			detail.setCreatedAt(review.getCreatedAt());
			detail.setUpdatedAt(review.getUpdatedAt());
			detail.setCustomerId(review.getCustomerId());
			detail.setProductId(review.getProductId());
			detail.setRating(review.getRating());
			Customer customer = this.customerRepository.getById(review.getCustomerId());
			detail.setCustomerId(review.getCustomerId());
			detail.setImageUrl(customer.getImageUrl());
			detail.setName(customer.getFirstName() + " "+ customer.getLastName());
			
			reviewCustomerDetails.add(detail);
		}
		
		return reviewCustomerDetails;
	}

	@Override
	public void addReview(Review review) {
		review.setId(null);
		this.reviewRepository.save(review);
		
	}

}
