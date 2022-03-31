package com.javeriana.equipo.dtos;

import java.math.BigDecimal;
import java.util.Date;

public class EquipoDTO {
	private Long id;
	private String nombre;
	private String estadio;
	private String sitioWeb;
	private String nacionalidad;
	private Date fundacion;
	private String entrenador;
	private Long capacidad;
	private BigDecimal valor;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * @param nombre the nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * @return the estadio
	 */
	public String getEstadio() {
		return estadio;
	}

	/**
	 * @param estadio the estadio to set
	 */
	public void setEstadio(String estadio) {
		this.estadio = estadio;
	}

	/**
	 * @return the sitioWeb
	 */
	public String getSitioWeb() {
		return sitioWeb;
	}

	/**
	 * @param sitioWeb the sitioWeb to set
	 */
	public void setSitioWeb(String sitioWeb) {
		this.sitioWeb = sitioWeb;
	}

	/**
	 * @return the fundacion
	 */
	public Date getFundacion() {
		return fundacion;
	}

	/**
	 * @param fundacion the fundacion to set
	 */
	public void setFundacion(Date fundacion) {
		this.fundacion = fundacion;
	}

	/**
	 * @return the entrenador
	 */
	public String getEntrenador() {
		return entrenador;
	}

	/**
	 * @param entrenador the entrenador to set
	 */
	public void setEntrenador(String entrenador) {
		this.entrenador = entrenador;
	}

	/**
	 * @return the capacidad
	 */
	public Long getCapacidad() {
		return capacidad;
	}

	/**
	 * @param capacidad the capacidad to set
	 */
	public void setCapacidad(Long capacidad) {
		this.capacidad = capacidad;
	}

	/**
	 * @return the valor
	 */
	public BigDecimal getValor() {
		return valor;
	}

	/**
	 * @param valor the valor to set
	 */
	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	/**
	 * @return the nacionalidad
	 */
	public String getNacionalidad() {
		return nacionalidad;
	}

	/**
	 * @param nacionalidad the nacionalidad to set
	 */
	public void setNacionalidad(String nacionalidad) {
		this.nacionalidad = nacionalidad;
	}
}
