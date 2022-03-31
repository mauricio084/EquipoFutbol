import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MatDialog } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/core/services/utils/format-datepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquiposServices } from 'src/app/core/services/equipos.services';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalInfoComponent } from '../modal-info/modal-info.component';

@Component({
  selector: 'app-crear-editar-equipo',
  templateUrl: './crear-editar-equipo.component.html',
  styleUrls: ['./crear-editar-equipo.component.styl'],
  providers: [
    DatePipe,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class CrearEditarEquipoComponent implements OnInit {

  tipo = 'Agregar';
  descripcion = 'Agrega un nuevo equipo diligenciando todos los campos. Los campos con * son obligatorios.';
  maxDate = new Date();

  dialogRef: any;

  // Nombre formulario
  equipoForm: FormGroup;

  noExistenRegistros: string;
  idEquipo: any;


  constructor(private services: EquiposServices, private router: Router, public dialog: MatDialog, private activeRoute: ActivatedRoute) {


    this.equipoForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      estadio: new FormControl('', [Validators.required]),
      entrenador: new FormControl('', [Validators.required]),
      nacionalidad: new FormControl('', [Validators.required]),
      web: new FormControl('', [Validators.pattern(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)]),
      fecha: new FormControl('', [Validators.required]),
      capacidad: new FormControl(undefined, [Validators.required, Validators.pattern(/^\d+$/)]),
      valor: new FormControl(undefined, [Validators.pattern(/^\d+$/)]),
    });

    this.idEquipo = this.activeRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.idEquipo) {
      this.consultarEquipo();
      this.tipo = 'Editar';
      this.descripcion = 'Edita el equipo según desees. Los campos con * son obligatorios.';
    }
  }

  validaErrores(input) {
    if (this.equipoForm.controls[input].hasError('required')) {
      return 'Este campo es obligatorio.';
    }

    if (this.equipoForm.controls[input].hasError('pattern')) {
      if (input === 'web') {
        return 'Ingrese un sitio web válido en minúsculas';
      }
      return 'Ingrese sólo números';
    }

    return '';
  }

  consultarEquipo() {
    this.noExistenRegistros = '';

    const datosConsulta = {
      idEquipo: this.idEquipo
    };

    this.services.consultarEquipoId(datosConsulta)
      .subscribe((respuesta: any) => {
        console.log('respuesta:', respuesta);
        if (respuesta) {
          const fecha = new Date(respuesta.fundacion);
          fecha.setDate(fecha.getDate() + 1);

          this.equipoForm.controls.id.setValue(respuesta.id);
          this.equipoForm.controls.nombre.setValue(respuesta.nombre);
          this.equipoForm.controls.estadio.setValue(respuesta.estadio);
          this.equipoForm.controls.entrenador.setValue(respuesta.entrenador);
          this.equipoForm.controls.nacionalidad.setValue(respuesta.nacionalidad);
          this.equipoForm.controls.web.setValue(respuesta.sitioWeb);
          this.equipoForm.controls.fecha.setValue(fecha);
          this.equipoForm.controls.capacidad.setValue(respuesta.capacidad);
          this.equipoForm.controls.valor.setValue(respuesta.valor);
        } else {
          this.modal('error', 'Información', 'No se encontró un equipo con el Id relacionado.');
        }
      }, () => {
        this.modal('error', 'Información', 'El servicio no se encuentra disponible');
      }
      );
  }

  crearActualizar() {

    const capacidad = parseInt(this.equipoForm.controls.capacidad.value, 0);

    let valor = null;
    if (this.equipoForm.controls.valor.value) {
      valor = parseInt(this.equipoForm.controls.valor.value, 0);
    }

    const fundacion = this.fechaFormato(this.equipoForm.controls.fecha.value);

    const datosEquipo = {
      nombre: this.equipoForm.controls.nombre.value,
      estadio: this.equipoForm.controls.estadio.value,
      sitioWeb: this.equipoForm.controls.web.value,
      nacionalidad: this.equipoForm.controls.nacionalidad.value,
      fundacion,
      entrenador: this.equipoForm.controls.entrenador.value,
      capacidad,
      valor
    };

    if (this.idEquipo) {
      this.actualizarEquipo(this.idEquipo, datosEquipo);
    } else {
      this.crearEquipo(datosEquipo);
    }
  }

  crearEquipo(datosEquipo) {
    this.services.crearEquipo(datosEquipo)
      .subscribe(() => {
        this.modal('ok', 'Información', 'El equipo se agregó de forma exitosa.');
        this.irInicio();
      }, () => {
        this.modal('error', 'Información', 'El servicio no se encuentra disponible');
      });
  }

  actualizarEquipo(codigoProceso: any, datosEquipo) {

    this.services.actualizarEquipo(codigoProceso, datosEquipo)
      .subscribe(() => {
        this.modal('ok', 'Información', 'El equipo se actualizó de forma exitosa.');
      }, () => {
        this.modal('error', 'Información', 'El servicio no se encuentra disponible');
      });
  }

  irInicio() {
    this.router.navigate(['']);
  }

  modal(tipo, titulo, mensaje, mensaje2?, mensaje3?, textoBoton?) {
    if (!textoBoton) {
      textoBoton = 'Ok';
    }
    this.dialogRef = this.dialog.open(ModalInfoComponent, {
      width: '450px',
      maxWidth: '90vw',
      disableClose: true,
      panelClass: 'noPadding',
      data: {
        tipo,
        titulo,
        mensaje,
        mensaje2,
        mensaje3,
        textoBoton
      }
    });
  }

  fechaFormato(fecha: Date) {
    let dia: any = fecha.getDate();
    if (dia.toString().length === 1) {
      dia = '0' + dia;
    }
    let mes: any = fecha.getMonth() + 1;
    if (mes.toString().length === 1) {
      mes = '0' + mes;
    }
    const year: number = fecha.getFullYear();
    return year + '-' + mes + '-' + dia;
  }

  limpiarTodo() {
    this.noExistenRegistros = '';
  }

}
