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
@Table(name = "orders")
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "status")
	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
	@Column(name = "total_price")
	private Integer totalPrice;
	
	@Column(name = "total_quantity")
	private Integer totalQuantity;
	
	@Column(name = "customer_id")
	private Long customerId;
	
	@Column(name = "created_at")
	@CreationTimestamp
	private Date createdAt;
	
	@Column(name = "updated_at")
	@UpdateTimestamp
	private Date updatedAt;
}
