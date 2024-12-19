package com.nicha.shopping.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nicha.shopping.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
	List<Orders> findByCustomerId(Long customerId);
}
