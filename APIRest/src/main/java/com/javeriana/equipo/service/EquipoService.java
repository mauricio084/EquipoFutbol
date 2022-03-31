package com.javeriana.equipo.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.javeriana.equipo.model.Equipo;
import com.javeriana.equipo.repositories.EquipoRepository;
import com.javeriana.equipo.util.EquipoNotFoundException;

@Service
public class EquipoService implements IEquipoService{

	@Autowired
	private EquipoRepository repository;
	
	@Override
	public Page<Equipo> getEquipos(Pageable pageable) {
		return repository.findAll(pageable);
	}

	@Override
	public Equipo crearEquipo(Equipo newEquipo) {
		return repository.save(newEquipo);
	}

	@Override
	public List<Equipo> getEquiposByFechaFundacion(Date fechaInicio, Date fechaFin) {
		return repository.findByFundacionBetween(fechaInicio, fechaFin);
	}
	
	@Override
	public Equipo getEquipoById(Long id) {
		return repository.findById(id).orElseThrow(() -> new EquipoNotFoundException(id));
	}

	@Override
	public Equipo actualizarEquipo(Equipo newEquipo, Long id) {

		return repository.findById(id).map(provider -> {
			provider.setCapacidad(newEquipo.getCapacidad());
			provider.setEntrenador(newEquipo.getEntrenador());
			provider.setEstadio(newEquipo.getEstadio());
			provider.setFundacion(newEquipo.getFundacion());
			provider.setNacionalidad(newEquipo.getNacionalidad());
			provider.setNombre(newEquipo.getNombre());
			provider.setSitioWeb(newEquipo.getSitioWeb());
			provider.setValor(newEquipo.getValor());

			return repository.save(provider);
		}).orElseGet(() -> {
			throw new EquipoNotFoundException(id);
		});
	}

	@Override
	public void deleteEquipo(Long id) {
		Optional<Equipo> equipo = repository.findById(id);

		if (equipo.isPresent()) {
			repository.delete(equipo.get());
		} else {
			throw new EquipoNotFoundException(id);
		}
	}
	
}
