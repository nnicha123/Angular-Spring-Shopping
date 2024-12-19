package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.entity.Customer;
import com.nicha.shopping.entity.OrderItems;
import com.nicha.shopping.entity.Orders;
import com.nicha.shopping.entity.Product;

public interface ShoppingService {
	List<Customer> getAllCustomers();
	List<Product> getAllProducts();
	List<Orders> getAllOrders();
	List<OrderItems> getAllOrderItems();
}
