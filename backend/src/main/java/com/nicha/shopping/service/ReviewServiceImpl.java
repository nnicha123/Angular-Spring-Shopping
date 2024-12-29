package com.nicha.shopping.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.UserRepository;
import com.nicha.shopping.dao.ReviewRepository;
import com.nicha.shopping.dto.ReviewCustomerDetailsDTO;
import com.nicha.shopping.entity.User;
import com.nicha.shopping.entity.Review;

@Service
public class ReviewServiceImpl implements ReviewService {
	
	private ReviewRepository reviewRepository;
	private UserRepository userRepository;
	
	public ReviewServiceImpl(ReviewRepository reviewRepository, UserRepository userRepository) {
		this.reviewRepository = reviewRepository;
		this.userRepository = userRepository;
	}

	@Override
	public List<ReviewCustomerDetailsDTO> findByCustomerId(Long customerId) {
		List<Review> reviews =  this.reviewRepository.findByCustomerId(customerId);
		
		List<ReviewCustomerDetailsDTO> reviewCustomerDetails = getReviewCustomerDetails(reviews);
		return reviewCustomerDetails;
	}

	@Override
	public List<ReviewCustomerDetailsDTO> findByProductId(Long productId) {
		List<Review> reviews =  this.reviewRepository.findByProductId(productId);
		List<ReviewCustomerDetailsDTO> reviewCustomerDetails = getReviewCustomerDetails(reviews);
		return reviewCustomerDetails;

	}
	
	public List<ReviewCustomerDetailsDTO> getReviewCustomerDetails(List<Review> reviews){
		List<ReviewCustomerDetailsDTO> reviewCustomerDetails = new ArrayList<>();
		
		for(int i =0; i< reviews.size(); i++) {
			ReviewCustomerDetailsDTO detail = new ReviewCustomerDetailsDTO();
			Review review = reviews.get(i);
			detail.setId(review.getId());
			detail.setComment(review.getComment());
			detail.setCreatedAt(review.getCreatedAt());
			detail.setUpdatedAt(review.getUpdatedAt());
			detail.setCustomerId(review.getCustomerId());
			detail.setProductId(review.getProductId());
			detail.setRating(review.getRating());
			User user = this.userRepository.getById(review.getCustomerId());
			detail.setCustomerId(review.getCustomerId());
			detail.setImageUrl(user.getImageUrl());
			detail.setName(user.getFirstName() + " "+ user.getLastName());
			
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
