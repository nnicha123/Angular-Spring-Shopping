package com.nicha.shopping.service;

import java.util.Date;

import lombok.Data;

@Data
public class ReviewCustomerDetails {
	private Long id;
	private String name;
	private String imageUrl;
	private String comment;
	private Integer rating;
	private Long productId;
	private Long customerId;
	private Date createdAt;
	private Date updatedAt;
}
