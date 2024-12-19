package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.entity.Orders;

public interface OrdersService {
	List<Orders> getAllOrders();
	List<Orders> findByCustomerId(Long customerId);
	void updateOrderById(Long orderId, Orders orders);
}
