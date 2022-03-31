
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from './../core/core.routing';

/* Se cargará en cada módulo los componentes de Material que sean necesarios */
import { MatButtonModule, MatDialogModule, MatTooltipModule, MatSelectModule, MatCheckboxModule, MatFormFieldModule, MatRadioModule, MatDatepickerModule, MatExpansionModule, MatTableModule, MatInputModule, MatSortModule, MatPaginatorModule, MatPaginatorIntl, MatTabsModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomPaginator } from 'src/app/core/services/custom-paginator';
import { HomeComponent } from './inicio.component';
import { CrearEditarEquipoComponent } from './Inicio/crear-editar-equipo.component';
import { ModalInfoComponent } from './modal-info/modal-info.component';
import { Configure } from '../core/services/utils/config';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';

Configure.init();

@NgModule({
    imports: [
        APP_ROUTES,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatRadioModule,
        MatExpansionModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatTableModule,
        MatInputModule,
        MatSortModule,
        MatPaginatorModule,
        MatTabsModule
    ],
    exports: [
        HomeComponent,
        CrearEditarEquipoComponent
    ],
    declarations: [
        HomeComponent,
        CrearEditarEquipoComponent,
        ModalInfoComponent,
        ModalConfirmComponent
    ],
    entryComponents: [
        ModalInfoComponent,
        ModalConfirmComponent
    ],
    providers: [
        {
            provide: MatPaginatorIntl,
            useClass: CustomPaginator
        }
    ],
})
export class InicioModule { }
