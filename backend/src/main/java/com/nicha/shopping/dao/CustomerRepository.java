package com.nicha.shopping.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nicha.shopping.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
