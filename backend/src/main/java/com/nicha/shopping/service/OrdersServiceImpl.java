package com.nicha.shopping.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.OrderItemsRepository;
import com.nicha.shopping.dao.OrdersRepository;
import com.nicha.shopping.dto.OrderDTO;
import com.nicha.shopping.dto.OrderItemDTO;
import com.nicha.shopping.entity.Orders;

@Service
public class OrdersServiceImpl implements OrdersService {
	private OrdersRepository ordersRepository;
	private OrderItemsRepository orderItemsRepository;
	
	@Autowired
	public OrdersServiceImpl(OrdersRepository ordersRepository, OrderItemsRepository orderItemsRepository) {
		this.ordersRepository = ordersRepository;
		this.orderItemsRepository = orderItemsRepository;
	}

	@Override
	public List<OrderDTO> getAllOrders(){
		return getOrderDTOs(this.ordersRepository.findAll());
	}
	
	@Override
	public List<OrderDTO> findByCustomerId(Long customerId) {
		return getOrderDTOs(this.ordersRepository.findByCustomerId(customerId));
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
	public Long addOrder(OrderDTO orders) {
		Orders newOrder = new Orders();

//		For update case
		if(orders.getId() != null) {
			newOrder.setId(orders.getId());
		} else {
			newOrder.setId(null);
		}
		newOrder.setCustomerId(orders.getCustomerId());
		newOrder.setStatus(orders.getStatus());
		newOrder.setTotalPrice(orders.getTotalPrice());
		newOrder.setTotalQuantity(orders.getTotalQuantity());
		Orders savedOrder = this.ordersRepository.save(newOrder);
		
//		Get order Id
		Long savedOrderId = savedOrder.getId();
		return savedOrderId;
		
	}
	
	private List<OrderDTO> getOrderDTOs(List<Orders> orders) {
		return orders.stream().map(order -> {
			OrderDTO newOrderDTO = new OrderDTO();
			if(order.getId() != null) {
				newOrderDTO.setId(order.getId());
			} else {
				newOrderDTO.setId(null);
			}
			newOrderDTO.setCustomerId(order.getCustomerId());
			newOrderDTO.setStatus(order.getStatus());
			newOrderDTO.setTotalPrice(order.getTotalPrice());
			newOrderDTO.setTotalQuantity(order.getTotalQuantity());
			
			List<OrderItemDTO> orderItemDTOs =  getOrderItemDTOs(order);
			
			newOrderDTO.setOrderItems(orderItemDTOs);
			return newOrderDTO;
		}).collect(Collectors.toList());
	}
	
	private List<OrderItemDTO> getOrderItemDTOs(Orders order) {
		return this.orderItemsRepository.findByOrderId(order.getId()).stream().map(orderItem -> {
			OrderItemDTO newOrderItemDTO = new OrderItemDTO();
			if(orderItem.getId() != null) {
				newOrderItemDTO.setId(orderItem.getId());
			}else {
				newOrderItemDTO.setId(null);
			}
			newOrderItemDTO.setProductId(orderItem.getProductId());
			newOrderItemDTO.setQuantity(orderItem.getQuantity());
			return newOrderItemDTO;
		}).collect(Collectors.toList());
	}
}
