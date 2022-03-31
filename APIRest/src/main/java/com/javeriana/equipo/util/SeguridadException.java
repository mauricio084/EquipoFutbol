package com.javeriana.equipo.util;

public class SeguridadException extends RuntimeException{

	private static final long serialVersionUID = 180754903715417931L;

	public SeguridadException(String msg) {
		super(msg);
	}
	
	public SeguridadException(String msg, Exception cause) {
		super(msg, cause);
	}
}
