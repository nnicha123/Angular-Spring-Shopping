package com.nicha.shopping.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ReviewCustomerDetailsDTO {
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
