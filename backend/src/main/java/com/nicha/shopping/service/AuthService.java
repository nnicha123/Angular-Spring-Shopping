package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.entity.Auth;
import com.nicha.shopping.entity.Customer;

public interface AuthService {
	Customer checkAuth(Login login);
	List<Auth> findAll();
}
