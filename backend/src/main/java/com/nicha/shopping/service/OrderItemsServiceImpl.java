package com.nicha.shopping.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.OrderItemsRepository;
import com.nicha.shopping.entity.OrderItems;

@Service
public class OrderItemsServiceImpl implements OrderItemsService {
	
	private OrderItemsRepository orderItemsRepository;
	
	@Autowired
	public OrderItemsServiceImpl(OrderItemsRepository orderItemsRepository) {
		this.orderItemsRepository = orderItemsRepository;
		
	}
	

	@Override
	public List<OrderItems> getAllOrderItems() {
		return this.orderItemsRepository.findAll();
	}


	@Override
	public List<OrderItems> getOrderItemsByOrderId(Long orderId) {
		return this.orderItemsRepository.findByOrderId(orderId);
	}
	
	

}
