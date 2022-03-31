import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.styl']
})
export class ModalInfoComponent {

  tituloModal: string;
  textoInfo: string;
  textoInfo2: string;
  textoInfo3: string;
  tipoModal: any;
  textoBoton: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.tipoModal = data.tipo;
    this.tituloModal = data.titulo;
    this.textoInfo = data.mensaje;
    this.textoInfo2 = data.mensaje2;
    this.textoInfo3 = data.mensaje3;
    this.textoBoton = data.textoBoton;
  }
}
