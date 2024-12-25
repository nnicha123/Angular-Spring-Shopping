package com.nicha.shopping.dto;

import lombok.Data;

@Data
public class OrderItemDTO {
	private Long id;
	private Long productId;
	private Integer quantity;
}
