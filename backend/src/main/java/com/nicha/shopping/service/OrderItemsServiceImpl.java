package com.nicha.shopping.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.OrderItemsRepository;
import com.nicha.shopping.dto.OrderItemDTO;
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


	@Override
	public void addOrderItems(List<OrderItemDTO> orderItems, Long orderId) {
//		Add order items with the order Id
		List<OrderItems> newOrderItems = orderItems.stream().map( itemDTO -> {
			OrderItems item = new OrderItems();
			item.setId(itemDTO.getId());
			item.setOrderId(orderId);
			item.setProductId(itemDTO.getProductId());
			item.setQuantity(itemDTO.getQuantity());
			return item;
		}).collect(Collectors.toList());
		
		this.orderItemsRepository.saveAll(newOrderItems);
	}
	
	

}
