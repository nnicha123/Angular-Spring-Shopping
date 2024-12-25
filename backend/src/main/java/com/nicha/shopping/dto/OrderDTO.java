package com.nicha.shopping.dto;

import java.util.List;

import com.nicha.shopping.entity.OrderStatus;

import lombok.Data;

@Data
public class OrderDTO {
	private Long id;
	private Integer totalPrice;
	private Integer totalQuantity;
	private Long customerId;
	private OrderStatus status;
	private List<OrderItemDTO> orderItems; 
}
