package com.nicha.shopping.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nicha.shopping.dao.AuthRepository;
import com.nicha.shopping.dao.UserRepository;
import com.nicha.shopping.dto.LoginDTO;
import com.nicha.shopping.dto.RegisterDTO;
import com.nicha.shopping.entity.Auth;
import com.nicha.shopping.entity.User;
import com.nicha.shopping.entity.Role;

@Service
public class AuthServiceImpl implements AuthService {
	
	private AuthRepository authRepository;
	private UserRepository userRepository;
	
	public AuthServiceImpl(AuthRepository authRepository, UserRepository userRepository) {
		this.authRepository = authRepository;
		this.userRepository = userRepository;
	}

	@Override
    public User checkAuth(LoginDTO login) {
		String username = login.getUsername();
		String password = login.getPassword();
        // Find the auth entity by username
        Auth auth = this.authRepository.findByUsername(username);

        // Check if the auth record exists
        if (auth == null) {
            throw new IllegalArgumentException("Invalid username: User not found.");
        }

        // Check if the password matches
        if (!auth.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid password: Authentication failed.");
        }

        // Retrieve the User associated with the auth entity
        Optional<User> optionalUser = this.userRepository.findById(auth.getUserId());
        
        // Check if the User exists
        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("User not found for the given credentials.");
        }

        return optionalUser.get();
    }

	@Override
	public User registerUser(RegisterDTO register) {
		String username = register.getUsername();
		String password = register.getPassword();
		String firstName = register.getFirstName();
		String lastName = register.getLastName();
		String address = register.getAddress();
		String imageUrl = register.getImageUrl();
		
		Auth auth = this.authRepository.findByUsername(username);
		
		if(auth != null) {
            throw new IllegalArgumentException("Username already used");
		}
				
		User newUser = new User();
		newUser.setFirstName(firstName);
		newUser.setLastName(lastName);
		newUser.setAddress(address);
		newUser.setImageUrl(imageUrl);
		newUser.setRole(Role.CUSTOMER);
		
		User savedUser = this.userRepository.save(newUser);
		
		Auth newAuth = new Auth();
		newAuth.setPassword(password);
		newAuth.setUsername(username);
		newAuth.setUserId(savedUser.getId());
		
		this.authRepository.save(newAuth);
		
		return savedUser;
	}
	

	@Override
	public List<Auth> findAll() {
		return this.authRepository.findAll();
	}


}
