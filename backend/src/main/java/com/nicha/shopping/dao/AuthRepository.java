package com.nicha.shopping.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nicha.shopping.entity.Auth;

public interface AuthRepository extends JpaRepository<Auth, Long> {
	Auth findByUsername(String username);
}
