package com.nicha.shopping.entity;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "order-items")
public class OrderItems {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "product_id")
	private Long productId;
	
	@Column(name = "order_id")
	private Long orderId;
	
	@Column(name = "quantity")
	private Integer quantity;
	
	@Column(name = "created_at")
	@CreationTimestamp
	private Date createdAt;
	
	@Column(name = "updated_at")
	@UpdateTimestamp
	private Date updatedAt;
}
