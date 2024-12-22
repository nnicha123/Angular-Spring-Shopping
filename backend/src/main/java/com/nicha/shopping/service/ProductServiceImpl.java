package com.nicha.shopping.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.ProductRepository;
import com.nicha.shopping.entity.Product;

@Service
public class ProductServiceImpl implements ProductService {
	
	private ProductRepository productRepository;
	
	@Autowired
	public ProductServiceImpl(ProductRepository productRepository) {
		this.productRepository = productRepository;
		
	}
	
	@Override
	public List<Product> getAllProducts(){
		return this.productRepository.findAll();
	}

	@Override
	public void updateProductById(Long id, Product updatedProduct) {
		Product existingProduct = this.productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product with ID " + id + " not found"));
		
		existingProduct.setDescription(updatedProduct.getDescription());
		existingProduct.setImageUrl(updatedProduct.getImageUrl());
		existingProduct.setName(updatedProduct.getName());
		existingProduct.setNumInStock(updatedProduct.getNumInStock());
		existingProduct.setNumSold(updatedProduct.getNumSold());
		existingProduct.setPrice(updatedProduct.getPrice());
		existingProduct.setRating(updatedProduct.getRating());
		existingProduct.setNumRatings(updatedProduct.getNumRatings());
		
		this.productRepository.save(existingProduct);
	}

	@Override
	public void addProduct(Product newProduct) {
		newProduct.setId(null);
		this.productRepository.save(newProduct);
	}

	@Override
	public Product getProductById(Long id) {
		Product product =  this.productRepository.findById(id).orElseThrow(() -> new RuntimeException("Product with ID: " + id + " not found"));
		return product;
	}
	

}
