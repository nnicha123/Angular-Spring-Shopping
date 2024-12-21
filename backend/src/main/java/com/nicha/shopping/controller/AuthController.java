package com.nicha.shopping.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicha.shopping.entity.Auth;
import com.nicha.shopping.entity.Customer;
import com.nicha.shopping.service.AuthService;
import com.nicha.shopping.service.Login;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	private AuthService authService;
	
	public AuthController(AuthService authService) {
		this.authService = authService;
	}
	
	@GetMapping
	List<Auth> findAll(){
		return this.authService.findAll();
	}
	
	@PostMapping
	Customer checkAuth(@RequestBody Login login) {
		return this.authService.checkAuth(login);
	}
}
