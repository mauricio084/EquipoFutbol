package com.javeriana.equipo.util;

@SuppressWarnings("serial")
public class EquipoNotFoundException extends RuntimeException {

	public EquipoNotFoundException(Long id) {
		super("Could not find team by id:" + id);
	}
	
	public EquipoNotFoundException(String identificacion) {
		super("Could not find team by identificacion:" + identificacion);
	}
}
