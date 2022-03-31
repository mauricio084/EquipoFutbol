package com.javeriana.equipo.util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class SeguridadAdvice {

	@ResponseBody
	@ExceptionHandler(SeguridadException.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	String providerNotFoundHandler(SeguridadException ex) {
		StringBuilder msg = new StringBuilder();
		msg.append(ex.getMessage());
		
		if (ex.getCause() != null) {
			msg.append(" ");
			msg.append(ex.getCause().getMessage());
		}
		
		return msg.toString();
	}
}
