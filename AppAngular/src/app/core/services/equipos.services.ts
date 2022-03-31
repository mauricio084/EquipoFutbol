import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Configure } from './utils/config';

@Injectable()
export class EquiposServices {

    constructor(private http: HttpClient) {
    }

    /* CONSULTAR EQUIPOS */

    consultarEquipos(datosEnviar, tipoConsulta) {

        let url = `${Configure.getIpPeticiones()}`;

        if (tipoConsulta === 'todos') {
            url = url + `/equipos/listar/${datosEnviar.page}/${datosEnviar.size}`;
        } else if (tipoConsulta === 'id') {
            url = url + `/equipos/consultar/${datosEnviar.idEquipo}`;
        } else if (tipoConsulta === 'fundacion') {
            url = url + `/equipos/consultar/${datosEnviar.fechaInicio}/${datosEnviar.fechaFin}`;
        }

        return this.http.get(
            url).pipe(
                map(this.extractData),
                catchError(this.handleError),
            );
    }


    /* CONSULTAR EQUIPO POR ID*/

    consultarEquipoId(datosEnviar) {
        return this.http.get(
            `${Configure.getIpPeticiones()}/equipos/consultar/${datosEnviar.idEquipo}`).pipe(
                map(this.extractData),
                catchError(this.handleError),
            );
    }

    /* CREAR EQUIPO*/

    crearEquipo(datosEnviar: any) {

        return this.http.post(
            `${Configure.getIpPeticiones()}/equipos/crear`, datosEnviar).pipe(
                map(this.extractData),
                catchError(this.handleError)
            );
    }

    /* ACTUALIZAR EQUIPO */

    actualizarEquipo(idEquipo: any, datosEquipo: any) {
        return this.http.put(
            `${Configure.getIpPeticiones()}/equipos/actualizar/${idEquipo}`, datosEquipo).pipe(
                map(this.extractData),
                catchError(this.handleError)
            );
    }

    /* ACTUALIZAR EQUIPO */

    eliminarEquipo(idEquipo: any) {
        return this.http.delete(
            `${Configure.getIpPeticiones()}/equipos/eliminar/${idEquipo}`).pipe(
                map(this.extractData),
                catchError(this.handleError)
            );
    }



    /* FUNCIONES GENERALES */

    private extractData(res: Response) {
        const body = res;
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const err = error || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return throwError(errMsg);
    }
}
