package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.dto.LoginDTO;
import com.nicha.shopping.entity.Auth;
import com.nicha.shopping.entity.Customer;

public interface AuthService {
	Customer checkAuth(LoginDTO login);
	List<Auth> findAll();
}
