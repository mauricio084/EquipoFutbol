package com.javeriana.equipo.util;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class EquipoNotFoundAdvice {

	@ResponseBody
	@ExceptionHandler(EquipoNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String providerNotFoundHandler(EquipoNotFoundException ex) {
		return ex.getMessage();
	}
}
