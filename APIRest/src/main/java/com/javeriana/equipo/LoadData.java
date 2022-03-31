package com.javeriana.equipo;

import java.util.Calendar;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.javeriana.equipo.model.Equipo;
import com.javeriana.equipo.model.Usuario;
import com.javeriana.equipo.repositories.EquipoRepository;
import com.javeriana.equipo.repositories.UsuarioRepository;

@Configuration
class LoadEquipos {

	@Bean
	CommandLineRunner initUsuarios(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
		return args -> {
			repository.save(new Usuario("pepe", passwordEncoder.encode("12345")));
			System.out.println("Usuario creado");
		};
	}
	
	@Bean
	CommandLineRunner initDatabaseEquipos(EquipoRepository repository) {
		return args -> {
			System.out.println("Cargando Equipos en la Base de Datos");
			
			Calendar calendar = Calendar.getInstance();
			
			calendar.set(Calendar.YEAR, 1899);
			calendar.set(Calendar.DAY_OF_MONTH, 11);
			calendar.set(Calendar.MONTH, 10);
			Equipo equipo = new Equipo();
			equipo.setNombre("Fútbol Club Barcelona");
			equipo.setEntrenador("Ernesto Valverde");
			equipo.setEstadio("Camp Nou");
			equipo.setCapacidad(99354L);
			equipo.setNacionalidad("España");
			equipo.setFundacion(calendar.getTime());
			repository.save(equipo);
			
			calendar.set(Calendar.YEAR, 1902);
			calendar.set(Calendar.DAY_OF_MONTH, 6);
			calendar.set(Calendar.MONTH, 02);
			equipo = new Equipo();
			equipo.setNombre("Real Madrid");
			equipo.setEntrenador("Zinedine Zidane");
			equipo.setEstadio("Santiago Bernabéu");
			equipo.setCapacidad(81044L);
			equipo.setNacionalidad("España");
			equipo.setFundacion(calendar.getTime());
			repository.save(equipo);
			
			for (int i = 3; i< 200; i++) {
				equipo = new Equipo();
				equipo.setNombre("Equipo "+i);
				equipo.setEntrenador("Entrenador "+i);
				equipo.setEstadio("Estadio "+i);
				equipo.setCapacidad(81044L);
				equipo.setNacionalidad("Colombia");
				equipo.setFundacion(calendar.getTime());
				repository.save(equipo);
			}
			
			System.out.println("Equipos cargados de manera exitosa");
			
		};
	}
}
