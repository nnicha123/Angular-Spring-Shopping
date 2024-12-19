package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.entity.OrderItems;
import com.nicha.shopping.service.OrderItemsService;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemsController {
	private OrderItemsService orderItemsService;
	
	@Autowired
	public OrderItemsController(OrderItemsService orderItemsService) {
		this.orderItemsService = orderItemsService;
	}
	
	@GetMapping
	List<OrderItems> getAllOrderItems(){
		return this.orderItemsService.getAllOrderItems();
	}
	
	@GetMapping("/{orderId}")
	List<OrderItems> getOrderItemsByOrderId(@PathVariable Long orderId){
		return this.orderItemsService.getOrderItemsByOrderId(orderId);
	}
}
