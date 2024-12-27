package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.dto.OrderItemDTO;
import com.nicha.shopping.entity.OrderItems;

public interface OrderItemsService {
	List<OrderItems> getAllOrderItems();
	List<OrderItems> getOrderItemsByOrderId(Long orderId);
	List<OrderItemDTO> addOrderItems(List<OrderItemDTO> orderItems, Long orderId);
}
