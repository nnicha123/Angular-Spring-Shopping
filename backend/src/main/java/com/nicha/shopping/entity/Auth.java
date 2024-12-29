package com.nicha.shopping.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "auth")
public class Auth {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "username")
	private String username;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "user_id")
	private Long userId;
}
