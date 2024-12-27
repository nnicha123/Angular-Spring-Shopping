package com.nicha.shopping.service;

import java.util.List;
import java.util.Map;
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
	public List<OrderItemDTO> modifyOrderItems(List<OrderItemDTO> orderItems, Long orderId){
//		Remove existing orderItems if it is not in the arguments provided
		List<OrderItems> existingOrderItems = this.orderItemsRepository.findByOrderId(orderId);
		
	    // Convert new order item DTOs to a map for quick lookup by ID
	    Map<Long, OrderItemDTO> newOrderItemMap = orderItems.stream()
	        .filter(item -> item.getId() != null) // Filter out items without an ID
	        .collect(Collectors.toMap(OrderItemDTO::getId, item -> item));

	    // Find existing items that are not in the new list and delete them
	    List<OrderItems> itemsToDelete = existingOrderItems.stream()
	        .filter(existingItem -> !newOrderItemMap.containsKey(existingItem.getId()))
	        .collect(Collectors.toList());
	    this.orderItemsRepository.deleteAll(itemsToDelete);
	    
	    List<OrderItemDTO> savedOrderItemDTOs = addOrderItems(orderItems, orderId);
	    return savedOrderItemDTOs;

	}


	@Override
	public List<OrderItemDTO> addOrderItems(List<OrderItemDTO> orderItems, Long orderId) {
		
//		Add order items with the order Id
		List<OrderItems> newOrderItems = orderItems.stream().map( itemDTO -> {
			OrderItems item = new OrderItems();
			item.setId(itemDTO.getId());
			item.setOrderId(orderId);
			item.setProductId(itemDTO.getProductId());
			item.setQuantity(itemDTO.getQuantity());
			return item;
		}).collect(Collectors.toList());
		
		List<OrderItems> savedOrderItems =  this.orderItemsRepository.saveAll(newOrderItems);
		
	    List<OrderItemDTO> savedOrderItemDTOs = savedOrderItems.stream().map(item -> {
	        OrderItemDTO itemDTO = new OrderItemDTO();
	        itemDTO.setId(item.getId()); // Use the generated ID
	        itemDTO.setProductId(item.getProductId());
	        itemDTO.setQuantity(item.getQuantity());
	        return itemDTO;
	    }).collect(Collectors.toList());
	    
	    return savedOrderItemDTOs;
	}
	
	

}
