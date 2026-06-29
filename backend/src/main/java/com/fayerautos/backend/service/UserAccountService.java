package com.fayerautos.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.fayerautos.backend.model.UserAccount;
import com.fayerautos.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserAccountService {

	private final UserRepository repository;

	public List<UserAccount> findAll() {
		return repository.findAll();
	}

	public Optional<UserAccount> findById(int id) {
		return repository.findById(id);
	}

	public UserAccount save(UserAccount userAccount) {
		return repository.save(userAccount);
	}

	public Optional<UserAccount> update(int id, UserAccount updatedUser) {
		return repository.findById(id).map(existingUser -> {
			existingUser.setFullName(updatedUser.getFullName());
			existingUser.setBirthDate(updatedUser.getBirthDate());
			existingUser.setEmail(updatedUser.getEmail());
			existingUser.setDocument(updatedUser.getDocument());
			existingUser.setGender(updatedUser.getGender());
			existingUser.setUsername(updatedUser.getUsername());
			existingUser.setPasswordHash(updatedUser.getPasswordHash());
			existingUser.setUserRoleId(updatedUser.getUserRoleId());
			return repository.save(existingUser);
		});
	}

	public boolean deleteById(int id) {
		if (repository.existsById(id)) {
			repository.deleteById(id);
			return true;
		}
		return false;
	}
}