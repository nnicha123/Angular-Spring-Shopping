package com.nicha.shopping.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nicha.shopping.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
