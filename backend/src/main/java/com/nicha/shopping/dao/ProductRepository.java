package com.nicha.shopping.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nicha.shopping.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
