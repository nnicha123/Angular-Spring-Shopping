package com.nicha.shopping.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nicha.shopping.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

}
