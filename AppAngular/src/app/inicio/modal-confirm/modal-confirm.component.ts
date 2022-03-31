import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.styl']
})
export class ModalConfirmComponent {

  tituloModal: string;
  textoInfo: string;
  textoInfo2: string;
  textoInfo3: string;
  tipoModal: any;
  textoBoton: any;
  textoCancelar: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.tituloModal = data.titulo;
    this.textoInfo = data.mensaje;
    this.textoInfo2 = data.mensaje2;
    this.textoInfo3 = data.mensaje3;
    this.textoCancelar = data.textoBotonCancelar;
    this.textoBoton = data.textoBoton;
  }

}
