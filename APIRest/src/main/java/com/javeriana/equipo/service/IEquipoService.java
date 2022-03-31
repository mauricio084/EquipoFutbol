package com.javeriana.equipo.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.javeriana.equipo.model.Equipo;

public interface IEquipoService {

	void deleteEquipo(Long id);

	Equipo actualizarEquipo(Equipo equipo, Long id);

	Equipo getEquipoById(Long id);

	List<Equipo> getEquiposByFechaFundacion(Date fechaInicio, Date fechaFin);

	Equipo crearEquipo(Equipo newEquipo);

	Page<Equipo> getEquipos(Pageable pageable);

}
