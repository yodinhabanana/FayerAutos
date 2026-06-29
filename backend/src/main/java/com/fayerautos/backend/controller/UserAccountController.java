package com.fayerautos.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fayerautos.backend.model.UserAccount;
import com.fayerautos.backend.service.UserAccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserAccountController {

	private final UserAccountService service;

	@GetMapping
	public ResponseEntity<List<UserAccount>> getAllUsers() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<UserAccount> getUserById(@PathVariable int id) {
		return service.findById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<UserAccount> createUser(@RequestBody UserAccount userAccount) {
		UserAccount savedUser = service.save(userAccount);
		return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
	}

	@PutMapping("/{id}")
	public ResponseEntity<UserAccount> updateUser(@PathVariable int id, @RequestBody UserAccount updatedUser) {
		return service.update(id, updatedUser)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable int id) {
		if (service.deleteById(id)) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
}