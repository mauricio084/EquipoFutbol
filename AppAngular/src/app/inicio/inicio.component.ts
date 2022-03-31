import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/core/services/utils/format-datepicker';
import { FormGroup, FormControl } from '@angular/forms';
import { EquiposServices } from 'src/app/core/services/equipos.services';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.styl'],
  providers: [
    DatePipe,
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class HomeComponent implements OnInit {

  dialogRef: any;
  datosEnviar: any;
  maxDate = new Date();

  // Nombre formulario
  consultaForm: FormGroup;
  paginatorTodos: FormGroup;

  // Nombre de las columnas de la tabla
  listaEquiposColumns: string[] = ['id', 'nombre', 'estadio', 'entrenador', 'nacionalidad', 'web', 'year', 'capacidad', 'valor', 'opciones'];

  listaEquipos: any;
  dataEquipos = new MatTableDataSource<any>(this.listaEquipos);

  noExistenRegistros: string;
  page: number;
  size = 10;

  totalElements: number;
  totalPages: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private services: EquiposServices, public dialog: MatDialog) {
    this.consultaForm = new FormGroup({
      tipo: new FormControl('todos'),
      idEquipo: new FormControl(''),
      fechaInicio: new FormControl(new Date()),
      fechaFin: new FormControl(new Date())
    });

    this.paginatorTodos = new FormGroup({
      nroRegistros: new FormControl(10),
      nroPagina: new FormControl(1)
    });
  }

  ngOnInit() {
    this.consultar();
  }

  aplicarFiltro(filterValue: string) {
    this.dataEquipos.filter = filterValue.trim().toLowerCase();
  }

  consultar(cambioPagina?) {
    this.noExistenRegistros = '';
    this.listaEquipos = [];
    this.dataEquipos = new MatTableDataSource<any>(this.listaEquipos);

    if (!this.page || this.page < 0) {
      this.page = 0;
    }

    if (!this.size) {
      this.size = 10;
    }

    if (cambioPagina === 'anterior') {
      this.page--;
    } else if (cambioPagina === 'siguiente') {
      this.page++;
    }

    const tipoConsulta = this.consultaForm.controls.tipo.value;


    const datosConsulta: any = {
      page: this.page,
      size: this.size
    };

    if (tipoConsulta === 'id') {
      datosConsulta.idEquipo = this.consultaForm.controls.idEquipo.value;
    } else if (tipoConsulta === 'fundacion') {
      datosConsulta.fechaInicio = this.fechaFormato(this.consultaForm.controls.fechaInicio.value);
      datosConsulta.fechaFin = this.fechaFormato(this.consultaForm.controls.fechaFin.value);
    }

    this.paginatorTodos.controls.nroRegistros.setValue(this.size);
    this.paginatorTodos.controls.nroPagina.setValue(this.page + 1);

    this.services.consultarEquipos(datosConsulta, tipoConsulta)
      .subscribe((respuesta: any) => {
        console.log('respuesta:', respuesta);
        this.totalElements = respuesta.totalElements;
        this.totalPages = respuesta.totalPages;

        if (tipoConsulta === 'todos') {
          this.listaEquipos = respuesta.content;
        } else if (tipoConsulta === 'id') {
          this.listaEquipos = [];
          this.listaEquipos.push(respuesta);
        } else if (tipoConsulta === 'fundacion') {
          this.listaEquipos = respuesta;
        }

        if (this.listaEquipos && this.listaEquipos.length > 0) {
          this.dataEquipos = new MatTableDataSource<any>(this.listaEquipos);
          if (tipoConsulta === 'todos') {
            setTimeout(() => {
              this.dataEquipos.sort = this.sort;
            }, 200);
          } else if (tipoConsulta === 'id' || tipoConsulta === 'fundacion') {
            setTimeout(() => {
              this.dataEquipos.sort = this.sort;
              this.dataEquipos.paginator = this.paginator;
            }, 200);
          }

        } else {
          this.listaEquipos = [];
          this.dataEquipos = new MatTableDataSource<any>(this.listaEquipos);
          this.noExistenRegistros = 'No se encontraron resultados.';
        }


      }, () => {
        this.noExistenRegistros = 'No se encontraron resultados o el servidor no se encuentra disponible actualmente.';
      });

  }

  cambioNroRegistros() {
    this.size = this.paginatorTodos.controls.nroRegistros.value;
    this.consultar();
  }

  cambioPagina() {
    this.page = this.paginatorTodos.controls.nroPagina.value - 1;
    this.consultar();
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
    return dia + '-' + mes + '-' + year;
  }



  eliminarEquipo(codigoProceso: any) {

    this.modalConfirm('¿Eliminar registro?', 'Si no está completamente seguro, por favor haga click en cancelar.', '', '', 'Si, Eliminar', 'Cancelar').then((result: any) => {
      if (result.value) {
        this.services.eliminarEquipo(codigoProceso)
          .subscribe((respuesta: any) => {
            console.log('respuesta:', respuesta);
            if (respuesta.strEstadoRetorno == '0') {
            } else if (respuesta.strEstadoRetorno == '1') {
              this.limpiarTodo();
            } else {
              this.limpiarTodo();
            }
          }, () => {
            this.modal('error', 'Información', 'El servicio no se encuentra disponible');
          });
      }
    });
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

  modalConfirm(titulo, mensaje, mensaje2?, mensaje3?, textoBoton?, textoBotonCancelar?) {

    if (!textoBoton) {
      textoBoton = 'Ok';
    }

    if (!textoBotonCancelar) {
      textoBotonCancelar = 'Cancelar';
    }

    return new Promise((resolve, reject) => {

      this.dialogRef = this.dialog.open(ModalConfirmComponent, {
        width: '450px',
        maxWidth: '90vw',
        disableClose: true,
        panelClass: 'noPadding',
        data: {
          titulo,
          mensaje,
          mensaje2,
          mensaje3,
          textoBoton,
          textoBotonCancelar
        }
      });

      this.dialogRef.afterClosed().subscribe(result => {
        let respuesta: any = result;
        if (result && result != 'false') {
          if (typeof result === 'boolean') {
            respuesta = {
              value: result
            };
          }
          resolve(respuesta);
        } else {
          resolve(false);
        }
      });

    });

  }


  limpiarTodo() {
    this.noExistenRegistros = '';
    this.listaEquipos = [];
    this.dataEquipos = new MatTableDataSource<any>(this.listaEquipos);
    this.consultaForm.reset();
  }

}
