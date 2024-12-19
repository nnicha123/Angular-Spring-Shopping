package com.nicha.shopping.service;

import java.util.List;
import java.util.Optional;

import com.nicha.shopping.entity.Customer;
import com.nicha.shopping.entity.OrderItems;
import com.nicha.shopping.entity.Orders;
import com.nicha.shopping.entity.Product;

public interface OrderItemsService {
	List<OrderItems> getAllOrderItems();
	List<OrderItems> getOrderItemsByOrderId(Long orderId);
}
