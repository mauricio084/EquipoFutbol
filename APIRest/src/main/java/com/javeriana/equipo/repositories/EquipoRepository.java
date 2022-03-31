package com.javeriana.equipo.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.javeriana.equipo.model.Equipo;

public interface EquipoRepository extends JpaRepository<Equipo, Long> {

	List<Equipo> findByFundacionBetween(Date fecha1, Date fecha2);
	
	@Query("SELECT e FROM Equipo e WHERE LOWER(e.nombre) LIKE %?1%") 
	List<Equipo> findByNombre(String nombre);
}
