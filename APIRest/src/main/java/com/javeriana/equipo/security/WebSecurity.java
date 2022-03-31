package com.javeriana.equipo.security;

import static com.javeriana.equipo.security.Constants.LOGIN_URL;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
	private Environment env;
	private UserDetailsService userDetailsService;

	public WebSecurity(Environment env, UserDetailsService userDetailsService) {
		this.env = env;
		this.userDetailsService = userDetailsService;
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		/*
		 * 1. Se desactiva el uso de cookies
		 * 2. Se activa la configuración CORS con los valores por defecto
		 * 3. Se desactiva el filtro CSRF
		 * 4. Se indica que el login no requiere autenticación
		 * 5. Se indica que el resto de URLs esten securizadas
		 */
		httpSecurity
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.cors().and()
			.headers().frameOptions().disable().and()
			.csrf().disable()
			.authorizeRequests().antMatchers("*").permitAll();
//			.authorizeRequests().antMatchers(HttpMethod.POST, LOGIN_URL).permitAll()
//			.anyRequest().authenticated().and()
//			.addFilter(new JWTAuthenticationFilter(authenticationManager()))
//			.addFilter(new JWTAuthorizationFilter(authenticationManager()));
		}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		// Se define la clase que recupera los usuarios y el algoritmo para procesar las passwords
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}

	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(getListProperty("cors.allowed.origins"));		
		config.setAllowedMethods(getListProperty("cors.allowed.methods"));		
		config.setAllowedHeaders(getListProperty("cors.allowed.headers"));
		config.setExposedHeaders(getListProperty("cors.exposed.headers"));
		config.setAllowCredentials(getBooleanProperty("cors.allow.credentials"));
		config.setMaxAge(getLongProperty("cors.maxage"));
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
	
	private List<String> getListProperty(String key){
		return Arrays.asList(env.getProperty(key).split(","));
	}
	
	private Boolean getBooleanProperty(String key){
		return Boolean.valueOf(env.getProperty(key));
	}
	
	private Long getLongProperty(String key){
		return Long.valueOf(env.getProperty(key));
	}
}
