package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.entity.Product;

public interface ProductService {
	List<Product> getAllProducts();
	Product getProductById(Long id);
	void updateProductById(Long id, Product updatedProduct);
	void addProduct(Product newProduct);
}
