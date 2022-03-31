package com.javeriana.equipo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.javeriana.equipo.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	Usuario findByUsername(String username);
}
