package com.nicha.shopping.service;

import java.util.List;

import com.nicha.shopping.dto.LoginDTO;
import com.nicha.shopping.dto.RegisterDTO;
import com.nicha.shopping.entity.Auth;
import com.nicha.shopping.entity.User;

public interface AuthService {
	User checkAuth(LoginDTO login);
	User registerUser(RegisterDTO register);
	List<Auth> findAll();
}
