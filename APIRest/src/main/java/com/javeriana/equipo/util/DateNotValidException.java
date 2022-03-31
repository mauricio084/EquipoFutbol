package com.javeriana.equipo.util;

@SuppressWarnings("serial")
public class DateNotValidException extends RuntimeException {

	public DateNotValidException(String fecha) {
		super("Date not valid " + fecha +". Valid format: dd-MM-yyyy");
	}
	
}
