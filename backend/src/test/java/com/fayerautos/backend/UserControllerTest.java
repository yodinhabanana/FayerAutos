package com.fayerautos.backend;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fayerautos.backend.controller.UserAccountController;
import com.fayerautos.backend.model.UserAccount;
import com.fayerautos.backend.service.UserAccountService;

@WebMvcTest(UserAccountController.class)
@AutoConfigureMockMvc(addFilters = false)
class UserAccountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserAccountService service;

    @Test
    void deveCriarUsuario() throws Exception {

        UserAccount user = new UserAccount();
        user.setId(1);
        user.setEmail("teste@email.com");

        when(service.save(any(UserAccount.class)))
                .thenReturn(user);

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "email": "teste@email.com",
                        "username": "teste",
                        "passwordHash": "123"
                    }
                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("teste@email.com"));
    }

    @Test
    void deveListarUsuarios() throws Exception {

        when(service.findAll())
                .thenReturn(List.of(new UserAccount()));

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk());
    }

    @Test
    void deveBuscarPorId() throws Exception {

        UserAccount user = new UserAccount();
        user.setId(1);

        when(service.findById(1))
                .thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk());
    }

    @Test
    void deveRetornar404QuandoNaoExiste() throws Exception {

        when(service.findById(99))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/users/99"))
                .andExpect(status().isNotFound());
    }
}