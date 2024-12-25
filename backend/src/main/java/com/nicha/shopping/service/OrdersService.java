package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.dto.OrderDTO;
import com.nicha.shopping.entity.Orders;

public interface OrdersService {
	List<OrderDTO> getAllOrders();
	List<OrderDTO> findByCustomerId(Long customerId);
	void updateOrderById(Long orderId, Orders orders);
	Long addOrder(OrderDTO orders);
}
