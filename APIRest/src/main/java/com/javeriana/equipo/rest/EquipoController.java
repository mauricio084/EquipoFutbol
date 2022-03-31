package com.javeriana.equipo.rest;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.solr.core.query.SolrPageRequest;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.javeriana.equipo.dtos.EquipoDTO;
import com.javeriana.equipo.model.Equipo;
import com.javeriana.equipo.service.IEquipoService;
import com.javeriana.equipo.util.DateNotValidException;

@RestController
public class EquipoController {

	@Autowired
	private IEquipoService equipoService;

	@GetMapping("/equipos/listar/{page}/{size}")
	public Page<EquipoDTO> getEquipos(@PathVariable("page") int pagina, @PathVariable("size") int size) {
		Pageable pageable = new SolrPageRequest(pagina, size, Sort.by(Direction.ASC, "id"));
		Page<Equipo> equipos = equipoService.getEquipos(pageable);
		
		List<EquipoDTO> result = convertDTOs(equipos);
		
		return new PageImpl<>(result, pageable, equipos.getTotalElements());
	}

	private List<EquipoDTO> convertDTOs(Page<Equipo> equipos) {
		List<EquipoDTO> result = new ArrayList<>();
		ModelMapper mapper = new ModelMapper();
		
		for (Equipo equipo : equipos) {
			result.add(mapper.map(equipo, EquipoDTO.class));
		}
		
		return result;
	}

	@PostMapping("/equipos/crear")
	public Equipo crearEquipo(@RequestBody Equipo newEquipo) {
		return equipoService.crearEquipo(newEquipo);
	}

	@GetMapping("/equipos/consultar/{fechaInicio}/{fechaFin}")
	public List<Equipo> getEquiposByFechaFundacion(@PathVariable("fechaInicio") String fechaInicio,
			@PathVariable("fechaFin") String fechaFin) {

		return equipoService.getEquiposByFechaFundacion(parseDate(fechaInicio), parseDate(fechaFin));
	}

	@GetMapping("/equipos/consultar/{id}")
	public Equipo getEquipoById(@PathVariable Long id) {
		return equipoService.getEquipoById(id);
	}

	@PutMapping("/equipos/actualizar/{id}")
	public Equipo actualizarEquipo(@RequestBody Equipo newEquipo, @PathVariable Long id) {
		return equipoService.actualizarEquipo(newEquipo, id);
	}

	@DeleteMapping("/equipos/eliminar/{id}")
	public void deleteEquipo(@PathVariable Long id) {
		equipoService.deleteEquipo(id);
	}
	
	private Date parseDate(String fecha) {
		try {
			DateFormat date = new SimpleDateFormat("dd-MM-yyyy");
			return date.parse(fecha);
		} catch (ParseException e) {
			throw new DateNotValidException(fecha);
		}
	}
}
