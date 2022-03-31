package com.javeriana.equipo.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthTest {
	
	@GetMapping("/")	
	public String isAlive() {
		return "OK";
	}
	
}
