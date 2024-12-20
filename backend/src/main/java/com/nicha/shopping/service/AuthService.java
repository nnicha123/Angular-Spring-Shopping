package com.nicha.shopping.service;

import com.nicha.shopping.entity.Customer;

public interface AuthService {
	Customer checkAuth(Login login);
}
