package com.nicha.shopping.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.OrdersRepository;
import com.nicha.shopping.entity.Orders;

@Service
public class OrdersServiceImpl implements OrdersService {
	private OrdersRepository ordersRepository;
	
	@Autowired
	public OrdersServiceImpl(OrdersRepository ordersRepository) {
		this.ordersRepository = ordersRepository;
		
	}
	

	@Override
	public List<Orders> getAllOrders(){
		return this.ordersRepository.findAll();
	}


	@Override
	public void updateOrderById(Long orderId, Orders updatedOrder) {
	    Orders existingOrder = this.ordersRepository.findById(orderId)
	            .orElseThrow(() -> new RuntimeException("Order with ID " + orderId + " not found"));

	    existingOrder.setUpdatedAt(updatedOrder.getUpdatedAt());
	    existingOrder.setCustomerId(updatedOrder.getCustomerId());
	    existingOrder.setStatus(updatedOrder.getStatus());
	    existingOrder.setTotalPrice(updatedOrder.getTotalPrice());
	    existingOrder.setTotalQuantity(updatedOrder.getTotalQuantity());

	    this.ordersRepository.save(existingOrder);

		
	}


	@Override
	public List<Orders> findByCustomerId(Long customerId) {
		return this.ordersRepository.findByCustomerId(customerId);
	}
}
