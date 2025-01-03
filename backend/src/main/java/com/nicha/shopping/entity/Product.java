package com.nicha.shopping.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	@Column(name = "rating")
	private Integer rating;
	
	@Column(name = "num_ratings")
	private Integer numRatings;
	
	@Column(name = "num_in_stock")
	private Integer numInStock;
	
	@Column(name = "num_sold")
	private Integer numSold;
	
	@Column(name = "price")
	private Double price;
}
