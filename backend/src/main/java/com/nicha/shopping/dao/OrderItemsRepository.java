package com.nicha.shopping.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nicha.shopping.entity.OrderItems;

public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {
	
	List<OrderItems> findByOrderId(Long orderId);

}
