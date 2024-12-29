package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.entity.User;
import com.nicha.shopping.service.UserService;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/customers")
public class UserController {
	private UserService userService;
	 
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping
	List<User> getAllUsers(){
		return this.userService.getAllUsers();
	}
	
	@GetMapping("/{id}")
	User getUserById(@PathVariable Long id){
		return this.userService.getUserById(id);
	}

}
