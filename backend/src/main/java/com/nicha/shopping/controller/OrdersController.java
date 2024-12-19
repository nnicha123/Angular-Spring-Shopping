package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.entity.Orders;
import com.nicha.shopping.service.OrdersService;

@RestController
@RequestMapping("/api/orders")
public class OrdersController {
	private OrdersService ordersService;
	 
	@Autowired
	public OrdersController(OrdersService ordersService) {
		this.ordersService = ordersService;
	}
	
	@GetMapping
	List<Orders> getAllOrders(){
		return this.ordersService.getAllOrders();
	}
	
	@PutMapping("/{orderId}")
	void updateOrderById(@PathVariable Long orderId, @RequestBody Orders orders) {
		this.ordersService.updateOrderById(orderId, orders);
	}
	
}
