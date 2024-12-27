package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.dto.OrderDTO;
import com.nicha.shopping.dto.OrderItemDTO;
import com.nicha.shopping.entity.OrderItems;
import com.nicha.shopping.entity.Orders;
import com.nicha.shopping.service.OrderItemsService;
import com.nicha.shopping.service.OrdersService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/orders")
public class OrdersController {
	private OrdersService ordersService;
	private OrderItemsService orderItemsService;
	 
	@Autowired
	public OrdersController(OrdersService ordersService, OrderItemsService orderItemsService) {
		this.ordersService = ordersService;
		this.orderItemsService = orderItemsService;
	}
	
	@GetMapping
	public List<OrderDTO> getAllOrders(){
		return this.ordersService.getAllOrders();
	}
	
	@GetMapping("/customer/{customerId}")
	public List<OrderDTO> findByCustomerId(@PathVariable Long customerId){
		return this.ordersService.findByCustomerId(customerId);
	}
	
	@PostMapping
	OrderDTO addOrder(@RequestBody OrderDTO orders) {
		OrderDTO orderDTO = this.ordersService.addOrder(orders);
		List<OrderItemDTO> savedOrderItems =  this.orderItemsService.addOrderItems(orders.getOrderItems(), orderDTO.getId());
		orderDTO.setOrderItems(savedOrderItems);
		return orderDTO;
	}
	
	@PutMapping("/{orderId}")
	void updateOrderById(@PathVariable Long orderId, @RequestBody Orders orders) {
		this.ordersService.updateOrderById(orderId, orders);
	}
	
}
