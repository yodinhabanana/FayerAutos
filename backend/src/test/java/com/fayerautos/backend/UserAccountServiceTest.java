package com.fayerautos.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fayerautos.backend.model.UserAccount;
import com.fayerautos.backend.repository.UserRepository;
import com.fayerautos.backend.service.UserAccountService;

@ExtendWith(MockitoExtension.class)
class UserAccountTest {

    @InjectMocks
    private UserAccountService service;

    @Mock
    private UserRepository repository;

    @Test
    void deveSalvarUsuario() {
        UserAccount user = UserAccount.builder()
                .email("teste@email.com")
                .username("teste")
                .build();

        when(repository.save(any(UserAccount.class)))
                .thenReturn(user);

        UserAccount result = service.save(user);

        assertEquals("teste@email.com", result.getEmail());
    }

    @Test
    void deveListarUsuarios() {
        when(repository.findAll())
                .thenReturn(List.of(new UserAccount()));

        List<UserAccount> result = service.findAll();

        assertEquals(1, result.size());
    }

    @Test
    void deveBuscarPorId() {
        UserAccount user = new UserAccount();
        user.setId(1);

        when(repository.findById(1))
                .thenReturn(Optional.of(user));

        Optional<UserAccount> result = service.findById(1);

        assertTrue(result.isPresent());
    }

    @Test
    void deveDeletarUsuario() {
        when(repository.existsById(1)).thenReturn(true);

        boolean result = service.deleteById(1);

        assertTrue(result);
        verify(repository).deleteById(1);
    }

    @Test
    void deveAtualizarUsuario() {
        UserAccount existing = UserAccount.builder()
                .id(1)
                .email("old@email.com")
                .username("old")
                .build();

        UserAccount updated = UserAccount.builder()
                .email("new@email.com")
                .username("new")
                .build();

        when(repository.findById(1)).thenReturn(Optional.of(existing));
        when(repository.save(any(UserAccount.class))).thenReturn(existing);

        Optional<UserAccount> result = service.update(1, updated);

        assertTrue(result.isPresent());
        assertEquals("new@email.com", result.get().getEmail());
    }
}