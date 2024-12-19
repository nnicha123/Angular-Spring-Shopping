package com.nicha.shopping.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.CustomerRepository;
import com.nicha.shopping.dao.OrderItemsRepository;
import com.nicha.shopping.dao.OrdersRepository;
import com.nicha.shopping.dao.ProductRepository;
import com.nicha.shopping.entity.Customer;
import com.nicha.shopping.entity.OrderItems;
import com.nicha.shopping.entity.Orders;
import com.nicha.shopping.entity.Product;

@Service
public class ShoppingServiceImpl implements ShoppingService {
	
	private CustomerRepository customerRepository;
	private ProductRepository productRepository;
	private OrdersRepository ordersRepository;
	private OrderItemsRepository orderItemsRepository;
	
	@Autowired
	public ShoppingServiceImpl(CustomerRepository customerRepository, ProductRepository productRepository, OrdersRepository ordersRepository, OrderItemsRepository orderItemsRepository) {
		this.customerRepository = customerRepository;
		this.productRepository = productRepository;
		this.ordersRepository = ordersRepository;
		this.orderItemsRepository = orderItemsRepository;
		
	}

	@Override
	public List<Customer> getAllCustomers() {
		return this.customerRepository.findAll();
	}
	
	@Override
	public List<Product> getAllProducts(){
		return this.productRepository.findAll();
	}
	
	@Override
	public List<Orders> getAllOrders(){
		return this.ordersRepository.findAll();
	}

	@Override
	public List<OrderItems> getAllOrderItems() {
		return this.orderItemsRepository.findAll();
	}

}
