package com.nicha.shopping.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "role")
	@Enumerated(EnumType.STRING)
	private Role role;

	@Column(name = "address")
	private String address;
	
	@Column(name = "image_url")
	private String imageUrl;
	
}
